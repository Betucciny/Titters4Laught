import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Historic: a
    .model({
      tweet: a.string(),
      date: a.datetime(),
      userId: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  Tweets: a
    .customType({
      id: a.string(),
      tweet: a.string(),
      gender: a.string(),
      nationality: a.string(),
      age: a.integer(),
    })
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
