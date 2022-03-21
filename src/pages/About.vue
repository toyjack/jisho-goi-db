<script setup lang="ts">
import { date } from 'quasar';
import { reactive, ref, onMounted } from 'vue'

interface IHelp {
  helpType: string
  helpTitle: string
  helpContent: string
  helpUpdateDate: string
}


const expanded = ref(true)
const aboutcontent = reactive({
  name: "about & help",
  content: [
    {
      helpType: "general",
      helpTitle: "header and footer",
      helpContent: "lorem",
      helpUpdateDate: "2022/03/19"
    },
    {
      helpType: "general",
      helpTitle: "header and footer",
      helpContent: "lorem",
      helpUpdateDate: "2022-03-21"
    },
    {
      helpType: "general",
      helpTitle: "header and footer",
      helpContent: "lorem",
      helpUpdateDate: "2022-03-20"
    },
    {
      helpType: "creator",
      helpTitle: "作業者一覧",
      helpContent: "lorem",
      helpUpdateDate:"2022-03-21"
    },
    {
      helpType: "copyright",
      helpTitle: "利用条件",
      helpContent: "lorem",
      helpUpdateDate: "2022-03-21"
    },
  ]
})

const general_help = aboutcontent.content.filter(v => v.helpType == "general").sort((a,b)=>Date.parse(b.helpUpdateDate)-Date.parse(a.helpUpdateDate))
const creator_helps = aboutcontent.content.filter(v => v.helpType == "creator")
const copyright_helps = aboutcontent.content.filter(v => v.helpType == "copyright")


const showingHelp = ref({
  title: "",
  content: "",
  date: ""
})

const showHelp = (content: IHelp) => {
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
        <q-expansion-item label="General" v-model="expanded">
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