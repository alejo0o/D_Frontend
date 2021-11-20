export interface FormValues {
  email: string;
  password: string;
}

export type ComponentProps = {
  handleSubmitLogin: (params: FormValues) => void;
  loading: boolean;
};

export interface UserData {
  user?: {
    nombre: string;
    correo: string;
    rol: string;
    estado: string;
    google: string;
    uid: string;
  };
}
