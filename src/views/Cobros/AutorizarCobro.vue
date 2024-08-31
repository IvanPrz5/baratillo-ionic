<template>
    <ion-modal :is-open="props.isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Resumen de compra</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="close">Cancelar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding" color="light">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-card-title>{{ props.cobros?.nombre }}</ion-card-title>
            </ion-col>
            <ion-col size="12">
              <ion-card-content>{{ props.cobros?.concepto }}</ion-card-content>
            </ion-col>
            <ion-col size="12">
              <ion-card-content>{{ props.cobros?.importe }}</ion-card-content>
            </ion-col>
            <ion-col size="12">
              <ion-button color="success" expand="block" @click="confirmarCompra">Confirmar Compra</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>

      </ion-content>
    </ion-modal>
</template>

<script lang="ts" setup>
import { API_URL } from '@/services/config';
import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonGrid, IonCol, IonRow } from '@ionic/vue';
import axios from 'axios';

const emits = defineEmits(["close"]);

const props = defineProps({
  isOpen: Boolean,
  cobros: Object
});

async function confirmarCompra(){
  await axios.post(API_URL + "/Cobros/cobrar", props.cobros)
    .then((response) => {
      console.log(response.data)
    })
    .catch((e) => {
      console.log("Fatal " + e)
    })
}

function close(){
  emits("close")
}
</script>