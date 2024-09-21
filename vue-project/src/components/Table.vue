<script setup>
import { ref } from 'vue';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import Banner from "./Banner.vue";
import { db } from "../firebase.js";
import { exchange } from "../binance";

const entries = ref([]);
let totalProfits = ref(0);
let ProfitMessage = ref('')

async function deleteEntry(entry) {
    const docToDelete = doc(db, "Crypto", entry);
    await deleteDoc(docToDelete);
    totalProfits.value = 0;
    await display();
}

async function display() {
    let snapshot = await getDocs(collection(db, "Crypto"));
    let data = snapshot.docs.map((doc) => doc.data());
    let index = 1;

    await Promise.all(data.map(async (entry) => {
        try {
            const v = await exchange.fetchOHLCV(entry.Ticker, "5m");
            entry.Current_Price = v[499][4];
        } catch {
            entry.Current_Price = 0;
        }
        entry.Profit = Math.round(entry.Buy_Quantity * (entry.Current_Price - entry.Buy_Price),2);
        totalProfits.value += entry.Profit;
        entry.Index = index++;
    }));

    entries.value = data;
    ProfitMessage.value = `Total Profits: $ ${totalProfits.value}`;
}

await display();

</script>

<template>
    <Banner msg="Profits"></Banner>
    <table id="tb">
        <thead>
            <tr>
                <th>Serial</th>
                <th>Coin Name</th>
                <th>Coin Ticker</th>
                <th>Buy Price</th>
                <th>Buy Quantity</th>
                <th>Current Price</th>
                <th>Profit</th>
                <th>Delete?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in entries" :key="entry.Ticker">
                <td>{{ entry.Index }}</td>
                <td>{{ entry.Name }}</td>
                <td>{{ entry.Ticker }}</td>
                <td>{{ entry.Buy_Price }}</td>
                <td>{{ entry.Buy_Quantity }}</td>
                <td>{{ entry.Current_Price }}</td>
                <td>{{ entry.Profit }}</td>
                <td><button @click="deleteEntry(entry.Name)">YES!</button></td>
            </tr>
        </tbody>
    </table>
    <Banner :msg="ProfitMessage"></Banner>
</template>

<style scoped>
</style>
