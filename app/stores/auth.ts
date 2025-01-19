import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("authStore", {
  persist: [
    {
      paths: ["token"],
      storage: window?.sessionStorage,
    },
  ],
  state: () => ({
    token: "",
    user: null,
    loadings: {} as Record<string, any>,
    errors: {} as Record<string, any>,
  }),
  getters: {
    authenticated: (state) => !!state.token,
  },
  actions: {
    async login(tenant_id: string, username: string, password: string) {
      try {
        this.loadings.login = true;
        this.errors.login = null;
        const response = await useAPI().adminService.post(
          "/login",
          {
            tenant_id,
            username,
            password,
          },
          {}
        );
        this.token = response.data?.token;
        return response.data;
      } catch (error) {
        this.errors.login = error?.response?.data || error;
        return false;
      } finally {
        this.loadings.login = false;
      }
    },
    async logout() {
      this.token = null;
      this.user = null;
    },
    async fetchUser() {
      try {
        this.loadings.fetchUser = true;
        this.errors.fetchUser = null;
        this.user = jwtDecode(this.token);
      } catch (error) {
        this.errors.fetchUser = error?.response?.data || error;
        this.user = null;
        navigateTo("/auth/login");
      } finally {
        this.loadings.fetchUser = false;
      }
    },
  },
});
