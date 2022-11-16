import puppeteer from "puppeteer";
import { HEADERS } from "./getHeaders.js";
import servers from "../configs/servers.json" assert { type: "json" };
import { getFileListInFolder } from "./getFileListInFolder.js";

const STATES = {
    'start' : 1,
    'restart' : 2,
    'stop' : 3,
}

export const changeServerState = async (name, state) => {

    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(HEADERS);
    await page.goto(`https://pt.fozzy.games/server/${servers[name].id}`);

    await page.waitForSelector(`button.style-module_4LBM1DKx:nth-child(${STATES[state]})`);
    await page.waitForSelector('.terminal')

    if ( state === 'stop' || state === 'restart' ) {
        await page.waitForSelector('.peer');

        const terminalInput = await page.$('.peer');

        await terminalInput.type('saveworld');
        await terminalInput.press('Enter');

        let files = [];
        let it = 0;

        const gFiles = new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                files = await getFileListInFolder(name, '/ShooterGame/Saved/SavedArks', (e) => new Date(e.created_at) > Date.now() - 1000 * 60 * 10);

                if ( it > 60 && files.length > 0 ) {
                    clearInterval(interval);
                    reject();
                }

                if (files.length > 0) {
                    it += 1;
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
 
        await gFiles;
    }

    const button = await page.$(`button.style-module_4LBM1DKx:nth-child(${STATES[state]})`);
    await button.click();

    await browser.close();
    return true;
};