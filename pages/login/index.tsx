import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import type { NextPage } from 'next';
import LoginForm from '@/components/logIn/login';
import {
  FormBox,
  IlustrativeBox,
  LoginContainer,
} from '@/components/logIn/loginStyles';
import { FormValues } from '@/types/Login.types';
import { withSessionSsr } from '@/helpers/withSession';
import ModalError from '@/components/modals/ModalError';
import FooterLogin from '@/components/logIn/loginFooter';

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {
        data: null,
      },
    };
  }
);

const Index: NextPage = (props) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState<number>();
  const [loading, setloading] = useState<boolean>(false);
  const [errorModal, seterrorModal] = useState<boolean>(false);

  const handleSubmitLogin = (values: FormValues) => {
    setloading(true);
    axios
      .post('/api/auth/login', {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/';
        }
        setloading(false);
      })
      .catch((error_peticion: Error | AxiosError | unknown) => {
        if (axios.isAxiosError(error_peticion)) {
          error_peticion.response?.status === 401
            ? seterror(401)
            : seterror(500);
        } else {
          seterror(500);
        }
        setloading(false);
        seterrorModal(true);
      });
  };
  return (
    <div>
      <div className='p-sm-4 p-2 d-flex justify-content-center align-items-center'>
        <LoginContainer>
          <IlustrativeBox>
            <img src='/login-img.svg' alt='' className='w-100 h-100' />
          </IlustrativeBox>
          <FormBox>
            <div className='w-100'>
              <h2>Log In</h2>
              <LoginForm
                handleSubmitLogin={handleSubmitLogin}
                loading={loading}
              />
            </div>
          </FormBox>
        </LoginContainer>
      </div>

      <FooterLogin />

      <ModalError
        show={errorModal}
        handleClose={() => {
          seterrorModal(false);
        }}
        tituloMensaje={
          error === 401 ? 'Credenciales Inválidas!' : 'Error del servidor!'
        }
        mensaje={
          error === 401
            ? 'El usuario ingresado es incorrecto, revisar las credenciales ingresadas'
            : 'Hay un fallo en el sistema de usuarios. Intentelo más tarde o contacte al administrador.'
        }
      />
    </div>
  );
};

export default Index;
