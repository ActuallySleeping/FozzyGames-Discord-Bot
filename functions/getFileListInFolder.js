import servers from '../configs/servers.json' assert { type: 'json' };
import puppeteer from 'puppeteer';
import { HEADERS } from './getHeaders.js';

const SERVER_IDS = Object.keys(servers);

export async function getFileListInFolder(serverName, path, filter = () => true) {
    if (!SERVER_IDS.includes(serverName)) return 'Server not found';

    const serverID = servers[serverName].id;

    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(HEADERS);
    await page.goto(`https://pt.fozzy.games/api/client/servers/${serverID}/files/list?directory=${path}`);

    const response = await page.evaluate(() => {
        return document.querySelector('pre').innerText;
    });

    let content = JSON.parse(response);

    content = content.data.map(e => { return { "name" : e.attributes.name, "created_at" : e.attributes.created_at} });
    content = content.filter(e => e.name.endsWith('.ark'));

    content = content.filter(filter)

    await browser.close();

    return content;
}