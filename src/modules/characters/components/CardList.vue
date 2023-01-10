<template>
  <h3 v-if="isLoading">Loading...</h3>
  <h3 v-if="hasError">{{ errorMessage }}</h3>
  <ul>
    <li v-for="{ id, name } of characters" :key="id">
      {{ name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useCharacters } from '@/modules/characters/composables/useCharacters'

const { characters, isLoading, hasError, errorMessage } = useCharacters()

</script>

<style scoped></style>
