import { API_URL } from "../config";
import axios from "axios";

export async function ventasByFechaCobroService(inicio: string, fin: string) {
  return await axios
    .get(API_URL + "/Cobros/byFechasCobro", {
      params: {
        fechaInicio: inicio,
        fechaFin: fin,
      },
    })
    .then((response) => response.data)
    .catch((e) => {
      console.log("Fatal" + e);
    });
}

export async function eliminarVentaService(folio: string) {
  return await axios
    .put(API_URL + "/Cobros/eliminarVenta/" + folio, null)
    .then((response) => response.data);
}

/* import domtoimage from 'dom-to-image';

export function print(componentName: string) {
  const node = document.getElementById(componentName);

  domtoimage
    .toPng(node as Node)
    .then(function (dataUrl) {
      const popup = window.open();
      popup!.document.write("<img src=" + dataUrl + ">");
      popup!.document.close();
      popup!.focus();
      popup!.print();
      popup!.close();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
} */
