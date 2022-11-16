import servers from '../configs/servers.json' assert { type: 'json' };
import puppeteer from 'puppeteer';
import { HEADERS } from './getHeaders.js';

const SERVER_IDS = Object.keys(servers);

export async function getServerState(serverName) {
    if (!SERVER_IDS.includes(serverName)) return 'Server not found';

    const serverID = servers[serverName].id;

    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(HEADERS);
    await page.goto(`https://pt.fozzy.games/api/client/servers/${serverID}/resources`);

    const element = await page.$('body > pre:nth-child(1)')
    const content = await page.evaluate(el => el.textContent, element);

    const json = JSON.parse(content);
    
    await browser.close();

    return json.attributes.current_state;
}