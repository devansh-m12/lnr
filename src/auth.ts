import NextAuth from "next-auth"
import db from '@/db';
import prisma from "@/db"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from 'bcryptjs';
import { JWTPayload, SignJWT, importJWK } from 'jose';

export const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || 'secret';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      authorize: async (credentials: any) => {
        try {
          const hashedPassword = await bcryptjs.hash(credentials.password, 12);

          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { username: credentials.username },
                { email: credentials.username }
              ]
            },
            select: {
              password: true,
              id: true,
              name: true,
              emailVerified: true,
            },
          });

          console.log(user);

          if (
            user &&
            user.password &&
            (await bcryptjs.compare(credentials.password, user.password))
          ) {
            if(!user.emailVerified) {
              throw new Error('please verify your email, check your inbox', { cause: { redirect: '/verify' } });
            }

            const jwt = await generateJWT({
              id: user.id,
            });

            return {
              id: user.id,
              name: user.name,
              email: credentials.username,
              token: jwt,
              emailVerified: user.emailVerified,
            };
          }
          throw new Error('Invalid credentials or user does not exist. Please create an account.', { cause: { redirect: '/register' } });
        } catch (e: any) {
          console.log("error", e)
          console.error(e);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
      async session({ session, token }) {
          return session;
      },
      async jwt({ token, user }) {
          return token;
      },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login', // This will redirect back to login page with error
  },
})