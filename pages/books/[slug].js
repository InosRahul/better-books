import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { data, useStyles } from '../../utils';
import { Layout } from '../../components';

export default function Book() {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const book = data.products.find(a => a.slug === slug);
  if (!book) {
    return (
      <>
        <h1>Book not found</h1>
      </>
    );
  }
  return (
    <Layout title={book.name} description={book.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link> Back to Books</Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={book.image}
            alt={book.name}
            height="640"
            width="640"
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1">{book.name} </Typography>
            </ListItem>
            <ListItem>Category: {book.category}</ListItem>
            <ListItem>Brand: {book.brand}</ListItem>
            <ListItem>Rating: {book.rating}</ListItem>
            <ListItem>
              Description:
              <Typography>{book.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{book.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {book.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  {' '}
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
