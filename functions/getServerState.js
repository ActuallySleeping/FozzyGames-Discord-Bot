import servers from '../configs/servers.json' assert { type: 'json' };
import { HEADERS } from './getHeaders.js';

import axios from 'axios';

const SERVER_IDS = Object.keys(servers);

export async function getServerState(serverName) {
    if (!SERVER_IDS.includes(serverName)) return 'Server not found';

    const serverID = servers[serverName].id;

    const res = await axios.get(
        `https://pt.fozzy.games/api/client/servers/${serverID}/resources`,
        {
            headers: HEADERS
        }
    );

    return res.status == 200 ? res.data.attributes.current_state : "Error";
}