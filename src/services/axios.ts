import axios from "axios";
import https from "https";

const baseURL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
const agent =
    process.env.NODE_ENV !== "production"
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;
export const api = axios.create({
    baseURL: baseURL,
    httpsAgent: agent,
    //  withCredentials: true, // optional if your API uses cookies
});
