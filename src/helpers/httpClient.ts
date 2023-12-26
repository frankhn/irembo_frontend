import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const httpClient = () => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        const session = await getSession();
        if (session) {
            // @ts-ignore
            request.headers.Authorization = `Bearer ${session?.accessToken}`;
        }
        return request;
    });

    instance.interceptors.response.use((response) => response, (error) => {
        if (error?.response?.data?.error?.name === "TokenExpiredError") {
            signOut({ callbackUrl: "/" });
        }
        return Promise.reject(error);
    }
    );
    return instance
}

export const API = process.env.API_URL

export default httpClient()