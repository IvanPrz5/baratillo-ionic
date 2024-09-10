<template>
  <ion-alert
    :is-open="props.open"
    :header="props.header"
    :message="props.msj"
    :buttons="alertButtons"
    @didDismiss="close()"
  ></ion-alert>
</template>

<script lang="ts" setup>
import { IonAlert } from "@ionic/vue";

const props = defineProps({
  open: Boolean,
  header: String,
  msj: String
});

const emits = defineEmits(["closeAlert"]);

const alertButtons = ["Entiendo"];

function close() {
  emits("closeAlert");
}
</script>
