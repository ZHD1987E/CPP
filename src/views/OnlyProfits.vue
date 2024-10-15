<script setup>
    import Table from "../components/Table.vue"
    import NavBar from "../components/NavBar.vue"
    import LogOut from "../components/LogOut.vue"
</script>

<template>
    <NavBar></NavBar>
    <Suspense>
        <Table />
        <template #fallback>
        <p>Please wait...</p>
    </template>
    </Suspense>
    <LogOut></LogOut>
</template>

<style scoped>
</style>