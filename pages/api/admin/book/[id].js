import nc from 'next-connect';
import { isAdmin, isAuth, db } from '../../../../../utils';
import { Book } from '../../../../../models';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Book.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});
export default handler;
