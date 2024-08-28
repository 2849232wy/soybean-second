import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchGetUserInfo, fetchLogin } from '@/service/api';
import { $t } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage } from './shared';

export const useAuthStore = defineStore(
  SetupStoreId.Auth,
  () => {
    const route = useRoute();
    const routeStore = useRouteStore();
    const tabStore = useTabStore();
    const { toLogin, redirectFromLogin } = useRouterPush(false);
    const { startLoading, endLoading } = useLoading();

    const userInfo = reactive<Record<string, any>>({
      id: '',
      name: '',
      account: '',
      create_at: 0,
      update_at: 0,
      roles: [],
      permissions: [],
      token: '',
      expiresin: 0
    });

    /** is super role in static route */
    const isStaticSuper = computed(() => {
      const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

      return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
    });

    /** Is login */
    const isLogin = computed(() => Boolean(userInfo.token));

    const setToken = (token: string) => {
      userInfo.token = token;
    };
    const setExpirsin = (expiresin: number) => {
      userInfo.expiresin = expiresin;
    };
    /** Reset auth store */
    async function resetStore() {
      // const authStore = useAuthStore();

      clearAuthStorage();

      // authStore.$reset();

      // if (!route.meta.constant) {
      //   await toLogin();
      // }

      // tabStore.cacheTabs();
      // routeStore.resetStore();
    }

    /**
     * Login
     *
     * @param account User name
     * @param password Password
     * @param [redirect=true] Whether to redirect after login. Default is `true`
     */
    async function login(account: string, password: string, redirect = true) {
      startLoading();

      const { data, error } = await fetchLogin(account, password);
      const { access_token, expiresin } = data;
      setToken(access_token);
      setExpirsin(expiresin);
      if (!error) {
        const res = await fetchGetUserInfo();

        const { id, name, account: accounts, create_at, update_at, roles, permissions } = res.data;
        Object.assign(userInfo, {
          id,
          name,
          account: accounts,
          create_at,
          update_at,
          roles,
          permissions
        });

        if (userInfo.permissions) {
          await routeStore.initAuthRoute();

          if (redirect) {
            await redirectFromLogin();
          }

          if (routeStore.isInitAuthRoute) {
            window.$notification?.success({
              title: $t('page.login.common.loginSuccess'),
              content: $t('page.login.common.welcomeBack', { userName: userInfo.name }),
              duration: 4500
            });
          }
        }
      } else {
        resetStore();
      }

      endLoading();
    }

    async function getUserInfo() {
      const { data: info, error } = await fetchGetUserInfo();

      if (!error) {
        // update store
        Object.assign(userInfo, info);

        return true;
      }

      return false;
    }

    async function initUserInfo() {

      if (isLogin) {
        const pass = await getUserInfo();

        if (!pass) {
          resetStore();
        }
      }
    }
    return {
      userInfo,
      isStaticSuper,
      isLogin,
      resetStore,
      login,
      initUserInfo
    };
  },
  {
    persist: {
      serializer: {
        serialize: (value: any): string => {
          return JSON.stringify(value);
        },
        deserialize: (value: string): any => {
          return JSON.parse(value);
        }
      }
    }
  }
);
