import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { Store, useStyles } from '../../utils';
import Cookies from 'js-cookie';
export const Layout = ({ title, description, children }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: 'dark',
    },
  });

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Better Books` : 'Better Books'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar variant="dense">
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Better Books</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>All rights reserved 2021.</footer>
      </ThemeProvider>
    </div>
  );
};
