// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from '../../../lib/mongodb';

import { ITodoItem } from '../../../components/TodoList';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db('todoApp');
    const collection = db.collection<ITodoItem>('todolist');

    // UPDATE Endpoint
    if (req.method === 'POST') {
      await collection.updateOne({ _id: id }, { $set: req.body });
      const todoItem = await collection.find({ _id: id }).next();
      if (todoItem) {
        res.status(200).json(todoItem);
      } else {
        res.status(400).json({ _id: id });
      }
    }

    // DELETE Endpoint
    else if (req.method === 'DELETE') {
      await collection.deleteOne({ _id: id });
      res.status(200).json({ _id: id });
    }
  } catch (e) {
    console.error(e);
  }
};

export default handler;
