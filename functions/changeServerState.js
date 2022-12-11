import { HEADERS } from "./getHeaders.js";
import servers from "../configs/servers.json" assert { type: "json" };

import axios from "axios";

const STATES = ['start', 'stop', 'restart', 'kill'];
const SERVER_IDS = Object.keys(servers);

export const changeServerState = async (name, state) => {

    if (!SERVER_IDS.includes(name)) return 'Server not found';
    if (!STATES.includes(state)) return 'Invalid state';

    const serverID = servers[name].id;

    const res = await axios.post(
        `https://pt.fozzy.games/api/client/servers/${serverID}/power`,
        {
            signal: state
        },
        {
            headers: HEADERS
        }
    );

    if (res.status == 204) return true;
    else return res.status;
};