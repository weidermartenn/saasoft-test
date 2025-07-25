import { defineStore } from "pinia";
import type { Account, Label } from "@/entitites/account/model/types";

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    accounts: [],
    loading: false,
    error: null,
  }),

  actions: {
    /**
     * Добавление новой учетной записи
     */
    async addEmptyAccount(): Promise<Account | null> {
      try {
        this.loading = true;
        this.error = null;
        
        const newAccount: Account = {
          label: [],
          recordType: 'Локальная',
          login: '',
          password: '',
        };
        
        this.accounts.push(newAccount);
        return newAccount;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to add account';
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Обновление данных учетной записи
     */
    async updateAccount(id: number, updates: Partial<Account>): Promise<boolean> {
      try {
        this.loading = true;
        this.error = null;
        
        this.accounts[id] = {
          ...this.accounts[id],
          ...updates
        };
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update account';
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Удаление учетной записи
     */
    async removeAccount(id: number): Promise<boolean> {
      try {
        this.loading = true;
        this.error = null;
        
        this.accounts.splice(id, 1);
        return true;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to remove account';
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Парсинг строки меток в массив Label[]
     */
    parseLabels(labels: string): Label[] {
      try {
        if (!labels.trim()) return [];
        
        return labels
          .split(';')
          .map(label => label.trim())
          .filter(label => label.length > 0)
          .map(text => ({ text }));
      } catch (err) {
        this.error = 'Failed to parse labels';
        return [];
      }
    },
    
    /**
     * Сброс ошибки
     */
    clearError(): void {
      this.error = null;
    }
  },

  getters: {
    getAccounts: (state) => state.accounts,
    count: (state) => state.accounts.length,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

  persist: {
    key: 'accounts-storage',
    paths: ['accounts'],
    storage: localStorage,
    serializer: {
      serialize: (value) => JSON.stringify(value),
      deserialize: (value) => JSON.parse(value),
    }
  }
});