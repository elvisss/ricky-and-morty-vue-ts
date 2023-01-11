<template>
  <h2 v-if="characterStore.characters.isLoading">Loading...</h2>
  <template v-else>
    <h2>Characters List</h2>
    <CardList :characters="characterStore.characters.list" />
  </template>
</template>

<script setup lang="ts">
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'
import CardList from '@/modules/characters/components/CardList.vue'
import characterStore from '@/store/characters.store'
import { useQuery } from '@tanstack/vue-query'
import type { RickyAndMortyResponse, Character } from '../interfaces/character'

const getCharactersCacheFirst = async (): Promise<Character[]> => {
  if (characterStore.characters.count) {
    return characterStore.characters.list
  }
  const { data } = await rickyAndMorphyApi.get<RickyAndMortyResponse>(
    '/character'
  )
  return data.results
}

useQuery({
  queryKey: ['characters'],
  queryFn: getCharactersCacheFirst,
  onSuccess: (data) => {
    characterStore.loadedCharacters(data)
  },
})
</script>

<style scoped></style>
