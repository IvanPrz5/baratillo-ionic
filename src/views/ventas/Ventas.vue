<template>
  <IonPage>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Resumen de compra</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <IonCard>
        <ion-card-header>
          <ion-card-title>Ventas del día</ion-card-title>
          <ion-card-subtitle>
            Puedes cambiar las fechas y pulsar el boton para ver nuevos
            resultados.
          </ion-card-subtitle>
        </ion-card-header>
        <IonGrid>
          <IonRow>
            <IonCol size="5">
              <ion-datetime-button
                datetime="fechaInicio"
                locale
              ></ion-datetime-button>
              <ion-modal :keep-contents-mounted="true">
                <ion-datetime
                  id="fechaInicio"
                  presentation="date"
                  v-model="fechaInicio"
                ></ion-datetime>
              </ion-modal>
            </IonCol>
            <IonCol size="5">
              <ion-datetime-button datetime="fechaFin"></ion-datetime-button>
              <ion-modal :keep-contents-mounted="true">
                <ion-datetime
                  id="fechaFin"
                  presentation="date"
                  v-model="fechaFin"
                ></ion-datetime>
              </ion-modal>
            </IonCol>
            <IonCol size="1">
              <ion-button color="success" size="small" @click="fechas">
                <ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
              </ion-button>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
      <div v-if="desserts.length > 0">
        <IonCard style="max-height: 500px; overflow: auto">
          <ion-card-header>
            <ion-card-title>Resultados</ion-card-title>
          </ion-card-header>
          <IonList>
            <ion-item>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <ion-searchbar
                      :debounce="1000"
                      @ionInput="handleInput($event)"
                    ></ion-searchbar>
                  </IonCol>
                  <IonCol size="5">
                    <ion-label>Producto</ion-label>
                  </IonCol>
                  <IonCol
                    size="4"
                    style="display: flex; justify-content: center"
                  >
                    <ion-label>Folio</ion-label>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </ion-item>
            <IonItem v-for="item in desserts" :key="item.folio" size="12">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <ion-label>{{ item.nombre }}</ion-label>
                    <ion-note> $ {{ item.importe }}</ion-note>
                  </IonCol>
                  <IonCol size="4" style="display: flex; align-items: center">
                    <ion-note>{{ item.folio }}</ion-note>
                  </IonCol>
                  <IonCol size="2" style="display: flex; justify-content: end">
                    <ion-button
                      color="danger"
                      size="small"
                      @click="showDeleteDialog(item)"
                    >
                      <ion-icon
                        slot="icon-only"
                        :icon="trashOutline"
                      ></ion-icon>
                    </ion-button>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <ion-item>
            <ion-label slot="end">Total : $ {{ total }}</ion-label>
          </ion-item>
        </IonCard>
      </div>
      <div
        v-else
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50%;
        "
      >
        <ion-label>Sin Resultados</ion-label>
        <!-- <ion-spinner name="dots"></ion-spinner> -->
      </div>
      <ion-modal
        :is-open="openDialog"
        backdropDismiss="false"
        :initial-breakpoint="1"
        :breakpoints="[0, 1]"
      >
        <div class="block">
          <div v-if="!confirmDelete" style="text-align: center">
            <ion-label class="ion-padding">
              Eliminar venta con folio
              <br />
              <strong>{{ folio }}</strong> ?
            </ion-label>
            <div style="margin-top: 25px">
              <IonButton color="danger" @click="close()">Cancelar</IonButton>
              <IonButton color="success" @click="eliminarVenta"
                >Aceptar</IonButton
              >
            </div>
          </div>
          <div v-else>
            <div v-if="loader">
              <ion-spinner></ion-spinner>
              <div></div>
              Eliminando venta ...
            </div>
            <div v-else style="text-align: center">
              <img
                v-if="stateRes"
                height="60"
                src="@/assets/check.png"
                alt=""
              />
              <img v-else height="60" src="@/assets/error.png" alt="" />
              <div></div>
              {{
                stateRes ? ventaMessages.successLabel : ventaMessages.errorLabel
              }}
            </div>
          </div>
        </div>
      </ion-modal>
    </ion-content>
  </IonPage>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonLabel,
  IonNote,
  IonPage,
  IonIcon,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonSpinner,
  IonSearchbar,
} from "@ionic/vue";
import { searchOutline, trashOutline } from "ionicons/icons";

import { onMounted, ref } from "vue";
import { ICobrosExt } from "@/interface/Cobros/ICobros";
import {
  eliminarVentaService,
  ventasByFechaCobroService,
} from "@/services/Ventas/Ventas";
import { ventaMessages } from "@/utils/Anuncio";
import { storeApp } from "@/store/app";

const appStore = storeApp();

const desserts = ref<ICobrosExt[]>([]);
const results = ref(desserts);
const hoy = new Date().toISOString().split("T");

const fechaInicio = ref(hoy[0] + "T00:00:00");
const fechaFin = ref(hoy[0] + "T23:59:59");
const total: any = ref(0.0);

const openDialog = ref(false);
const confirmDelete = ref(false);
const producto = ref("");
const folio = ref("");

const loader = ref(false);
const stateRes = ref(false);

onMounted(() => {
  fechas();
});

async function eliminarVenta() {
  confirmDelete.value = true;
  eliminarVentaService(folio.value)
    .then(() => {
      loader.value = false;
      stateRes.value = true;
      disableDialog();
      fechas();
    })
    .catch(() => {
      loader.value = false;
      stateRes.value = false;
      disableDialog();
      fechas();
    });
}

function fechas() {
  ventasByFechaCobroService(fechaInicio.value, fechaFin.value).then(
    (response) => {
      desserts.value = response;
      total.value = 0.0;
      for (let i = 0; i < desserts.value.length; i++) {
        total.value += desserts.value[i].importe;
      }
    }
  );
}

const handleInput = (event: any) => {
  const query = event.target.value.toLowerCase();
  results.value = desserts.value.filter(
    (d) => d.nombre.toLowerCase().indexOf(query) > -1
  );
};

function showDeleteDialog(item: ICobrosExt) {
  openDialog.value = true;
  producto.value = item.nombre;
  folio.value = item.folio;

  appStore.setDrawerState(false);
}

function close() {
  openDialog.value = false;
  appStore.setDrawerState(true);
}

function disableDialog() {
  setTimeout(function () {
    openDialog.value = false;
    confirmDelete.value = false;
    appStore.setDrawerState(true);
  }, 2000);
}
</script>
