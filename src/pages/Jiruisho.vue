<script setup>
// home page
import { ref } from "vue";
import Result from "../components/JiruishoResultCard.vue";
import {searchJiruisho} from '../api'

const term = ref("山");
const results = ref([]);

const search = async () => {
  results.value = await searchJiruisho(term.value)
  console.log(results.value)
}

const clear = ()=>{
  term.value=""
}
</script>

<template>
  <div class="column q-pa-md q-gutter-md">
    <div class="row">
      <div class="col-12 col-sm-2 col-md-3"></div>
      <div class="col-12 col-sm-8 col-md-6">
        <q-input filled v-model="term" :label="$t('label.inputForSearch')" />
      </div>
      <div class="col-12 col-sm-2 col-md-3"></div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-2 col-md-3"></div>

      <div class="col-12 col-sm-8 col-md-6">
        <div class="column items-end">
          <div class="col q-gutter-md">
            <q-btn color="secondary" text-color="dark" :label="$t('button.clear')" @click="clear" />
            <q-btn color="primary" text-color="dark" :label="$t('button.search')" @click="search" />
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
