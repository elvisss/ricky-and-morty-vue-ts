<template>
  <template v-if="isLoading">
    <h2>Loading...</h2>
  </template>
  <template v-else>
    <h3 v-if="hasError">
      {{ errorMessage }}
    </h3>
    <template v-else-if="character">
      <h1>{{ character.name }}</h1>
      <div class="character-container">
        <img :src="character.image" :alt="character.name" />
        <ul>
          <li>Origin: {{ character.origin.name }}</li>
          <li>Specie: {{ character.species }}</li>
          <li>Status: {{ character.status }}</li>
          <li>Episodes: <br />{{ getEpisodes }}</li>
        </ul>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useCharacter from '../composables/useCharacter'

const router = useRouter()
const route = useRoute()
const { id } = route.params as { id: string }
const { character, isLoading, hasError, errorMessage, getEpisodes } =
  useCharacter(id)

watchEffect(() => {
  if (!isLoading.value && hasError.value) {
    router.replace({
      path: '/characters',
    })
  }
})
</script>

<style scoped>
.character-container {
  display: flex;
}

img {
  width: 150px;
  border-radius: 5px;
}
</style>
