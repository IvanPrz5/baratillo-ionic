<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Resumen de compra</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col
              size="2"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img height="50" src="@/assets/aprobado.png" />
            </ion-col>
            <ion-col size="10">
              <ion-card-content style="display: flex; flex-direction: column">
                <div>
                  <ion-card-title style="display: flex">
                    {{ appStore.autorizationCobro?.nombre }}
                  </ion-card-title>
                </div>
                <div>
                  {{ appStore.autorizationCobro?.concepto }}
                </div>
                <div style="display: flex; justify-content: end">
                  {{ currencyFormatter(appStore.autorizationCobro?.importe) }}
                </div>
              </ion-card-content>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <ion-grid>
        <ion-row>
          <ion-col size="4">
            <ion-button color="danger" expand="block" @click="cancelarCobro">
              Cancelar
            </ion-button>
          </ion-col>
          <ion-col size="8">
            <ion-button color="success" expand="block" @click="confirmarCompra">
              Autorizar Cobro
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-modal
      :is-open="loader"
      backdropDismiss="false"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
    >
      <div class="block">
        <ion-spinner></ion-spinner>
        <div></div>
        Procesando Compra..
      </div>
    </ion-modal>
    <Ticket
      v-if="openTicket == true"
      :isOpen="openTicket"
      :cobros="ticketProps"
      @close="close"
    ></Ticket>
    <AlertComponent
      :open="openAlert"
      :header="title"
      :msj="label"
      @closeAlert="closeAlert()"
    ></AlertComponent>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonGrid,
  IonCol,
  IonRow,
  IonCardContent,
  IonCardTitle,
  IonModal,
  IonSpinner,
  IonCard,
} from "@ionic/vue";

import { onBeforeMount, ref } from "vue";
import { storeApp } from "@/store/app";
import router from "@/router";
import { confirmCompraService } from "@/services/Cobros/Cobros";
import { ICobrosExt } from "@/interface/Cobros/ICobros";
import { currencyFormatter } from "@/utils/Moneda";
import { cobroMessages } from "@/utils/Anuncio";
import AlertComponent from "@/components/Alert/AlertComponent.vue";
import Ticket from "@/components/Ticket/Ticket.vue";

const appStore = storeApp();

const loader = ref(false);
const openTicket = ref(false);
const openAlert = ref(false);
const showAlert = ref(false);
const title = ref("");
const label = ref("");

const ticketProps = ref<ICobrosExt>({
  nombre: "",
  importe: null,
  concepto: "",
  fechaCobro: "",
  folio: "",
  status: true,
  idUsuarioCobro: { id: appStore.user?.id },
});

onBeforeMount(() => {
  const cobro = localStorage.getItem("cobro");
  if (cobro != null) {
    appStore.setAutorizationCobro(JSON.parse(cobro) as ICobrosExt);
  }
});

function confirmarCompra() {
  loader.value = true;
  confirmCompraService(appStore.user?.id, appStore.autorizationCobro)
    .then((response) => {
      loader.value = false;
      ticketProps.value = response;
      openTicket.value = true;
    })
    .catch(() => {
      showAlert.value = true;
      title.value = cobroMessages.error;
      label.value = cobroMessages.errorLabel;
    });
}

function close() {
  openTicket.value = false;
}

function cancelarCobro() {
  router.push({ path: "/" });
}

function closeAlert() {
  openAlert.value = false;
}
</script>

<style>
ion-loading.custom-loading {
  --background: #e3edff;
  --spinner-color: #1c6dff;
  /* color: #1c6dff; */
}

ion-card {
  --background: #292929;
  --color: #84b2dd;
}

.block {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-modal {
  --height: auto;
}

ion-spinner {
  width: 40px;
  height: 40px;
}
</style>
