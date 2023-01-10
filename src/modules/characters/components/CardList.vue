<template>
  <h3 v-if="isLoading">Loading...</h3>
  <ul class="card-list">
    <CharacterCard
      v-for="character of characters"
      :key="character.id"
      :character="character"
    />
  </ul>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import CharacterCard from '@/modules/characters/components/CharacterCard.vue'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'
import type { Character, RickyAndMortyResponse } from '../interfaces/character'

const getCharactersSlow = (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await rickyAndMorphyApi.get<RickyAndMortyResponse>(
        '/character'
      )
      resolve(data.results)
    }, 1)
  })
}

const { isLoading, data: characters } = useQuery({
  queryKey: ['characters'],
  queryFn: getCharactersSlow,
  cacheTime: 1000 * 2,
  refetchOnReconnect: 'always',
  refetchOnWindowFocus: true,
})
</script>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
