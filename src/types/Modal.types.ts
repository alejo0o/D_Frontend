export interface ErrorModal {
  show: boolean;
  handleClose: () => void;
  tituloMensaje: string;
  mensaje: string;
}
