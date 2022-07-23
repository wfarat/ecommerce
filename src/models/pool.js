import { Pool } from 'pg';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();
const production = process.env.PRODUCTION;

export const pool = (production === 'true') ? new Pool({ connectionString, ssl: { rejectUnauthorized: false } }) : new Pool({ connectionString });
