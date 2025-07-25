<template>
  <v-container class="fill-height" max-width="1100">
    <v-card class="pa-4" elevation="0" color="background" width="100%">
      <div class="d-flex align-center ga-4 mb-4">
        <h3>Учетные записи</h3>
        <v-btn
          @click="handleAddAccount"
          icon="mdi-plus"
          elevation="0"
          color="surface"
          class="border rounded-lg"
        />
      </div>
      <v-alert icon="mdi-help-circle-outline" density="compact">
        <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
      </v-alert>

      <account-list>

      </account-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccountList from './AccountList.vue';

const handleAddAccount = () => {

}
</script>
