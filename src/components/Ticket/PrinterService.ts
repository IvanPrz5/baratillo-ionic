import { ICobrosExt } from "@/interface/Cobros/ICobros";
import { currencyFormatter } from "@/utils/Moneda";
import { BleClient, textToDataView } from "@capacitor-community/bluetooth-le";

export async function printService(idDevice: string, serviceUUID: string, characUUid: string, props: ICobrosExt){
    try{
    const hoy = new Date().toISOString().split("T"); 

    await TurnOnBold(idDevice, serviceUUID, characUUid);
    await FeedCenter(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid, "BARATILLO");
    await UnderLine(idDevice, serviceUUID, characUUid);
    await TurnOffBold(idDevice, serviceUUID, characUUid);
    await FeedRight(idDevice, serviceUUID, characUUid);

    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid,  "FECHA: \n" + hoy[0]);
    await FeedLeft(idDevice, serviceUUID, characUUid);

    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid, "Producto : " + props.nombre);

    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid, "Descripcion : \n" + props.concepto);

    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid, "Total \n" + currencyFormatter(props.importe));

    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid, "Folio \n" + props.folio);

    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await FeedCenter(idDevice, serviceUUID, characUUid);
    
    await WriteData(idDevice, serviceUUID, characUUid, "GRACIAS POR TU COMPRA");
    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await WriteData(idDevice, serviceUUID, characUUid, "******* VUELVE PRONTO *******");
    await NewEmptyLine(idDevice, serviceUUID, characUUid);

    await FeedLeft(idDevice, serviceUUID, characUUid)

    await NewEmptyLine(idDevice, serviceUUID, characUUid);
    //desconectar dispositivo
    //disconnect(ID);
  } catch (e) {
    console.log("ERRROR AL IMPRIMIE  +++++++++++++++++++++++++++" + e)
  }
}



async function LineFeed(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView((new Uint8Array([10])).buffer));
}

async function TurnOnBold(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  const boldOn = new Uint8Array([27, 69, 1]);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(boldOn.buffer));
}

async function TurnOffBold(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  const boldOff = new Uint8Array([27, 69, 0]);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(boldOff.buffer));
}

async function FeedLeft(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  const left = new Uint8Array([27, 97, 0]);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(left.buffer));
}

async function FeedCenter(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  const center = new Uint8Array([27, 97, 1]);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(center.buffer));
}

async function FeedRight(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  const right = new Uint8Array([27, 97, 2]);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(right.buffer));
}

async function WriteData(deviceId: string, serviceUuid: string, characteristicUuid: string, text: string) {
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(text));
}

async function UnderLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  await LineFeed(deviceId, serviceUuid, characteristicUuid);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView('-'.repeat(30)));
}

async function NewEmptyLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
  await LineFeed(deviceId, serviceUuid, characteristicUuid);
  await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(`${' '.repeat(18)}\n`));
}