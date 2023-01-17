<template>
  <div @click="goTo" class="character-card">
    <img loading="lazy" :src="character.image" @error="setImage" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useRouter } from 'vue-router'
import avatar from '@/assets/avatar.png'
import type { Character } from '../interfaces/character'

const router = useRouter()

const goTo = () => {
  router.push({
    name: 'character-id',
    params: {
      id: character.value.id
    }
  })
}

interface Props {
  character: Character
}

const props = defineProps<Props>()
const character = toRef(props, 'character')

const setImage = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = avatar
}
</script>

<style scoped>
.character-card {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  /* overflow: hidden; */
  width: 150px;
}

img {
  border-radius: 5px 5px 0 0;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  max-width: 100%;
  height: auto;
  transition: all .5s;
}

img:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
