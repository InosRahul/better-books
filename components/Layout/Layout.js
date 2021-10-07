import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { useStyles } from '../../utils';
export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Better Books</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Better Books
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>All rights reserved 2021.</footer>
    </div>
  );
};
