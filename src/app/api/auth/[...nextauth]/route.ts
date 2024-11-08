import NextAuth, { SessionStrategy } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

export const auth0Options = {
    providers: [
        Auth0Provider({
            clientId: '0HL05OBEG1SwbXsIl3mxYuSZ2MAmEiaw',
            clientSecret: '1XFU-oYtgt9qFEnfD3Mdj1I9wOmTkXq7LLL2XjpzD0QSB8xDHYbWKH6443bY7kti',
            issuer: 'https://dev-uhlhumiavpp3g3p3.us.auth0.com',
            authorization: {
                params: {
                    prompt: 'login'
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy, // Use JWT to store session
    },
    callbacks: {
        async jwt({ token, account }: any) {
            // If account is defined, it's the initial sign-in, and we can save the refresh token
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
