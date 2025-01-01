import passport from "passport";
import { Strategy as GoogleStrategy, Profile} from "passport-google-oauth20"
import prisma from "./db";


const generateRandomDigits = (length: number): string => {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");
};

passport.use("googel", 
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    }, async (accessToken, refreshToken, profile, cb) => {
        try{
            let email = profile.emails?.[0].value;
        
            if(!email){
                return cb("something went wrong", false)
            } 

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })


            if(!existingUser){
                const newUser = await prisma.user.create({
                    data: {
                    name: profile.displayName,
                    username: email.split("@")[0] + generateRandomDigits(3),
                    email: email,
                    password: "google" + generateRandomDigits(6)
                    },
                });

                return cb(null, newUser)
            } else{
                return cb(null, existingUser);
            }
        } catch (error) {
            return cb(error, false)
        }
    })
)

export { passport };