import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import OnlyProfits from "@/views/OnlyProfits.vue";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/onlytheprofits",
        component: OnlyProfits
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 