<template>
  <ul class="card-list">
    <CharacterCard
      v-for="character of props.characters"
      :key="character.id"
      :character="character"
    />
  </ul>
</template>

<script setup lang="ts">
import CharacterCard from '@/modules/characters/components/CharacterCard.vue'
import type { Character } from '../interfaces/character'

interface Props {
  characters: Character[]
}

const props = defineProps<Props>()
</script>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
