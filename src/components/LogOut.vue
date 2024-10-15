<script setup>
import { ref } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth();
const user = ref(null); // Use a ref to make user reactive

// Listen for authentication state changes
onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser; // Update the user state reactively
});

function signOutOfCPP() {
    signOut(auth).then(() => {
        console.log("User signed out.");
        router.push({ path: '/' });
    }).catch((error) => {
        console.error("Sign-out error:", error);
    });
}
</script>

<template>
  <button @click="signOutOfCPP" v-if="user">Logout</button>
</template>

<style scoped>
</style>