<!-- AccountItem.vue -->
<template>
  <v-container class="px-0 my-n6">
    <v-row dense class="align-center">
      <v-col cols="3">
        <v-textarea
          variant="outlined"
          density="compact"
          placeholder="Введите метки"
          :model-value="labelsText"
          @update:model-value="updateLabelsText"
          @blur="updateLabelsText"
          auto-grow
          rows="1"
          maxlength="50"
          counter
        />
      </v-col>
      <v-col cols="2">
        <v-combobox
          :model-value="selectedType"
          @update:model-value="updateSelectedType"
          placeholder="Тип записи"
          variant="outlined"
          density="compact"
          :items="items"
          item-title="title"
          item-value="id"
        />
      </v-col>
      <v-col :cols="isLDAP ? 6 : 3">
        <v-textarea
          :model-value="localAccount.login"
          @update:model-value="updateField('login', $event)"
          placeholder="Логин"
          variant="outlined"
          density="compact"
          auto-grow
          rows="1"
          maxlength="100"
          counter
        />
      </v-col>
      <v-col cols="3" v-if="!isLDAP">
        <v-text-field
          :model-value="localAccount.password"
          @update:model-value="updateField('password', $event)"
          placeholder="Пароль"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="compact"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append-inner="togglePasswordVisibility"
          maxlength="100"
          counter
        />
      </v-col>
      <v-col cols="1">
        <v-btn
          @click="confirmDeleteDialog = !confirmDeleteDialog"
          icon="mdi-trash-can-outline"
          variant="text"
          color="grey-darken-1"
          size="large"
          class="mt-n5 rounded-lg h-auto py-1"
          v-tooltip="{ text: 'Удалить', location: 'top' }"
        />
      </v-col>
    </v-row>

    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Подтверждение удаления</v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить эту учетную запись?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="text"
            @click="confirmDeleteDialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            @click="$emit('remove')"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Account } from "../model/types";

const props = defineProps({
  account: {
    type: Object as () => Account,
    required: true,
  },
});

const emit = defineEmits(["update:account", "remove"]);

interface RecordType {
  id: number;
  title: string;
}

const items: RecordType[] = [
  { id: 1, title: "Локальная" },
  { id: 2, title: "LDAP" },
];

const showPassword = ref(false);
const confirmDeleteDialog = ref(false);
const localAccount = ref<Account>({ ...props.account });
const selectedType = ref<RecordType>(
  items.find((item) => item.title === (props.account.recordType)) || items[0]
);

const labelsText = computed(() =>
  localAccount.value.label.map((label) => label.text).join("; ")
);

const updateLabelsText = (value: string) => {
  localAccount.value.label = value
    .split(';')
    .map(label => label.trim())
    .filter(label => label.length > 0)
    .map(text => ({ text }));
  emitUpdate();
};

const updateSelectedType = (value: RecordType) => {
  selectedType.value = value;

  localAccount.value.recordType = value.title as 'Локальная' | 'LDAP';
  
  if (value.id === 2) {
    localAccount.value.password = null;
  } else {
    localAccount.value.password = localAccount.value.password || '';
  }
  emitUpdate();
};

// Остальные методы без изменений
const updateField = (field: keyof Account, value: any) => {
  localAccount.value[field] = value;
  emitUpdate();
};

const emitUpdate = () => {
  emit('update:account', { ...localAccount.value });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isLDAP = computed(() => selectedType.value.id === 2);

watch(() => props.account, (newVal) => {
  localAccount.value = { ...newVal };
  selectedType.value = items.find((item) => 
    item.title === newVal.recordType
  ) || items[0];
}, { deep: true });
</script>