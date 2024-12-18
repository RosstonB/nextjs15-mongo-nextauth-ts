import NextAuth from "next-auth";
import authOptions from "./options";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import bcrypt from "bcrypt";
// import { getUser } from "@/app/actions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const { auth, signIn, signOut } = NextAuth({
//   ...authOptions,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) return user;
//         }

//         return null;
//       },
//     }),
//   ],
// });
