import nc from 'next-connect';
import { Book } from '../../../models';
import { isAuth, isAdmin, db, onError } from '../../../utils';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const books = await Book.find({});
  await db.disconnect();
  res.send(books);
});

export default handler;
