import { defineStore } from "pinia";
import { getRandomTextAPI } from "@/comms/services";

export const useText = defineStore('text', {
    state: () => ({
        textData: null as string | null
    }),
    getters: {
        getTextData(): string | null {
            return this.textData;
        }
    },
    actions: {
       async getRandomTextData(): Promise<void> {
           await getRandomTextAPI().then((response) => {
               this.$state.textData = response.data
           })
       }
    }
})