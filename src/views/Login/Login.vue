<template>
  <IonPage style="
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10%;
    ">
    <Form @submit="login">
      <IonGrid>
        <IonRow>
          <IonCol>
            <img src="@/assets/fondo.svg" alt="" />
          </IonCol>
          <IonCol size="12">
            <Field name="email" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
              <IonInput :value="value" label="Email" label-placement="floating" fill="outline" @input="handleChange"
                :helper-text="errorMessage"></IonInput>
            </Field>
          </IonCol>
          <IonCol size="12">
            <Field name="password" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
              <IonInput :value="value" type="password" label="Password" label-placement="floating" fill="outline"
                @input="handleChange" :helper-text="errorMessage">
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </Field>
          </IonCol>
          <IonCol size="12">
            <IonButton expand="block" type="submit">Acceder</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Form>
  </IonPage>
  <AlertComponent :open="openAlert" :header="errorLog.title" :msj="errorLog.label" @closeAlert="closeAlert()">
  </AlertComponent>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonRow,
} from "@ionic/vue";
import { Form, Field } from "vee-validate";

import { ref } from "vue";
import { loginService } from "@/services/Login/login";
import { useRouter } from "vue-router";
import { IUsuario } from "@/interface/Login/Usuario";
import Rules from "@/utils/Rules";
import { storeApp } from "@/store/app";
import AlertComponent from "@/components/Alert/AlertComponent.vue";
import { errorLog } from "@/utils/Anuncio";
import { Credentials } from "@/interface/Login/Credentials";

const appStore = storeApp();
const rules = new Rules();

const router = useRouter();

const openAlert = ref(false);

const login = (value: any) => {
  loginService(value as Credentials)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      appStore.setUserState(response.data.usuario[0]);
      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario[0] as IUsuario)
      );
      router.push({ path: "/home" });
    })
    .catch((e) => {
      console.log("Fatal" + e);
      openAlert.value = true;
    })
    .finally();
}

function closeAlert() {
  openAlert.value = false;
}
</script>
