<template>
  <ion-page>
      <ion-card>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <ion-input label="Email" label-placement="floating" fill="outline" :value="credenciales.email"></ion-input>
              </ion-col>
              <ion-col size="12">
                <ion-input  type="password" label="Password" label-placement="floating" fill="outline" :value="credenciales.password">
                  <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                </ion-input>
              </ion-col>
              <ion-col size="12">
                  <ion-button expand="block" @click="login()">Acceder</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
          <IonLabel>{{ msj }}</IonLabel>
        </ion-card-content>
      </ion-card>
  </ion-page>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import { IonLabel } from "@ionic/vue";
import { loginService } from "@/services/login";
import { Credentials } from "@/interface/Login/Credentials";

const credenciales = ref<Credentials>({
  email: 'admin',
  password: 'admin',
})

const msj = ref("Preuas");

function login(){
  const login = loginService(credenciales.value);
  login.then((response) => {
    msj.value = response
  })
  .catch((e) => {
    console.log("Fatal" + e)
  })
  .finally();
  console.log(msj.value)
}
</script>
