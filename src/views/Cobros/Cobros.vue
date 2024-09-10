<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Comprar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <div class="control-custom">
          <img src="@/assets/caja-registradora.png" height="200" alt="" />
        </div>
        <Form @submit="cobrar" v-slot="{ handleReset }" >
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <Field name="nombre" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
                  <ion-input :value="value" label="Producto" label-placement="floating" fill="outline" :clear-input="true"
                    @input="handleChange" :helper-text="errorMessage" class="custom"></ion-input>
                </Field>
              </ion-col>

              <ion-col size="12">
                <Field name="concepto" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
                  <ion-textarea :value="value" label="Descripcion" label-placement="floating" fill="outline"
                    :auto-grow="true" :counter="true" :maxlength="250" @input="handleChange"  class="custom" :helper-text="errorMessage"></ion-textarea>
                </Field>
              </ion-col>

              <ion-col size="12">
                <Field name="importe" v-slot="{ handleChange, value, errorMessage }"
                  :rules="[rules.requerido, rules.numero]">
                  <ion-input :value="value" label="Importe" label-placement="floating" fill="outline"
                    @input="handleChange" type="number"  class="custom" :helper-text="errorMessage"></ion-input>
                </Field>
              </ion-col>
              <ion-col size="6">
                <ion-button color="warning" expand="block" @click="handleReset">Limpiar</ion-button>
              </ion-col>
              <ion-col size="6">
                <ion-button expand="block" type="submit">Cobrar</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </Form>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import { Form, Field } from "vee-validate";

import Rules from "@/utils/Rules";
import router from "@/router";
import { ICobrosExt } from "@/interface/Cobros/ICobros";

const rules = new Rules();

// revisar el tipo de value 
const cobrar = (values: any) => {
  localStorage.setItem("cobro", JSON.stringify(values as ICobrosExt))
  router.push({ path: "/autorizar-cobro" })
}

</script>

<style>
  ion-input.custom.ios .input-bottom .helper-text,
  ion-input.custom.md .input-bottom .helper-text,
  ion-textarea.custom.ios .textarea-bottom .helper-text,
  ion-textarea.custom.md .textarea-bottom .helper-text {
    color: red;
  }

  .control-custom{
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>