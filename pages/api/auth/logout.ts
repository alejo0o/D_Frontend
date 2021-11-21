import { withSessionRoute } from '@/helpers/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(logoutRoute);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(200).json({ message: 'Logged Out' });
}
