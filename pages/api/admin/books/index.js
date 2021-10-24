import nc from 'next-connect';
import { isAdmin, isAuth, db } from '../../../../utils';
import { Book } from '../../../../models';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Book.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Book({
    name: 'sample name',
    slug: 'sample-slug-' + Math.random(),
    image: '/images/crime-punishment.jpg',
    price: 0,
    author: 'sample-author',
    genre: 'sample genrea',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Book Created', product });
});

export default handler;
