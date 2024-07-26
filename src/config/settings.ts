
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), ".env") })

export default {
    DATABASE: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        NAME: process.env.DB_NAME,
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD
    }
}