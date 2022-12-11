import servers from '../configs/servers.json' assert { type: 'json' };
import { HEADERS } from './getHeaders.js';

import axios from 'axios';

const SERVER_IDS = Object.keys(servers);

export async function getFilesInFolder(serverName, path, filter = () => true) {
    if (!SERVER_IDS.includes(serverName)) return 'Server not found';

    const serverID = servers[serverName].id;

    const res = await axios.get(
        `https://pt.fozzy.games/api/client/servers/${serverID}/files/list?directory=${path}`,
        {
            headers: HEADERS
        }
    );

    if (res.status !== 200) return 'Error';

    const content = res.data.data
        .map(e => {return {
            "name" : e.attributes.name,
            "created_at" : e.attributes.created_at
            }})
        .filter(filter);
        
    return content;
}