<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useAbout } from '../stores/about'
import { storeToRefs } from 'pinia'

import VueMarkdown from 'vue-markdown-render'
 

const store = useAbout()
const { contents, general_help, creator_helps, copyright_helps, isFetching } = storeToRefs(store)
store.fetchAbout()

const showHelp = (content: any) => {
  showingHelp.value.title = content.title
  showingHelp.value.content = content.content
  showingHelp.value.date = content.pub_date
}

const showingHelp = ref({
  title: "",
  content: "",
  date: ""
})

watch(isFetching, () => {
  showHelp(general_help.value[0])
})

</script>

<template>
  <div class="row q-ma-lg q-gutter-lg">
    <div class="col-12 col-md-3">
      <q-list bordered class="rounded-borders">
        <q-expansion-item label="共通" default-opened>
          <q-item clickable v-ripple v-for="item of general_help" @click="showHelp(item)">
            <q-item-section>
              <q-item-label overline>{{ item.pub_date }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-separator></q-separator>
        <q-item clickable v-ripple v-for="item of creator_helps" @click="showHelp(item)">
          <q-item-section>
            <q-item-label overline>{{ item.pub_date }}</q-item-label>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="item of copyright_helps" @click="showHelp(item)">
          <q-item-section>
            <q-item-label overline>{{ item.pub_date }}</q-item-label>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-12 col-md-8">
      <h4>{{ showingHelp.title }}</h4>
      <vue-markdown :source="showingHelp.content"></vue-markdown>
      <p>updated:{{ showingHelp.date }}</p>
    </div>
  </div>
</template>