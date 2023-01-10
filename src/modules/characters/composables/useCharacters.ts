import { ref, onMounted } from 'vue'
import type { Character, RickyAndMortyResponse } from '../interfaces/character'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'

const characters = ref<Character[]>([])
const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)
const errorMessage = ref<string>('')

export const useCharacters = () => {

  onMounted(() => {
    loadCharacters()
  })

  const loadCharacters = async() => {
    if (characters.value.length) return

    isLoading.value = true
    try {
      const { data } = await rickyAndMorphyApi.get<RickyAndMortyResponse>('/character')
      characters.value = data.results
      isLoading.value = false
    } catch(e) {
      hasError.value = true
    } finally {
      isLoading.value = false
      errorMessage.value = 'An Error Happened'
    }
  }

  return {
    isLoading,
    characters,
    errorMessage,
    hasError,
    loadCharacters,
  }
}
