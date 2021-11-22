import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/components/logIn/login';

let documentBody: RenderResult;

describe("when the user access login and insert's correct credentials", () => {
  it('should allow user to log in into the system', async () => {
    //Arrange
    const password = '123456',
      email = 'testmen@test.com';
    //Act
    documentBody = render(
      <Login handleSubmitLogin={jest.fn()} loading={false} />
    );
    act(() => {
      userEvent.type(
        screen.getByPlaceholderText('Ingresar correo electrónico'),
        email
      );
      userEvent.type(
        screen.getByPlaceholderText('Ingresar contraseña'),
        password
      );
      userEvent.click(screen.getByText('LOG IN'));
    });
    //Assert
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });
});
