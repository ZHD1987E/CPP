<script setup>
import Banner from "../components/Banner.vue";
import firebase from "@/uifire.js";
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onMounted } from 'vue';

onMounted(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
        signInSuccessUrl: '/home',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    ui.start("#firebaseui-auth-container", uiConfig);
});
</script>

<template>
  <Banner msg="Welcome to CPP!"></Banner>
  <div id="firebaseui-auth-container"></div>
  <p>This is a test app that allows you to track your coins.</p>
</template>

<style scoped>
</style>