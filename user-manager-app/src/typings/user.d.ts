export type UserResponse = User[];

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  login: string;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}
