import { IronSessionData } from 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      nombre: string;
      correo: string;
      rol: string;
      estado: string;
      google: string;
      uid: string;
      token: string;
    };
  }
}

/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
