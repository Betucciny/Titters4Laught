import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

export const generate = (nationality: string, gender: string, age: string) => {
    return "a"
};
