import NextAuth, { SessionStrategy } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

export const auth0Options = {
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_APP_DOMAIN as string,
            authorization: {
                params: {
                    prompt: 'login',
                    audience: process.env.NEXT_PUBLIC_API_URL,
                }
            },
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },

    callbacks: {
        async jwt({ token, account }: any) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
}

const handler = NextAuth(auth0Options)

export { handler as GET, handler as POST }
