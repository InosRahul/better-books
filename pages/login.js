import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  Switch,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Layout } from '../components';
import Cookies from 'js-cookie';
import { useStyles, Store } from '../utils';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
export default function Login() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [adminCreds, setAdminCreds] = useState(false);
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' },
      );
    }
  };

  const fillAdminCreds = event => {
    setAdminCreds(event.target.checked);
    if (event.target.checked) {
      setValue('email', 'admin@example.com', { shouldValidate: true });
      setValue('password', '123456', {
        shouldValidate: true,
      });
    } else {
      setValue('email', '');
      setValue('password', '');
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{
                    type: 'email',
                  }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            <Switch checked={adminCreds} onChange={fillAdminCreds}></Switch>
            <p>Use Admin Credentials</p>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
