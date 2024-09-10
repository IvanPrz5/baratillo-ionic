<template>
  <ion-content class="ion-padding">
    <ion-modal :is-open="initalOpen" backdropDismiss="false" id="example-modal" ref="modal">
      <div class="wrapper">
        <ion-list lines="none" color="light">
          <ion-item style="margin-top: 15px">
            <img height="200" src="@/assets/aprobado.png" />
          </ion-item>
          <ion-item>
            <ion-label> Producto: {{ props.cobros.nombre }} </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> Descripcion: {{ props.cobros.concepto }} </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> Total: {{ props.cobros.importe }} </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> Folio: {{ props.cobros.folio }} </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Caja :
              {{ appStore.user?.nombre + " " + appStore.user?.apPaterno }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label> Fecha : {{ props.cobros.fechaCobro }} </ion-label>
          </ion-item>
        </ion-list>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
          "
        >
          <ion-button size="default" @click="setOpen()">Volver a Caja</ion-button>
          <ion-button size="default" color="success" @click="print()"
            >Imprimir Ticket</ion-button
          >
        </div>
      </div>
    </ion-modal>
  </ion-content>
  <!-- <div v-for="i in results" :key="i" >
      {{ i }}
    </div> -->
</template>

<script lang="ts" setup>
import { ICobrosExt } from "@/interface/Cobros/ICobros";
import {
  IonModal,
  IonItem,
  IonList,
  IonButton,
  IonContent,
  IonLabel,
} from "@ionic/vue";
import { onMounted, PropType, ref } from "vue";
import { storeApp } from "@/store/app";
import router from "@/router";
import { BleClient } from "@capacitor-community/bluetooth-le";
import { printService } from "./PrinterService";

const appStore = storeApp();

const props = defineProps({
  isOpen: Boolean,
  cobros: {
    type: Object as PropType<ICobrosExt>,
    required: true,
  },
});

const initalOpen = ref(props.isOpen);
const idDevice = ref("DC:0D:51:FD:5A:81");
const serviceUUID = ref("000018f0-0000-1000-8000-00805f9b34fb");
const characUUid = ref("00002af1-0000-1000-8000-00805f9b34fb");

onMounted(() => {
  appStore.setDrawerState(false);
})

const setOpen = () => {
  initalOpen.value = false;
  router.push({ path: "/" });
  appStore.setDrawerState(true);
};

async function print() {
  await BleClient.initialize({ androidNeverForLocation: true });

  if (!(await BleClient.isEnabled())) {
    await BleClient.enable();
  }

  await connect(idDevice.value);

  await printService(
    idDevice.value,
    serviceUUID.value,
    characUUid.value,
    props.cobros
  );
}

async function connect(deviceId: string) {
  await BleClient.connect(deviceId);
}

/* async function disconnect(deviceId: string) {
  await BleClient.disconnect(deviceId);
} */
</script>

<style>
ion-modal#example-modal {
  --width: fit-content;
  --min-width: 300px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}
</style>
