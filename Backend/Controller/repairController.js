// /.netlify/functions/reparaciones.js (ejemplo)
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

exports.handler = async (event) => {
  const method = event.httpMethod;
  
  if (method === "POST") {
    const data = JSON.parse(event.body);
    await client.connect();
    const collection = client.db("miBase").collection("reparaciones");
    const result = await collection.insertOne(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: result.insertedId }),
    };
  }

  // Agrega aquí GET, PUT y DELETE según sea necesario
};
