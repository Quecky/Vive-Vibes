export class Reserva {
  id: number;
  tourId: number;
  usuarioId: number;
  fechaReserva: Date;
  cantidadPersonas: number;
  estado: string;

  constructor(partial: Partial<Reserva>) {
    Object.assign(this, partial);
  }
}
