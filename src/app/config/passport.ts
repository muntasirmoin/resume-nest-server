import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user: User | null = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "User does not exist" });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
