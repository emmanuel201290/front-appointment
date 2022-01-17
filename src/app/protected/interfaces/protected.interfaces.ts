export interface Citas {
  id: String;
  id_usuario: String;
  fechaVisita: String;
  horaInicio: String;
  horaFin: String;
  dia: String;
  nombreMedicto: String;
  nombrePaciente: String;
}

export interface Disponibilidad {
  id_disponibilidad: String;
  id_usuario: String;
  dia: String;
  horaInicio: String;
  horaFin: String;
}