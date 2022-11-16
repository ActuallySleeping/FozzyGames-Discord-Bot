import servers from '../configs/servers.json' assert { type: 'json' };
import { HEADERS } from './getHeaders.js';
import { FormDataEncoder } from 'form-data-encoder';
import { Readable } from 'stream';

const SERVER_IDS = Object.keys(servers);

export const uploadFiles = (serverName, files) => new Promise (async (resolve, reject) => {
    if (!SERVER_IDS.includes(serverName)) reject(false);

    const server = servers[serverName];
    
    for await (const file of files) {
        const res = await fetch(`https://pt.fozzy.games/api/client/servers/${server}/files/upload`, {
            "headers": HEADERS,
            "method": "GET",
        })
        
        const url = (await res.json()).attributes.url + `&directory=${file.path}`;
        const form = new FormData();
        form.append('files', new Blob([file.content], { type: 'text/plain' }), file.name);
        const encoder = new FormDataEncoder(form);
        
        const response = await fetch(url, {
            "headers": encoder.headers,
            "body": Readable.from(encoder),
            "method": "POST",
        });

        if (!response.status === 200) reject(false);
        else resolve(true);
    }
});