<script setup>
import { ref } from "vue"
import { app, db } from "../firebase.js"
import { doc, setDoc } from "firebase/firestore"
import Banner from "./Banner.vue"



const coinName = ref('');
const coinTicker = ref('');
const buyPrice = ref(0);
const buyQuantity = ref(0);

async function submitForm() {
    const data = {
        Name: coinName.value,
        Ticker: coinTicker.value,
        Buy_Price: buyPrice.value,
        Buy_Quantity: buyQuantity.value
    }
    console.log(data)
    const docref = doc(db, "Crypto", coinName.value)
    await setDoc(docref, data)
    location.reload()
}
</script>

<template>
    <Banner msg="Add coins"></Banner>
    <form @submit.prevent="submitForm">
        <input type="text" v-model="coinName" placeholder="Coin Name" required><br>
        <input type="text" v-model="coinTicker" placeholder="Coin Ticker" required><br>
        <input type="number" v-model.number="buyPrice" placeholder="Buy price" required><br>
        <input type="number" v-model.number="buyQuantity" placeholder="Buy quantity" required><br>
        <input type="submit">
    </form>
</template>

<style scoped>
</style>