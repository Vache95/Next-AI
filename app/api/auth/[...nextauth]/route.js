import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


import { connectToDB } from '@utils/database';
import User from '@models/user'; 

const handler = NextAuth({

  providers: [
    GoogleProvider({
      clientId: "235699114457-egdq2v2thcorsg2gr2up3njkqmvljam2.apps.googleusercontent.com",
      clientSecret: "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",
    })
  ],
callbacks:{
    async session({ session }) {
      const sessionUser = await User.findOne({
        email:session.user.email
      })
       console.log(sessionUser,"sessionUser");
      session.user.id = sessionUser._id.toString()
      return session;
  },
  async signIn({ profile }) {
   try{
     await connectToDB()
      //  check if user already exists
      const userExists = await User.findOne({ email: profile.email });
      // if not, create a new document and save user in MongoDB
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

     return true
   }catch{
     console.log(error);
     return false;
   }
  }, 
}
})

export { handler as GET, handler as POST }


