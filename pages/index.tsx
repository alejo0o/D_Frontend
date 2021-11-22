import * as React from 'react';
import { withSessionSsr } from '@/helpers/withSession';
import { IronSessionData } from 'iron-session';
import { Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

const Home = ({ user }: IronSessionData): JSX.Element => {
  const logout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((error_peticion: Error | AxiosError | unknown) => {
        console.log(error_peticion);
      });
  };
  return (
    <div>
      <Link href='/login'>login</Link>
      <div>{user?.nombre}</div>
      <Button onClick={logout}>LOGOUT</Button>
    </div>
  );
};

export default Home;
