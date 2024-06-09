import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export const generate = async (
  nationality: string,
  gender: string,
  age: string,
  userId: string,
  setter: (tweet: string) => void
) => {
  if (!userId) {
    return;
  }
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const alredyGenerated = await client.models.Historic.list({
    filter: {
      userId: { eq: userId },
      date: { eq: todayString },
    },
  });
  if (alredyGenerated.data.length > 0) {
    const tweet = alredyGenerated.data[0].tweet ?? "";
    setter(tweet);
    return;
  }
  try {
    const response = await fetch(
      `https://8uo0t7d0fa.execute-api.us-east-1.amazonaws.com/getTweets?nationality=${nationality}&gender=${gender}&age=${age}`
    );
    const body = await response.json();
    client.models.Historic.create({
      tweet: body,
      date: todayString,
      userId: userId,
    });
    setter(body);
  } catch (error) {
    console.error(error);
  }
};
