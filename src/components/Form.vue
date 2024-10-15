<script setup>
import { ref } from "vue"
import { db } from "../firebase.js"
import { doc, setDoc } from "firebase/firestore"
import Banner from "./Banner.vue"
import { exchange } from "../binance.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {onMounted} from "vue"



const coinName = ref();
const coinTicker = ref();
const buyPrice = ref();
const buyQuantity = ref();
const emits = defineEmits(['added'])
const auth = getAuth();
let userName = ref("");

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userName.value = user.email; // Update userName when authenticated
        } else {
            console.error("No user is signed in.");
            // Handle the case where the user is not logged in
        }
    });
});

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
    const docref = doc(db, userName.value, coinName.value)
    setDoc(docref, data).then(() => {
        document.getElementById("form").reset()
        coinName.value = ""
        coinTicker.value = ""
        buyPrice.value = ""
        buyQuantity.value = ""
        emits('added')
    })
    }).catch((error) => {
        alert("Did you type in the correct ticker?")
        alert(error.message)
    })

}
</script>

<template>
    <Banner msg="Add coins"></Banner>
    <form @submit.prevent="submitForm" id="form">
        <label id="cn">Coin Name:</label>
        <input type="text" id="cn" v-model="coinName" placeholder="Coin Name" required><br>
        <label id="ct">Coin Ticker:</label>
        <input type="text" id="ct" v-model="coinTicker" placeholder="Coin Ticker" required><br>
        <label id="bp">Buy Price:</label>
        <input type="number" id="bp" v-model.number="buyPrice" placeholder="Buy price" required min=0><br>
        <label id="bq">Buy Quantity:</label>
        <input type="number" id="bq" v-model.number="buyQuantity" placeholder="Buy quantity" required min=0><br>
        <input type="submit">
    </form>
</template>

<style scoped>
</style>