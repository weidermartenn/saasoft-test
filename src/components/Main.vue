<!-- Main.vue -->
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
        <span
          >Для указания нескольких меток для одной пары логин/пароль используйте
          разделитель ;</span
        >
      </v-alert>

      <v-row dense class="my-4">
        <v-col :cols="header.cols" v-for="header in headers" :key="header.id">
          <span class="font-weight-medium text-body-2 opacity-50">{{
            header.title
          }}</span>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>

      <v-alert v-if="accountStore.accounts.length === 0" density="compact" color="warning">
        <span>Список учетных записей пуст</span>
      </v-alert>

      <v-progress-circular
        v-else-if="accountStore.loading"
        indeterminate
        color="primary"
      />

      <div v-else class="scroll-container">
        <div class="mt-2">
          <account-item
            v-for="(account, index) in accounts"
            :key="index"
            :account="account"
            @update:account="updateAccount(index, $event)"
            @remove="removeAccount(index)"
          />
        </div>
      </div>
    </v-card>

    <v-snackbar v-model="notification.show" :color="notification.color" :timeout="notification.timeout" variant="outlined">
      <v-icon :icon="notification.icon" class="mr-2" />
      {{ notification.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAccountStore } from "@/entitites/account/model/store";
import type { Account } from "@/entitites/account/model/types";
import AccountItem from "@/entitites/account/ui/AccountItem.vue";

const headers = [
  { id: 1, title: "Метки", cols: 3 },
  { id: 2, title: "Тип записи", cols: 2 },
  { id: 3, title: "Логин", cols: 3 },
  { id: 4, title: "Пароль", cols: 3 },
];

const accounts = ref<Account[]>([]);
const accountStore = useAccountStore();

const notification = ref({
  show: false,
  message: '',
  color: 'success',
  icon: 'mdi-check-circle-outline',
  timeout: 3000
})

const showNotification = (type: 'success' | 'error', message: string) => {
  const config = {
    success: { color: 'success', icon: 'mdi-check-circle-outline' },
    error: { color: 'error', icon: 'mdi-alert-circle-outline' },
  };

  notification.value = {
    show: true,
    message,
    color: config[type].color,
    icon: config[type].icon,
    timeout: 3000,
  };
}

const handleAddAccount = async () => {
  const newAccount = await accountStore.addEmptyAccount();
  if (newAccount) {
    accounts.value = [...accountStore.getAccounts];
    showNotification('success', 'Добавлена новая учетная запись');
  }
};

const updateAccount = async (index: number, updatedAccount: Account) => {
  const success = await accountStore.updateAccount(index, updatedAccount);
  if (success) {
    accounts.value = [...accountStore.getAccounts];
  }
};

const removeAccount = async (index: number) => {
  const success = await accountStore.removeAccount(index);
  if (success) {
    accounts.value = [...accountStore.getAccounts];
    showNotification('success', 'Учетная запись удалена');
  }
};

onMounted(() => {
  accounts.value = [...accountStore.getAccounts];
  console.log(accounts.value);
});
</script>

<style scoped lang="scss">
.scroll-container {
  height: 20vh;
  max-height: 60vh;
  overflow-y: auto;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;

    &:hover {
      background-color: #555;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
}
</style>