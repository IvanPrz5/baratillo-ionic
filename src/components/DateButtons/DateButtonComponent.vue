<template>
  <ion-datetime-button datetime="fechaInicio"></ion-datetime-button>
  <ion-datetime-button datetime="fechaFin"></ion-datetime-button>

  <ion-modal :keep-contents-mounted="true">
    <ion-datetime
      id="fechaInicio"
      presentation="date"
      :value="hoy[0] + 'T23:59:59'"
      ></ion-datetime>
  </ion-modal>

  <ion-modal :keep-contents-mounted="true">
    <ion-datetime
      id="fechaFin"
      presentation="date"
      :value="hoy[0] + 'T23:59:59'"
      @ion-change="fechas"
    ></ion-datetime>
  </ion-modal>

  <IonButton @click="fechas">OPuebas</IonButton>
</template>

<script lang="ts" setup>
  import { IonButton, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';
  import { ref } from 'vue';

  const hoy = new Date().toISOString().split("T"); 

  const fechaInicio = ref("");
  // const fechaFin = ref("");

  function fechas(){
    console.log(fechaInicio)
  }
</script>