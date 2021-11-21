import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

const password =
  typeof process.env.SECRET_SESSION === 'string'
    ? process.env.SECRET_SESSION
    : 'set_password_in_env_file';
const cookieName =
  typeof process.env.COOKIE_NAME === 'string'
    ? process.env.COOKIE_NAME
    : 'set_cookieName_in_env_file';

const sessionOptions = {
  password,
  cookieName,
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
