import * as dotenv from 'dotenv';
dotenv.config();

export const HEADERS = {
    "Authorization" : "Bearer " + process.env.API_KEY,
    "Content-Type"  : "application/json",
    "Accept"        : "application/vnd.pterodactyl.v1+json"
};