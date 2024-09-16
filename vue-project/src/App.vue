<script setup>
import Banner from "./components/Banner.vue"
import Form from "./components/Form.vue"
import Table from "./components/Table.vue"
</script>

<template>
  <Banner msg="Welcome to CPP"></Banner>
  <p1>This is a test app that I made on Vue.js for BT3103.</p1>
  <Form />
  <Suspense>
    <Table />
    <template #fallback>
      <Banner msg="Loading..."></Banner>
    </template>
  </Suspense>
</template>

<style scoped>
</style>
