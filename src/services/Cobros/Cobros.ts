import { ICobrosExt } from "@/interface/Cobros/ICobros";
import { API_URL } from "../config";
import axios from "axios";

export async function confirmCompraService(
  idUser: number | undefined,
  props: ICobrosExt | null
) {
  return await axios
    .post(API_URL + "/Cobros/cobrar/" + idUser, props)
    .then((response) => response.data);
}
