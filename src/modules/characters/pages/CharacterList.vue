<template>
  <template v-if="characterStore.characters.isLoading">
    <h2>Loading...</h2>
  </template>
  <template v-else>
    <h3 v-if="characterStore.characters.hasError">
      {{ characterStore.characters.errorMessage }}
    </h3>
    <template v-else>
      <h2>Characters List</h2>
      <CardList :characters="characterStore.characters.list" />
    </template>
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
  try {
    const { data } = await rickyAndMorphyApi.get<RickyAndMortyResponse>(
      '/character'
    )
    return data.results
  } catch (error: any) {
    throw new Error(error.message)
  }
}

useQuery({
  queryKey: ['characters'],
  queryFn: getCharactersCacheFirst,
  onSuccess: (data) => {
    characterStore.loadedCharacters(data)
  },
  onError(error: any) {
    characterStore.loadCharactersFailed(error.message)
  },
})
</script>

<style scoped></style>
