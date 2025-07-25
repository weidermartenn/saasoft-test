<template>
  <v-container class="px-0">
    
    <v-row dense class="align-center">
      <v-col cols="3">
        <v-textarea
          variant="outlined"
          density="compact"
          placeholder="Введите метки"
          auto-grow
          rows="1"
        >
        </v-textarea>
      </v-col>
      <v-col cols="2">
        <v-combobox
          v-model="selectedType"
          placeholder="Тип записи"
          variant="outlined"
          density="compact"
          :items="items"
          item-title="title"
          item-value="id"
        />
      </v-col>
      <v-col :cols="isLDAP ? 6 : 3">
        <v-text-field
          placeholder="Логин"
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="3" v-if="!isLDAP">
        <v-text-field
          placeholder="Пароль"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="compact"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append-inner="togglePasswordVisibility"
        >
        </v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          icon="mdi-trash-can-outline"
          variant="text"
          color="grey-darken-1"
          size="large"
          class="mt-n5 rounded-lg h-auto py-1"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface RecordType {
  id: number;
  title: string;
}

const items: RecordType[] = [
  {
    id: 1,
    title: "Локальная",
  },
  {
    id: 2,
    title: "LDAP",
  },
];

const selectedType = ref<RecordType>(items[0]);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const isLDAP = computed(() => selectedType.value.id === 2);
</script>

<style scoped lang="scss"></style>
