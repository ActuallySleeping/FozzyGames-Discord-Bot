import servers from '../configs/servers.json' assert { type: 'json' };
import { HEADERS } from './getHeaders.js';
import axios from 'axios';

const SERVER_IDS = Object.keys(servers);

export const deleteFiles = (serverName, path, files) => new Promise ((resolve, reject) => {
    if (!SERVER_IDS.includes(serverName)) reject(false);

    const server = servers[serverName];
    
    axios.post(`https://pt.fozzy.games/api/client/servers/${server}/files/delete`, {
        root: path,
        files: files
        
    }, {
        headers: HEADERS

    }).then(() => resolve(true))
    .catch(() => reject(false));
});