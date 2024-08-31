export interface ICobros {
  nombre: string;
  importe: number | null;
  concepto: string;
}

export interface ICobrosPost extends ICobros{
  fechaCobro: string;
  folio: string;
  status: boolean;
  idUsuarioCobro: { id: number };
}
