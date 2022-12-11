// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from '../../../lib/mongodb';
import { ITodoItem } from '../../../components/TodoList';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('todoApp');
    const collection = db.collection<ITodoItem>('todolist');

    // CREATE Endpoint
    if (req.method === 'POST') {
      await collection.insertOne(req.body);
      res.status(201).json(req.body);
    }

    // READ Endpoint
    else if (req.method === 'GET') {
      res.status(200).json({ items: await collection.find().toArray() });
    } else {
      res.status(400).send({});
    }
  } catch (e) {
    console.error(e);
    res.status(501).send({});
  }
};

export default handler;
