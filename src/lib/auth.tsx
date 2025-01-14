import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../lib/prisma"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Extend the Session and JWT types
 /* eslint-disable no-unused-vars */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
 /* eslint-enable no-unused-vars */
 /* eslint-disable no-unused-vars */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Adapter Prisma untuk menyimpan sesi
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
    CredentialsProvider({
      type:"credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        // Cari pengguna di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("Email tidak ditemukan.");
        }

        // Verifikasi password
        if (!user.password) {
          throw new Error("Password tidak ditemukan.");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Password salah.");
        }

        // Return user object jika autentikasi berhasil
        return user || null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy : "jwt"
  },

  pages: {
    signIn: "/masuk",
  },
  

  callbacks: {

    async jwt({ token, user}) {
      // Tambahkan user ID ke token JWT
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan ID pengguna ke sesi
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("id" in token) {
        session.user.id = token.id;
      } 
      return session
    },
    

    async redirect({baseUrl }) {
      return `${baseUrl}/profile`;
    },
    
  },
};

export default NextAuth(authOptions);
