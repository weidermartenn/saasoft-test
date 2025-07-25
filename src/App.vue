<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0" color="background">
        <v-btn 
          color="primary" 
          location="center" 
          @click="toggleTheme" 
          :icon="themeIcon" 
          variant="flat" 
          v-tooltip="{ text: isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему', location: 'left'}"
        />
      </v-app-bar>
  
      <Main />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { ref, computed } from "vue";
import Main from "@/components/Main.vue";

const theme = useTheme();
const isDark = ref(theme.global.name.value === "dark");

const themeIcon = computed(() =>
  isDark.value ? "mdi-weather-night" : "mdi-white-balance-sunny"
);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? "dark" : "light";
};
</script>
