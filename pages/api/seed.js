import nc from 'next-connect';
import { Book, User } from '../../models';
import { db } from '../../utils';
import { data } from '../../utils';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Book.deleteMany();
  await Book.insertMany(data.products);
  await db.disconnect();
  res.send({
    message: 'seeded ',
  });
});

export default handler;
