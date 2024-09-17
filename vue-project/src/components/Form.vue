<script setup>
import { ref } from "vue"
import { db } from "../firebase.js"
import { doc, setDoc } from "firebase/firestore"
import Banner from "./Banner.vue"
import { exchange } from "../binance.js"



const coinName = ref();
const coinTicker = ref();
const buyPrice = ref();
const buyQuantity = ref();
const emits = defineEmits(['added'])

async function submitForm() {
    // this is included to check the ticker if it resides in the Binance exchange.
    exchange.fetchTicker(coinTicker.value).then(() => {
        const data = {
        Name: coinName.value,
        Ticker: coinTicker.value,
        Buy_Price: buyPrice.value,
        Buy_Quantity: buyQuantity.value
    }
    console.log(data)
    const docref = doc(db, "Crypto", coinName.value)
    setDoc(docref, data).then(() => {
        document.getElementById("form").reset()
        coinName.value = ""
        coinTicker.value = ""
        buyPrice.value = ""
        buyQuantity.value = ""
        emits('added')
    })
    }).catch(() => {
        alert("Did you type in the correct ticker?")
    })

}
</script>

<template>
    <Banner msg="Add coins"></Banner>
    <form @submit.prevent="submitForm" id="form">
        <input type="text" v-model="coinName" placeholder="Coin Name" required><br>
        <input type="text" v-model="coinTicker" placeholder="Coin Ticker" required><br>
        <input type="number" v-model.number="buyPrice" placeholder="Buy price" required min=0><br>
        <input type="number" v-model.number="buyQuantity" placeholder="Buy quantity" required min=0><br>
        <input type="submit">
    </form>
</template>

<style scoped>
</style>