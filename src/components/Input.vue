<script setup lang="ts">
  import {ref, Ref} from "vue"
  defineEmits(['update:modelValue', 'addText'])
  let userInput: Ref<string | null> = ref('')
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="input-group mb-3">
          <span class="input-group-text">@</span>
          <input v-model="userInput" type="text" class="form-control" placeholder="Start typing">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-2">
          <button type="button" class="btn btn-primary" @click="$emit('update:modelValue', userInput)">Search</button>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-primary" @click="$emit('addText')">Add text</button>
        </div>
    </div>
  </div>
</template>