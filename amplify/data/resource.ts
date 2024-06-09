import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Historic: a
    .model({
      tweet: a.string(),
      date: a.string(),
      userId: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
