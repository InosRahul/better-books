import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Slider,
  Box,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import NextLink from 'next/link';
import { Layout } from '../components';
import { db, Store } from '../utils';
import { Book } from '../models';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useState } from 'react';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { books } = props;
  const [sortedBooks, setSortedBooks] = useState(books);
  const [anchorElPrice, setAnchorElPrice] = useState(null);
  const [anchorElAuthor, setAnchorElAuthor] = useState(null);
  const [anchorElGenre, setAnchorElGenre] = useState(null);
  const [priceRange, setPriceRange] = useState([200, 240]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenre] = useState([]);
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
  const itemInCart = books => {
    const inCart = state.cart.cartItems.find(x => x._id === books._id);
    return inCart ? true : false;
  };
  const sortByPrice = flag => {
    let newSortedBooks = [...sortedBooks];
    if (flag == 1) {
      newSortedBooks.sort((a, b) => b.price - a.price);
    } else {
      newSortedBooks.sort((a, b) => a.price - b.price);
    }
    setSortedBooks(newSortedBooks);
  };

  const sortByName = flag => {
    let newSortedBookByName = [...sortedBooks];
    if (flag == 1) {
      newSortedBookByName.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      newSortedBookByName.sort((a, b) => a.name.localeCompare(b.name));
    }
    setSortedBooks(newSortedBookByName);
  };

  const sortByPriceRange = (e, newPriceRange) => {
    setPriceRange(newPriceRange);
    let newSortedBooksByPriceRange = books.filter(
      book => book.price >= newPriceRange[0] && book.price <= newPriceRange[1],
    );
    console.log(newSortedBooksByPriceRange);
    setSortedBooks(newSortedBooksByPriceRange);
  };

  const priceClickHandler = e => {
    setAnchorElPrice(e.currentTarget);
  };

  const genreClickHandler = e => {
    setAnchorElGenre(e.currentTarget);
  };

  const authorClickHandler = e => {
    setAnchorElAuthor(e.currentTarget);
  };

  const priceMenuCloseHandler = e => {
    setAnchorElPrice(null);
  };

  const genreMenuCloseHandler = e => {
    setAnchorElGenre(null);
  };

  const authorMenuCloseHandler = e => {
    setAnchorElAuthor(null);
  };

  const sortAuthor = e => {
    const authorArr = authors;
    let index;
    if (e.target.checked) {
      authorArr.push(e.target.name);
    } else {
      index = authorArr.indexOf(e.target.name);
      authorArr.splice(index, 1);
    }
    setAuthors(authorArr);
    let sortedAuthorBooks = books.filter(book =>
      authorArr.includes(book.author),
    );
    sortedAuthorBooks.length
      ? setSortedBooks(sortedAuthorBooks)
      : setSortedBooks(books);
  };
  const mapAuthorCheckbox = () => {
    let authorCheckboxes = books.map(book => book.author);
    authorCheckboxes = [...new Set(authorCheckboxes)];
    return authorCheckboxes;
  };
  const mapGenreCheckbox = () => {
    let genres = books.map(book => book.genre);
    genres = [...new Set(genres.reduce((a, b) => a.concat(b), []))];
    return genres;
  };
  const sortGenre = e => {
    const genreArr = genres;
    let index;
    if (e.target.checked) {
      genreArr.push(e.target.name);
    } else {
      index = genreArr.indexOf(e.target.name);
      genreArr.splice(index, 1);
    }
    setGenre(genreArr);
    let sortedGenreBooks = books.filter(book =>
      book.genre.some(item => genreArr.includes(item)),
    );

    sortedGenreBooks.length
      ? setSortedBooks(sortedGenreBooks)
      : setSortedBooks(books);
  };

  const removeFromCart = books => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { ...books, quantity: 0 } });
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={4}>
          <Grid item>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={priceClickHandler}
            >
              Sort - Price
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorElPrice}
              keepMounted
              open={Boolean(anchorElPrice)}
              onClose={priceMenuCloseHandler}
            >
              <MenuItem onClick={() => sortByPrice(1)}>High to Low</MenuItem>
              <MenuItem onClick={() => sortByPrice(0)}>Low to High</MenuItem>
              <MenuItem onClick={() => sortByName(0)}>A-Z</MenuItem>
              <MenuItem onClick={() => sortByName(1)}>Z-A</MenuItem>
              <MenuItem>Price Range</MenuItem>
              <MenuItem>
                <Box sx={{ width: 200, marginTop: 25, marginBottom: 10 }}>
                  <Slider
                    getAriaLabel={() => 'Price Range'}
                    defaultValue={280}
                    step={40}
                    min={200}
                    max={500}
                    valueLabelDisplay="on"
                    value={priceRange}
                    onChange={sortByPriceRange}
                  />
                </Box>
              </MenuItem>
            </Menu>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={authorClickHandler}
            >
              Sort - Author
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorElAuthor}
              keepMounted
              open={Boolean(anchorElAuthor)}
              onClose={authorMenuCloseHandler}
            >
              {mapAuthorCheckbox().map(author => (
                <MenuItem>
                  <FormControlLabel
                    label={author}
                    control={
                      <Checkbox
                        className="author-checkbox"
                        onChange={sortAuthor}
                        name={author}
                      ></Checkbox>
                    }
                  ></FormControlLabel>
                </MenuItem>
              ))}
            </Menu>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={genreClickHandler}
            >
              Sort - Genre
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorElGenre}
              keepMounted
              open={Boolean(anchorElGenre)}
              onClose={genreMenuCloseHandler}
            >
              {mapGenreCheckbox().map(item => (
                <MenuItem>
                  <FormControlLabel
                    label={item}
                    control={
                      <Checkbox name={item} onChange={sortGenre}></Checkbox>
                    }
                  ></FormControlLabel>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          {sortedBooks.map(book => (
            <Grid item md={4} key={book.name}>
              <Card>
                <NextLink href={`/books/${book.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="500px"
                      width="500px"
                      style={{ objectFit: 'contain' }}
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
                  {itemInCart(book) ? (
                    <Button onClick={() => removeFromCart(book)}>
                      Remove from cart
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCartHandler(book)}
                    >
                      Add to cart
                    </Button>
                  )}
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
