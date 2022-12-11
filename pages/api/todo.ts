// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from '../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('todoApp');
    const collection = db.collection('todolist');

    if (req.method === 'POST') {
      const todolist = req.body;
      await collection.deleteMany({});
      await collection.insertMany(todolist.items);
      res.status(200).send({});
    } else {
      const todolist = await db.collection('todolist').find().toArray();
      res.status(200).json({ items: todolist });
    }
  } catch (e) {
    console.error(e);
  }
};

export default handler;
