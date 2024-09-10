<template>
  <ion-menu v-if="appStore.drawerState" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-list>
        <ion-item lines="full" :button="true" @click="toHome()">
          <ion-icon aria-hidden="true" slot="start" :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-item>
        <ion-item lines="full" :button="true" @click="toVentas()">
          <ion-icon aria-hidden="true" slot="start" :icon="calendarOutline"></ion-icon>
          <ion-label>Ventas</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Baratillo</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logOut()">
            <ion-icon slot="icon-only" :icon="logInOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-app>
      <router-view></router-view>
    </ion-app>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonApp,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonButton
} from "@ionic/vue";
import { logInOutline, homeOutline, calendarOutline } from "ionicons/icons";
import { useBackButton } from '@ionic/vue';

import { IUsuario } from "@/interface/Login/Usuario";
import { useRouter } from "vue-router";
import { storeApp } from "@/store/app";
import { onBeforeMount } from "vue";

const router = useRouter();
const appStore = storeApp();

function toHome() {
  router.push({ path: '/' })
}

function toVentas() {
  router.push({ path: "/ventas" });
}

onBeforeMount(() => {
  appStore.setDrawerState(true);

  useBackButton(10, () => {
    console.log("Disabled event")
  });

  const token = localStorage.getItem("token");
  if (token != null) {
    const user = localStorage.getItem("usuario");
    if (user != null) {
      appStore.setUserState(JSON.parse(user) as IUsuario);
    }
  } else {
    router.push({ path: "/login" });
  }
});

function logOut(){
  localStorage.clear();
  router.push({ path: "/login" });
}
</script>

<style>
</style>