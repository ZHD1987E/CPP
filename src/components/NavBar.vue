<template>
    <div>
        <div id="nav" v-if="user">
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/onlytheprofits">Profits</router-link> |
            <router-link to="/onlytheprofits2">Profits2</router-link> |
            <router-link to="/profile">My profile</router-link>
        </div>
    </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, ref } from "vue";

const user = ref(null); // Use ref to make user reactive

onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            user.value = currentUser; // Update user using reactive reference
        } else {
            user.value = null; // Clear user if not authenticated
        }
    });
});
</script>

<style scoped>
</style>
