import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {dbUsers} from "../../../database";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here

    // Configure a "Credentials" provider to store user information
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password,
        );
      },
    }),
  ],

  // Configure custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  //Session
  session: {
    maxAge: 2592000, // 1 month
    updateAge: 86400, // 1 day
    strategy: "jwt",
  },

  // Callbacks
  callbacks: {
    async jwt({token, account, user}) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || "",
            );
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({session, token, user}) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
});
