import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extend the built-in session type to include custom properties
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  /**
   * Extend the built-in user type
   */
  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT type
   */
  interface JWT extends DefaultJWT {
    id: string;
  }
}