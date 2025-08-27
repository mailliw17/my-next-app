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
      //enables username/password (or custome fields) authentication
      name: "Credentials",

      //defined the form fields needed, this well be automatically generated if using nextauthJs
      // but if using custom login page, these definistions are informational only
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // this core authentication logic
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // search user from firestore user the service
        const user = await login({ email: credentials.email });

        //check if user exists
        if (!user) {
          throw new Error("Email or password incorrect");
        }

        // compare password from input login VS password hash DB
        const passwordMatch = await compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          throw new Error("Email or password incorrect");
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

  session: {
    strategy: "jwt", //for session management
    maxAge: 60 * 60 * 24 * 7, //1 week
  },

  // define functions that modify the behaviour of nextauth.js
  callbacks: {
    //customize the JWT content
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullname = user.fullname;
      }
      return token;
    },

    // customize the session object
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.fullname = token.fullname;
      }
      return session;
    },

    //overrides nextauth default redirect logic
    // this function will active when the page.tsx (in login) without command "redirect:false"
    // async redirect({ url, baseUrl }) {
    //   console.log("Redirect callback called with:", { url, baseUrl });
    //   return `${baseUrl}/dashboard/product`; //if success login, redirect to dashboard
    //   // return "/dashboard/product";
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
