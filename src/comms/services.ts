import { HTTPNewsClient, HTTPTextClient } from "./http";


// texts
export const getRandomTextAPI = () => HTTPTextClient.get('1/4?p=true')

// news
export const getRandomNewsAPI = () => HTTPNewsClient.get('news?type=all_news&limit=5')