<script setup lang="ts">
import { ref } from "vue";
import { scroll } from "quasar";

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

const articles = [
  {
    index: 1,
    date: "2022/03/03",
    title: "フロントエンド開発を始めました",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    index: 2,
    date: "2022/03/05",
    title: "テストです",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    index: 3,
    date: "2022/03/05",
    title: "テストです!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    index: 4,
    date: "2022/03/06",
    title: "テストです",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
let showedArticleIndex = articles[articles.length - 1].index;
const changeArticle = (index: number) => {
  showedArticleIndex = index;
};
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
        <div class="q-mt-md text-center">
          {{ slide.content }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="q-ma-xl">
    <q-card flat bordered q-ma-xl q-pa-xl class="my-card">
      <q-card-section>
        <p>現在言語テスター：{{ $t("hello") }}</p>
        <div class="text-h2">辞書語彙データベース</div>
      </q-card-section>

      <q-card-section class="text-h6">
        [説明など]五つの漢和辞書・国語辞書のデータベースを検索できるサイトです。
        <br />
        科研費番号　の支援で...
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        このサイトは
        <span style="color: #1414dc">まだ開発中</span> です。<br />
        バグがありましたら、
        <span style="color: #1414dc">k-ryu@hi.u-tokyo.ac.jp</span>
        へ連絡してください。
        <br />
        なお、 著作権はそれぞれに異なり、使用の前に確認してください。
      </q-card-section>
    </q-card>
  </div>

  <div class="row q-ma-xl">
    <div class="col-12 col-sm-2 col-md3"></div>
    <div class="col-12 col-sm-auto col-md-auto">
      <div class="row">
        <div class="col-4">
          <q-list bordered padding>
            <q-item-label header>お知らせのリスト</q-item-label>
            <q-item
              clickable
              v-ripple
              v-for="article of articles.reverse()"
              :key="article.date"
              @click="scrollToElement(article.date + article.title)"
            >
              <q-item-section>
                <q-item-label>{{ article.date }}</q-item-label>
                <q-item-label caption>
                  {{ article.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-8">
          <q-list padding>
            <q-item-label header>お知らせ</q-item-label>

            <q-item
              v-for="article of articles.reverse()"
              :key="article.date"
              :id="article.date + article.title"
            >
              <q-item-section>
                <q-item-label>
                  {{ article.title }}
                </q-item-label>
                <q-item-label caption>
                  {{ article.date }}
                </q-item-label>
                <p>{{ article.content }}</p>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-2 col-md3"></div>
  </div>
</template>
