<template>
  <v-container class="px-0">
    <v-row dense>
      <v-col :cols="header.cols" v-for="header in headers" :key="header.id">
        <span class="font-weight-medium text-body-2 opacity-50">{{
          header.title
        }}</span>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <account-item />
  </v-container>
</template>

<script setup lang="ts">
import { AccountItem } from "@/entitites/account/ui";

const headers = [
  {
    id: 1,
    title: "Метки",
    cols: 3,
  },
  {
    id: 2,
    title: "Тип записи",
    cols: 2,
  },
  {
    id: 3,
    title: "Логин",
    cols: 3,
  },
  {
    id: 4,
    title: "Пароль",
    cols: 3,
  },
];
</script>

<style scoped></style>
