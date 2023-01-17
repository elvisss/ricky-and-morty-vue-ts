<template>
  <template v-if="characterStore.ids.isLoading">
    <h2>Loading...</h2>
  </template>
  <template v-else>
    <h3 v-if="characterStore.ids.hasError">
      {{ characterStore.ids.errorMessage }}
    </h3>
    <template v-else>
      <h1>{{ characterStore.ids.list[id].name }}</h1>
      <div class="character-container">
        <img
          :src="characterStore.ids.list[id].image"
          :alt="characterStore.ids.list[id].name"
        />
        <ul>
          <li>Origin: {{ characterStore.ids.list[id].origin.name }}</li>
          <li>Specie: {{ characterStore.ids.list[id].species }}</li>
          <li>Status: {{ characterStore.ids.list[id].status }}</li>
          <li>Episodes: <br />{{ getEpisodes }}</li>
        </ul>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'
import characterStore from '@/store/characters.store'
import type { Character } from '../interfaces/character'

const route = useRoute()
const { id } = route.params as { id: string }

characterStore.startLoadingCharacterById()

const getCharacterCacheByIdFirst = async (
  characterId: string
): Promise<Character> => {
  if (characterStore.checkIdInStore(characterId)) {
    return characterStore.ids.list[characterId]
  }
  try {
    const { data } = await rickyAndMorphyApi.get<Character>(
      `/character/${characterId}`
    )
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getEpisodes = computed(() => {
  const episodesNumber: string[] = []
  characterStore.ids.list[id].episode.forEach((episode) => {
    const url = episode.split('/')
    const episodeNumber = url[url.length - 1]
    episodesNumber.push(episodeNumber)
  })
  return episodesNumber.join(', ')
})

useQuery({
  queryKey: ['characters', id],
  queryFn: () => getCharacterCacheByIdFirst(id),
  onSuccess: (data) => {
    characterStore.loadedCharacterById(data)
  },
  onError(error: any) {
    characterStore.loadCharacterByIdFailed(error.message)
  },
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
