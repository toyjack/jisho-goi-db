import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        const token = data.access_token;
        const user = {
          name: credentials?.username,
          access_token: token,
        };

        // If no error and we have user data, return it
        if (res.ok && token) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  secret: "jwtSecretKey",
  jwt: {
    maxAge: 60,
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log({ token, user, account, profile });
      if (account) {
        token.account = { ...account, access_token: user.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
