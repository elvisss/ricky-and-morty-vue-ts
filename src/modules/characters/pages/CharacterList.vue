<template>
  <template v-if="isLoading">
    <h2>Loading...</h2>
  </template>
  <template v-else>
    <h3 v-if="hasError">
      {{ errorMessage }}
    </h3>
    <template v-else>
      <h2>Characters List - {{ count }}</h2>
      <CardList :characters="characters" />
    </template>
  </template>
</template>

<script setup lang="ts">
import CardList from '@/modules/characters/components/CardList.vue'
import useCharacters from '../composables/useCharacters'

const { isLoading, characters, hasError, errorMessage, count } = useCharacters()
</script>
