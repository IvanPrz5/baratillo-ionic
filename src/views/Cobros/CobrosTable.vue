<template>
  <IonPage>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Ventas</ion-title>
        </ion-toolbar>
        <DateButtonComponent></DateButtonComponent>
      </ion-header>

      <IonCard>
        <IonGrid>
          <IonRow>
            <IonCol v-for="item in desserts" :key="item.id" size="12">
              <ion-item>
                <ion-label>{{ item.nombre }}</ion-label>
                <ion-note slot="end"> $ {{ item.importe }}</ion-note>
              </ion-item>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </ion-content>
  </IonPage>
</template>

<script lang="ts" setup>
import DateButtonComponent from "@/components/DateButtons/DateButtonComponent.vue";
import { API_URL } from "@/services/config";
import { IonCard, IonCol, IonGrid, IonItem, IonPage, IonRow } from "@ionic/vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const desserts: any = ref([]);

onMounted(() => {
  console.log("entro");
  getCobrosByDia("2024-08-27T00:00:00", "2024-08-27T23:59:59");
});

async function getCobrosByDia(inicio: string, fin: string) {
  console.log("entro");
  await axios
    .get(API_URL + "/Cobros/byFechasCobro", {
      params: {
        fechaInicio: inicio,
        fechaFin: fin,
      },
    })
    .then((response) => {
      desserts.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}
</script>
