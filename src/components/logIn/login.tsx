import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, CircularProgress } from '@mui/material';
import { Form } from 'react-bootstrap';
import { FormValues, ComponentProps } from '@/types/Login.types';

const schema = yup.object().shape({
  email: yup.string().required('Campo email requerido'),
  password: yup.string().required('Campo contraseña requerido'),
});

const login = ({ handleSubmitLogin, loading }: ComponentProps): JSX.Element => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values: FormValues, actions) => {
        handleSubmitLogin(values);
      }}
      initialValues={{
        email: '',
        password: '',
      }}>
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <Form.Group className='mb-sm-4 mt-sm-4' controlId='formBasicEmail'>
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Ingresar correo electrónico'
              name='email'
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
            <Form.Text className='text-muted'>
              Su correo se usará unicamente dentro de la empresa.
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-sm-4 mt-sm-4' controlId='formBasicPassword'>
            <Form.Label>Contraseña: </Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingresar contraseña'
              name='password'
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant='contained'
            className='mb-sm-4 mt-sm-4 px-sm-4'
            color='primary'
            size='large'
            type='submit'>
            {loading ? (
              <CircularProgress color='secondary' size='1.5em' />
            ) : (
              'Log In'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default login;
