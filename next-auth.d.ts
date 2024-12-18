// types/next-auth.d.ts
// import NextAuth from "next-auth";
// import { DefaultSession, DefaultUser } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       email?: string | null;
//       name?: string | null;
//       image?: string | null;
//       password: string;
//     };
//   }

//   interface User extends DefaultUser {
//     id: string;
//     password: string;
//   }
// }

// ./types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
  }
}
