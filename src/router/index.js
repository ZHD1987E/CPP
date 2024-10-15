import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import OnlyProfits from "@/views/OnlyProfits.vue";
import LogInPage from "@/views/LogInPage.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";

const routes = [
    {
        path: "/",
        component: LogInPage
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/onlytheprofits",
        component: OnlyProfits
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 