import axios, { AxiosError } from 'axios';
import { withSessionRoute } from '@/helpers/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email: correo, password } = req.body;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}/auth/login`,
      {
        correo,
        password,
      }
    );
    if (response.status === 200) {
      req.session.user = {
        nombre: response.data.usuario.nombre,
        correo: response.data.usuario.correo,
        estado: response.data.usuario.estado,
        google: response.data.usuario.google,
        rol: response.data.usuario.rol,
        uid: response.data.usuario.uid,
        token: response.data.token,
      };
      await req.session.save();
      res.status(200).json({ message: 'Logged In' });
    }
  } catch (error: Error | AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
