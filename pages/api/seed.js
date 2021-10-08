import nc from 'next-connect';
import { Book } from '../../models';
import { db } from '../../utils';
import { data } from '../../utils';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Book.deleteMany();
  await Book.insertMany(data.products);
  await db.disconnect();
  res.send({
    message: 'seeded ',
  });
});

export default handler;
