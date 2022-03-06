<script setup>
import { defineProps } from "vue";

const props = defineProps({
  result: Object,
});
</script>

<template>
  <q-card class="my-card" flat bordered>
    <!-- <q-img :src="glyphUrl" /> -->

    <q-card-section>
      <div class="text-overline text-orange-9">{{ overline }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ result.entry }}</div>
      <div class="text-caption text-grey">
        <!-- {{ code }} -->
      </div>
    </q-card-section>
    <q-markup-table>
      <tbody>
        <tr>
          <td>音読み</td>
          <td>{{result.on}}</td>
        </tr>
        <tr>
          <td>訓読み</td>
          <td>{{result.kun}}</td>
        </tr>
        <tr>
          <td>注文</td>
          <td>{{result.defination}}</td>
        </tr>
        <tr>
          <td>所属篇</td>
          <td>{{result.hen}}</td>
        </tr>
        <tr>
          <td>所属部</td>
          <td>{{result.bu}}</td>
        </tr>
        <tr>
          <td>前田本所在</td>
          <td>{{result.loc_maeda}}</td>
        </tr>
        <tr>
          <td>黒川本所在</td>
          <td>{{result.loc_kurokawa}}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- <q-card-actions>
      <div class="row q-gutter-md wrap">
        <div class="col">
          <q-btn
            flat
            color="dark"
            label="unihan"
            :href="unihanLink"
            target="_blank"
          />
        </div>
        <div class="col">
          <q-btn flat color="primary" label="Book" />
        </div>
      </div>
    </q-card-actions> -->
  </q-card>
</template>
