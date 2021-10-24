import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import NextLink from 'next/link';
import { Layout } from '../components';
import { db, Store } from '../utils';
import { Book } from '../models';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { books } = props;
  const addToCartHandler = async books => {
    const existItem = state.cart.cartItems.find(x => x._id === books._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/books/${books._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...books, quantity } });
    router.push('/cart');
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {books.map(book => (
            <Grid item md={4} key={book.name}>
              <Card>
                <NextLink href={`/books/${book.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={book.image}
                      title={book.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{book.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>₹{book.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(book)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const books = await Book.find({}).lean();
  await db.disconnect();
  return {
    props: {
      books: books.map(db.convertDocToObj),
    },
  };
}
