<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
// const { t } = useI18n();
const { t, locale } = useI18n({ useScope: "global" });

const rightDrawerOpen = ref(false);
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const changeLocale = (to: string) => {
  locale.value = to;
};
</script>

<template>
  <q-layout view="hHh lpR fFr">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{$t("siteTitle")}}
        </q-toolbar-title>

        <q-btn flat round dense icon="translate" class="q-mr-xs">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                v-for="locale in $i18n.availableLocales"
                :key="`locale-${locale}`"
                @click="changeLocale(locale)"
              >
                <q-item-section>{{ locale }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" :label="$t('nav.home')" />
        <q-route-tab to="/jiruisho" :label="$t('nav.jiruisho')" />
        <q-route-tab to="/rakuyoshu" :label="$t('nav.rakuyoshu')" />
        <q-route-tab to="/wakunnoshiori" :label="$t('nav.wakunnoshiori')" />
        <q-route-tab to="/setsuyoshu" :label="$t('nav.setsuyoshu')" />
        <q-route-tab to="/zozokutaizen" :label="$t('nav.zozokutaizen')" />
        <q-route-tab to="/about" :label="$t('nav.about')" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- drawer content -->
      設定など
    </q-drawer>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>辞書語彙データベース</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
