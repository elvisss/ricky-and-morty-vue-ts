<template>
  <h2 v-if="isLoading">Loading...</h2>
  <template v-else>
    <h2>Characters List</h2>
    <CardList :characters="characters || []" />
  </template>
</template>

<script setup lang="ts">
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'
import CardList from '@/modules/characters/components/CardList.vue'
import { useQuery } from '@tanstack/vue-query'
import type { RickyAndMortyResponse, Character } from '../interfaces/character'

const getCharacters = async (): Promise<Character[]> => {
  const { data } = await rickyAndMorphyApi.get<RickyAndMortyResponse>(
    '/character'
  )
  return data.results
}

const { isLoading, data: characters } = useQuery({
  queryKey: ['characters'],
  queryFn: getCharacters,
})
</script>

<style scoped></style>
