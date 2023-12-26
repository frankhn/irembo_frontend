import httpClient, { API } from "@/helpers/httpClient";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as any;
                try {
                    console.log("CAlling API request", email, password, API)
                    const res = await httpClient.post(`${API}/auth/login`, {
                        email,
                        password,
                    });
                    console.log(res, "REsponse")
                    return res.data
                } catch (error: any) {
                    throw new Error(JSON.stringify({ ...error.response.data }));
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user) return true;
            return false;
        },
        async session({ session, token }) {
            const jwt = token as any;
            // @ts-ignore
            session.accessToken = jwt.accessToken;
            session.user = jwt.user;
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
