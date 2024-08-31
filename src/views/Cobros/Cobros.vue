<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Comprar</ion-title>
          
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <Form @submit="cobrar">
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <Field name="nombre" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
                  <ion-input :value="value" label="Nombre" label-placement="floating" fill="outline" :clear-input="true"
                    @input="handleChange"></ion-input>
                  <ion-text color="danger"><sub>{{ errorMessage }} </sub></ion-text>
                </Field>
              </ion-col>

              <ion-col size="12">
                <Field name="concepto" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
                  <ion-textarea :value="value" label="Solid textarea" label-placement="floating" fill="outline"
                    placeholder="Enter text" :auto-grow="true" :counter="true" :maxlength="250"
                    @input="handleChange"></ion-textarea>
                  <ion-text color="danger"><sub>{{ errorMessage }} </sub></ion-text>
                </Field>
              </ion-col>

              <ion-col size="12">
                <Field name="importe" v-slot="{ handleChange, value, errorMessage }" :rules="rules.requerido">
                  <ion-input :value="value" label="Importe" label-placement="floating" fill="outline"
                    @input="handleChange"></ion-input>
                  <ion-text color="danger"><sub>{{ errorMessage }} </sub></ion-text>
                </Field>
              </ion-col>
              <ion-col size="12">
                <ion-button expand="block" type="submit">Cobrar</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </Form>
      </ion-card>
    </ion-content>
  </ion-page>
  <AutorizarCobro :isOpen="isOpen" :cobros="cobros" @close="close" />
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
  IonText,
} from "@ionic/vue";
import { ref } from "vue";
import AutorizarCobro from "./AutorizarCobro.vue";
import { Form, Field } from "vee-validate";
import Rules from "@/utils/Rules";
import { ICobrosPost } from "@/interface/Cobros/ICobros";

const rules = new Rules();
const isOpen = ref(false);
const cobros = ref<ICobrosPost>({
  nombre: "",
  importe: null,
  concepto: "",
  fechaCobro: "",
  folio: "",
  status: true,
  idUsuarioCobro: { id: 1 },
});

// revisar el tipo de value 
const cobrar = (values: any) => {
  isOpen.value = true;
  cobros.value = values;
}

function close() {
  isOpen.value = false;
}
</script>
