import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import { Layout } from '../components';
import { Book } from '../models';
import { db } from '../utils';

export default function Home(props) {
  const { books } = props;
  return (
    <Layout>
      <div>
        <h1>Books</h1>
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
                      <Typography>
                        {book.name} - {book.author}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>{book.price}</Typography>
                  <Button size="small" color="primary">
                    Add to Cart
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
