<script setup>
// home page
import { ref } from "vue";
import Result from "../components/RakuyoshuResultCard.vue";

const term = ref("山");
const results = ref({});

const search = () => {
  fetch("http://portal.kojisho.com/api/v1/rakuyoshu/search/" + term.value)
    .then((res) => res.json())
    .then((data) => (results.value = data));
};
</script>

<template>
  <div class="column q-pa-md q-gutter-md">
    <div class="row">
      <div class="col-12 col-sm-2 col-md-3"></div>
      <div class="col-12 col-sm-8 col-md-6">
        <q-input filled v-model="term" :label="$t('rakuyoshu.inputForSearch')" />
      </div>
      <div class="col-12 col-sm-2 col-md-3"></div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-2 col-md-3"></div>

      <div class="col-12 col-sm-8 col-md-6">
        <div class="column items-end">
          <div class="col q-gutter-md">
            <q-btn color="white" text-color="black" :label="$t('button.clear')" />
            <q-btn color="primary" :label="$t('button.search')" @click="search" />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-2 col-md-3"></div>
    </div>

    <div class="row no-wrap items-center" v-if="results.length > 0">
      <div class="col"><q-separator inset /></div>
      <div class="col-grow q-px-md">
        {{ $t("label.numOfResults") }}{{ results.length }}
      </div>
      <div class="col"><q-separator inset /></div>
    </div>

    <div class="row">
      <!-- <div class="col-12 col-sm-2 col-md-3"></div> -->
      <div class="col-12 col-sm-auto col-md-auto">
        <div class="row wrap q-gutter-sm justify-center">
          <div class="col-3" v-for="item of results" :key="item">
            <Result :result="item" />
          </div>
        </div>
      </div>
      <!-- <div class="col-12 col-sm-2 col-md-3"></div> -->
    </div>
  </div>
</template>
