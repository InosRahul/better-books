import nc from 'next-connect';
import { Book } from '../../../models';
import { db } from '../../../utils';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const books = await Book.find({});
  await db.disconnect();
  res.send(books);
});

export default handler;
