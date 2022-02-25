<script setup lang="ts">
    import { onBeforeMount, onMounted, ref, watch, computed } from 'vue';
    import { useNews } from '@/store/News'

    const newsStore = useNews();
    let timeLeft = ref(30);

    watch(timeLeft, async function(value) {
        if (value <= 0) {
            timeLeft.value = 30;
            newsStore.getRandomNewsData();
        } else {
            setTimeout(() => {
                timeLeft.value--;
            }, 1000)
        }
    })

    const timer = computed(() => {
        return timeLeft.value < 10 ? '0'+timeLeft.value : timeLeft.value
    })

    onBeforeMount(async () => {
        newsStore.getRandomNewsData()
    })

    onMounted(() => {
        timeLeft.value--;
    })

    newsStore.$subscribe((mutation, state) => {
        if (state.newsData && state.newsData.length > 0) {
            state.newsData.forEach((title: string) => {
                //@ts-ignore
                (document.getElementById('news') || {}).innerHTML += `<div class=hitem>${title}</div>`
            })
        }
    })
</script>



<template>
    <div class="row g-0">
        <div class="col-2">
            <div class="bg-primary py-2 text-white px-1">
                <div class="d-flex align-items-center">00:{{ timer }}</div>
            </div>
        </div>
        <div class="col-10">
            <div class="hwrap">
                <div id="news" class="hmove">
                </div>
            </div>
        </div>
    </div>
</template>


<style>
/* Inspired by By W.S. Toh / Tips & Tutorials*/
.hwrap {
  overflow: hidden;
  background: #eee;
}
 
.hmove { display: flex;}

.hitem {
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  text-align: center;
  overflow: hidden;
  white-space:nowrap;
}
 
@keyframes tickerh {
  0% { transform: translate3d(100%, 0, 0); }
  100% { transform: translate3d(-400%, 0, 0); }
}
.hmove { animation: tickerh linear 15s infinite; }
.hmove:hover { animation-play-state: paused; }

</style>