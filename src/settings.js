import dotenv from 'dotenv';

dotenv.config();
export const connectionString = process.env.CONNECTION_STRING;
export const sessionSecret = process.env.SESSION_SECRET;
export const googleClientID = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
