<script setup>
import {ref} from "vue"
import Banner from "../components/Banner.vue"
import Form from "../components/Form.vue"
import Table from "../components/Table.vue"

var refreshTimes = ref(0);

function change() {
  refreshTimes.value++;
  console.log("Change", refreshTimes.value)
}
</script>

<template>
  <Banner msg="Welcome to CPP"></Banner>
  <p1>This is a test app that I made on Vue.js for BT3103.</p1>
  <Form @added="change()" />
  <Suspense>
    <Table :key="refreshTimes" />
    <template #fallback>
      <Banner msg="Loading..."></Banner>
    </template>
  </Suspense>
</template>

<style scoped>
</style>
