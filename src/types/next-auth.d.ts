import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { AppUser, UserRole } from "./user";

declare module "next-auth" {
  interface Session {
    user: User;
  } 
  interface User extends AppUser, DefaultUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}
