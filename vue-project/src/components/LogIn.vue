<script setup>
import {ref} from "vue";
import {auth} from "../firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth"

const email = ref('')
const password = ref('')
const signupmessage = ref('')

async function signup() {
    signInWithEmailAndPassword(auth, email.value, password.value).then((usercredential) => {
        signupmessage.value = "Congratulations!"
        console.log(usercredential.user)
        email.value = ""
        password.value = ""
    }).catch((error) => {
        console.log(error.message)
        signupmessage.value = "Uh oh! Something went wrong."
    })
}

</script>
<template>
<form @submit.prevent="signup">
    <label id="email">Enter your Email to login</label>
    <input v-model="email" id="email" required>
    <label id="pwd">Enter your Password to login</label>
    <input v-model="password" id="pwd" required>
    <input type="submit">
</form>
<span> {{signupmessage}} </span>
</template>

<style scoped>
</style>