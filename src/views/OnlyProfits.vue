<script setup>
    import Table from "../components/Table.vue"
</script>

<template>
    <Suspense>
        <Table />
        <template #fallback>
        <p>Please wait...</p>
    </template>
    </Suspense>
</template>

<style scoped>
</style>