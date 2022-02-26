<script setup lang="ts">
    import InputVue from '@/components/Input.vue';
    import { ref, Ref, watch } from 'vue';
    import { useText } from '@/store/Text'
    import NewsTicker from '../components/NewsTicker.vue'
    let userInput: Ref<string | null> = ref('');
    let isResultFound: Ref<boolean> = ref(false);
    let timeTaken = ref('');
    const textStore = useText()


    function collectTags() {
        let startTime = performance.now()
        const regex = new RegExp(userInput.value || "", "gi");
        const data = [...document.querySelectorAll('p')].map(nodeElement => nodeElement.innerHTML)
        let finalArray: Array<string> = [];
        data.forEach(string => {
            if (string.match(regex)) {
                finalArray = [...finalArray,
                string.replace(regex, function (match) {
                    return `<span class="highlighted">${match}</span>`
                })]
            }
        })
        if (finalArray.length > 0) {
            for(let i = 0; i < finalArray.length; i++) {
                let tag = document.createElement("p");
                tag.innerHTML = finalArray[i] ;
                document.getElementById('result')?.appendChild(tag)
            }
            timeTaken.value = (performance.now() - startTime).toFixed(2);
            isResultFound.value = true;
        }
    }

    async function handleNewData() {
        textStore.getRandomTextData()
    }

    watch(userInput, (newInput) => {
        if (newInput && newInput.length > 0) {
            //@ts-ignore
            (document.getElementById('result') || {}).innerHTML = "";
            userInput.value = newInput.replace(/ +/g, " ");
            isResultFound.value = false;
            collectTags();
        }
    })

    textStore.$subscribe((mutation, state) => {
        //@ts-ignore
        (document.getElementById('data') || {}).innerHTML += state.textData

    })
</script>


<template>
    <div><NewsTicker/></div>
    <div class="container pt-5">
        <InputVue v-model="userInput" @add-text="handleNewData"/>
        <div id="data">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </div>
        <div v-if="isResultFound" class="card">
            <div class="card-header text-center bg-primary text-white">
                    <div class="d-flex align-items-center">
                        <h4 class="mx-auto w-100">Results</h4>
                    </div>
                    <div>
                        <h5>Time taken: {{ timeTaken }} ms</h5>
                    </div>
            </div>
        </div>
        <div id="result" class="container pt-5"></div>
    </div>
</template>

<style>
.highlighted {
    background-color: blue;
    opacity: 0.3;
    border-radius: 5px;
    color: white;
    padding: 5px;
}
</style>