import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const DEMO_EMAIL = process.env.DEMO_USER_EMAIL ?? "demo@mizaniq.com";
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD ?? "demo1234";
const DEMO_MODE_ENABLED = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const DEMO_USER = {
  id: "demo-user",
  email: DEMO_EMAIL,
  name: "Demo User",
  image: null,
};

/**
 * Lazy DB import: avoids requiring DATABASE_URL when running in demo-only mode.
 */
async function tryDbAuthorize(email: string, password: string) {
  try {
    const { db } = await import("./db");
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) return null;
    const ok = await compare(password, user.passwordHash);
    if (!ok) return null;
    return { id: user.id, email: user.email, name: user.name, image: user.image };
  } catch {
    return null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email);
        const password = String(credentials.password);

        // Demo bypass — works without DB so the MVP can run on demo data only.
        if (DEMO_MODE_ENABLED && email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          return DEMO_USER;
        }

        return tryDbAuthorize(email, password);
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  trustHost: true,
});
