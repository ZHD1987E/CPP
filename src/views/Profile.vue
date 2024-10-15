<script setup>
import Banner from "@/components/Banner.vue"
import NavBar from "../components/NavBar.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, ref } from "vue";
import LogOut from "@/components/LogOut.vue"

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

<template>
    <NavBar></NavBar>
    <Banner msg="Your profile" />
    <div v-if="user">
        <p> Name:{{ user.displayName }} <br> Email: {{ user.email }} <br> User ID: {{ user.uid }} <br> Provider: {{ user.providerData[0].providerId }}</p>
    </div>
    <LogOut></LogOut>
</template>