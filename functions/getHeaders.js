import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const HEADERS = {
    //"Referer": "https://pt.fozzy.games/",
    //"X-Requested-With": "XMLHttpRequest",
    "X-XSRF-TOKEN": `${process.env.HEADER_XSRF_TOKEN}=`,
    //"DNT": "1",
    //"Connection": "keep-alive",
    "Cookie": `XSRF-TOKEN=${process.env.HEADER_XSRF_TOKEN}0%3D; pterodactyl_session=${process.env.HEADER_pterodactyl_session}0%3D;`,
};