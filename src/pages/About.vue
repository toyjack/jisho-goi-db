<script setup lang="ts">
import { date } from 'quasar';
import { reactive, ref, onMounted } from 'vue'
import { useAbout } from '../stores/about'

const store = useAbout()

const general_help = store.contents.filter(v => v.helpType == "general").sort((a,b)=>Date.parse(b.helpUpdateDate)-Date.parse(a.helpUpdateDate))
const creator_helps = store.contents.filter(v => v.helpType == "creator")
const copyright_helps = store.contents.filter(v => v.helpType == "copyright")

const showingHelp = ref({
  title: "",
  content: "",
  date: ""
})

const showHelp = (content: any) => {
  showingHelp.value.title = content.helpTitle
  showingHelp.value.content = content.helpContent
  showingHelp.value.date = content.helpUpdateDate
}

onMounted(()=>{
  showHelp(general_help[0])
})
</script>

<template>
  <div class="row q-ma-lg q-gutter-lg">
    <div class="col-12 col-md-3">
      <q-list bordered class="rounded-borders">
        <q-expansion-item label="General" default-opened>
          <q-item clickable v-ripple v-for="item of general_help"  @click="showHelp(item)">
            <q-item-section>
              <q-item-label overline>{{ item.helpUpdateDate }}</q-item-label>
              <q-item-label>{{ item.helpTitle }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-separator></q-separator>
        <q-item clickable v-ripple v-for="item of creator_helps" @click="showHelp(item)">
          <q-item-section>
            <q-item-label overline>{{ item.helpUpdateDate }}</q-item-label>
            <q-item-label>{{ item.helpTitle }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="item of copyright_helps" @click="showHelp(item)">
          <q-item-section>
            <q-item-label overline>{{ item.helpUpdateDate }}</q-item-label>
            <q-item-label>{{ item.helpTitle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-12 col-md-8">
      <h4>{{showingHelp.title}}</h4>
      <p>{{showingHelp.content}}</p>
      <p>updated:{{showingHelp.date}}</p>
    </div>
  </div>
</template>