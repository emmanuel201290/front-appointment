export interface User {
  id?: string;
  idUsuario: string;
  nombre: string;
  password: string;
  rol: string;
}

export interface Disponibilidad {
  id: string;
  id_usuario: string;
  fecha_visita: string;
  hora_inicio: string;
  hora_fin: string;
  dia: string;
}

export interface AuthResponse {
  ok: string;
  id: string;
}
