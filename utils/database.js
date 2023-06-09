import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://vacheevistep:KDqopv9bYExud1xO@cluster0.evdt0pi.mongodb.net/?retryWrites=true&w=majority",{
      dbName:"test1",
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    isConnected = true;
    console.log('MongoDB connected success')
  } catch (error) {
    console.log(error);
  }
}

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://test1:W078fImUEi7T7dlc@cluster0.gmsxspa.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// export async function connectToDB() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }