<script setup>
import { defineProps } from "vue";

const props = defineProps({
  result: Object,
});
</script>

<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <div class="text-overline text-orange-9">{{ result.glyph }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ result.glyph }}</div>
      <div class="text-caption text-grey">
        <!-- {{ code }} -->
      </div>
    </q-card-section>
    <q-markup-table>
      <tbody>
        <tr>
          <td>{{ $t("rakuyoshu.page") }}</td>
          <td>{{ result.page }}</td>
        </tr>
        <tr>
          <td>{{ $t("rakuyoshu.line") }}</td>
          <td>{{ result.line }}</td>
        </tr>
        <tr>
          <td>{{ "行内順" }}</td>
          <td>{{ result.no }}</td>
        </tr>
        <tr>
          <td>{{ $t("rakuyoshu.ruby_left_first") }}</td>
          <td>{{ result.jion_list.left1 }}</td>
        </tr>
        <tr>
          <td>{{ $t("rakuyoshu.ruby_right_first") }}</td>
          <td>{{ result.jion_list.right1 }}</td>
        </tr>
        <tr v-for="item,index of result.wakun_list" :key="index">
          <td>{{ `和訓${index + 1}` }}</td>
          <td>{{ item }}</td>
        </tr>
        
      </tbody>
    </q-markup-table>

    <!-- <q-card-actions align="center">
      <q-btn
        color="primary"
        label="Gallica"
        :href="result.gallica"
        target="_blank"
      />
    </q-card-actions> -->
  </q-card>
</template>
