import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/services/axios";
import { ApiUrls } from "@/services/url";
import { ApiResponse } from "@/types/ApiResponse";
import { SignInRequest, SignInResponse } from "@/types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "RemeberMe", type: "boolean" },
      },
      async authorize(
        credentials
      ): Promise<User | null> {
        try {
          console.log(credentials?.rememberMe)
          const req: SignInRequest = {
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
            rememberMe: credentials?.rememberMe == 'true'
          };

          const { data } = await api.post<ApiResponse<SignInResponse>>(ApiUrls.signIn, req);

          if (data.statusCode >= 400 || !data.data) return null;

          return data.data.user;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
        // token.idToken = user.idToken;
        // token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          username: token.name as string,
          isOnline: true,
          joinDate: Date.UTC(Date.now()).toString(),
          avatar: token.avatar as string,
          role: token.role as any,
          balance: {
            usd: 0,
            glory: 0,
            usdc: 0.0,
            sol: 0.
          }
          // idToken: token.idToken as string,
          // refreshToken: token.refreshToken as string,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
