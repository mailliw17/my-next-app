import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const req = await request.json();
//   return NextResponse.json({
//     status: 200,
//     message: "Success",
//     data: req,
//   });
// }

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.passowrd) return null;

        // search user from firestore user the service
        const user = await login({ email: credentials.email });

        if (!user) {
          throw new Error("Email or password incorrect");
        }

        // compare password from input login VS password hash DB
        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Password incorrect");
        }

        // if valid, return object user
        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login", //custom login page (not using default NextAuth page)
    error: "/login", //redirect to login if error
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullname = user.fullname;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.fullname = token.fullname;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return "/dashboard"; //if success login, redirect to dashboard
    },
  },
  secret: "123456",
});

export { handler as GET, handler as POST };
