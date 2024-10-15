<script setup>
    import Table from "../components/Table.vue"
    import NavBar from "../components/NavBar.vue"
</script>

<template>
    <NavBar></NavBar>
    <Suspense>
        <Table />
        <template #fallback>
        <p>Please wait...</p>
    </template>
    </Suspense>
</template>

<style scoped>
</style>