import nc from 'next-connect';
import { Book } from '../../../models';
import { db } from '../../../utils';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const book = await Book.findById(req.query.id);
  await db.disconnect();
  res.send(book);
});

export default handler;
