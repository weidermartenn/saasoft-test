/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const grayscale = {
  white: '#ffffff',     // Чистый белый
  gray50: '#fafafa',    // Сверхсветлый серый
  gray100: '#f5f5f5',   // Очень светлый серый
  gray200: '#eeeeee',   // Светло-серый
  gray300: '#e0e0e0',   // Серый (границы)
  gray400: '#bdbdbd',   // Средне-серый (неактивные элементы)
  gray500: '#9e9e9e',   // Серый (текст)
  gray600: '#757575',   // Тёмно-серый (вторичный текст)
  gray700: '#616161',   // Очень тёмный серый
  gray800: '#424242',   // Почти чёрный
  gray900: '#212121',   // Почти чёрный (акцент)
  black: '#000000',     // Чистый чёрный
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: grayscale.white,     // Фон
          surface: grayscale.gray50,      // Карточки, панели
          primary: grayscale.gray900,     // Основной акцент (почти чёрный)
          secondary: grayscale.gray600,   // Вторичные элементы
          error: grayscale.gray700,       // Ошибки (тёмно-серый)
          info: grayscale.gray500,        // Информация
          success: grayscale.gray800,     // Успех
          warning: grayscale.gray700,     // Предупреждение
          'on-background': grayscale.black, // Текст на фоне
          'on-surface': grayscale.black,  // Текст на поверхностях
        },
      },
      dark: {
        dark: true,
        colors: {
          background: grayscale.gray900,  // Тёмный фон
          surface: grayscale.gray800,     // Карточки
          primary: grayscale.white,       // Основной акцент (белый)
          secondary: grayscale.gray400,   // Вторичные элементы
          error: grayscale.gray500,       // Ошибки
          info: grayscale.gray300,        // Информация
          success: grayscale.gray200,     // Успех
          warning: grayscale.gray400,     // Предупреждение
          'on-background': grayscale.white, // Текст на фоне
          'on-surface': grayscale.white,  // Текст на поверхностях
        },
      },
    },
  },
})