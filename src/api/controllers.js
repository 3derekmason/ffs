import mongodb from "mongodb";

const filesCollection = async () => {
  const client = await mongodb.MongoClient.connect(
    import.meta.env.MONGODB_URI,
    {
      useNewUrlParser: true,
    }
  );
  return client.db("ForFsSake").collection("files");
};

export default {
  getAllFiles: async (req, res) => {
    try {
      const files = await filesCollection();
      res.send(await files.find({}).sort({ date: -1 }).toArray());
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
