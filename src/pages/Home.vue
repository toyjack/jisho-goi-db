<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { scroll } from "quasar";
import { useNews } from '../stores/news'

const store = useNews()
store.fetchNews()
const { news, isFetching } = storeToRefs(store)

const { getScrollTarget, setVerticalScrollPosition } = scroll;

const scrollToElement = (id: string) => {
  let el = document.getElementById(id);
  if (el) {
    const target = getScrollTarget(el);
    const offset = el.offsetTop;
    const duration = 300;
    setVerticalScrollPosition(target, offset, duration);
  }
};

const slides = [
  {
    name: "hi",
    icon: "assured_workload",
    content: "特徴１",
  },
  {
    name: "nihao",
    icon: "school",
    content: "特徴２",
  },
];
const firstSlide = ref("hi");
</script>

<template>
  <div class="q-mx-xl q-my-sm">
    <q-carousel
      v-model="firstSlide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="300px"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide
        :name="slide.name"
        class="column no-wrap flex-center"
        v-for="slide of slides"
        :key="slide.content"
      >
        <q-icon :name="slide.icon" size="56px" />
        <div class="q-mt-md text-center">{{ slide.content }}</div>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="q-mx-xl">
    <q-card flat bordered q-ma-xl q-pa-xl class="my-card">
      <q-card-section>
        <div class="text-h2">辞書語彙データベース</div>
      </q-card-section>

      <q-card-section class="text-h6">
        [説明など]五つの漢和辞書・国語辞書のデータベースを検索できるサイトです。
        <br />科研費番号 の支援で...
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        このサイトは
        <span style="color: #1414dc">まだ開発中</span> です。
        <br />バグがありましたら、
        <span style="color: #1414dc">k-ryu@hi.u-tokyo.ac.jp</span>
        へ連絡してください。
        <br />なお、 著作権はそれぞれに異なり、使用の前に確認してください。
      </q-card-section>
    </q-card>
  </div>

  <div class="row q-mx-xl q-my-sm">
    <!-- <div class="col-12 col-sm-2 col-md3"></div> -->
    <div class="col-12 col-sm-auto col-md-auto">
      <div class="row q-gutter-md">
        <div class="col-sm-12 col-md-4">
          <q-list bordered padding>
            <q-item-label header>お知らせのリスト</q-item-label>
            <q-item
              clickable
              v-ripple
              v-for="article of news.slice().reverse()"
              :key="article.pub_date"
              @click="scrollToElement(article.pub_date + article.title)"
            >
              <q-item-section>
                <q-item-label>{{ article.pub_date }}</q-item-label>
                <q-item-label caption>{{ article.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-sm-12 col-md-7">
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="article of news.slice().reverse()"
              :key="article.pub_date"
              :id="article.pub_date + article.title"
              :title="article.title"
              :subtitle="article.pub_date"
            >{{ article.content }}</q-timeline-entry>
          </q-timeline>
        </div>
      </div>
    </div>
    <!-- <div class="col-12 col-sm-2 col-md3"></div> -->
  </div>
</template>
