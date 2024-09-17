// A Really Rough Implementation of Table...

<script setup>
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import Banner from "./Banner.vue";
import { db } from "../firebase.js";
import { exchange } from "../binance"


async function awaitData() {
    const logr = await getDocs(collection(db, "Crypto"));
    return logr.docs.map((e) => e.data());
}

async function deleteEntry(entry) {
    const docToDelete = doc(db, "Crypto", entry)
    await deleteDoc(docToDelete)
    location.reload()
}

async function getRate(Ticker) {
    const received = await exchange.fetchOHLCV(Ticker, "5m")
    return received[499][4]
}

var totalProfits = 0
const entries = await awaitData()
await Promise.all(entries.map(async (e) => {
    try {
        const c = await getRate(e.Ticker);
        e.Current_Price = c;
        e.Profits = (c - e.Buy_Price) * e.Buy_Quantity;
        totalProfits += e.Profits;
    } catch (error) {
        e.Current_Price = 0;
        e.Profits = -1 * (e.Buy_Price * e.Buy_Quantity);
        totalProfits += e.Profits;
    }
}));

console.log(entries)

const count = 1
const ProfitMessage = `Total Profits: $ ${totalProfits}`
</script>

<template>
    <Banner msg="Profits"></Banner>
            <table>
                <tbody>
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
                <tr v-for="entry in entries" :key="entry.Ticker">
                    <td>{{  count++ }}</td>
                    <td>{{ entry.Name }}</td>
                    <td>{{ entry.Ticker }}</td>
                    <td>{{ entry.Buy_Price }}</td>
                    <td>{{ entry.Buy_Quantity }}</td>
                    <td>{{ entry.Current_Price }}</td>
                    <td>{{ entry.Profits }}</td>
                    <td><button @click="deleteEntry(entry.Name)">YES!</button></td>
                </tr>
                </tbody>
            </table>
        <Banner :msg= ProfitMessage></Banner>
</template>

<style scoped>
</style>
