import { defineStore } from "pinia";
import { getRandomNewsAPI } from "@/comms/services";
import { News } from "@/types/apiType";

export const useNews = defineStore('news', {
    state: () => ({
        newsData: null as Array<string> | null
    }),
    actions: {
       async getRandomNewsData(): Promise<void> {
           await getRandomNewsAPI().then((response) => {
               this.$state.newsData = response.data?.articles.map((article: News) => article?.title)
           })
       }
    }
})