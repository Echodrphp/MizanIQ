import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (process.env.NEXT_PUBLIC_DEMO_MODE === "true" && email === process.env.DEMO_USER_EMAIL && password === process.env.DEMO_USER_PASSWORD) {
          const user = await db.user.findUnique({ where: { email } });
          if (!user) return null;
          return { id: user.id, email: user.email, name: user.name, image: user.image };
        }

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;
        const isValid = await compare(password, user.passwordHash);
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: { signIn: "/login", newUser: "/onboarding" },
  callbacks: {
    async jwt({ token, user }) { if (user) token.id = user.id; return token; },
    async session({ session, token }) { if (session.user) session.user.id = token.id as string; return session; },
  },
});
