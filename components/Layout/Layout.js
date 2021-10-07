import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

export const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Better Books</title>
      </Head>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Better Books
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>All rights reserved 2021.</footer>
    </div>
  );
};
