import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'
import type { RickyAndMortyResponse } from './../interfaces/character'
import type { Character } from '../interfaces/character'

const characters = ref<Character[]>([])
const hasError = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length) {
    return characters.value
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

const loadedCharacters = (data: Character[]) => {
  hasError.value = false
  errorMessage.value = null
  characters.value = data
}

const loadCharactersFailed = (message: string) => {
  hasError.value = true
  errorMessage.value = message
}

const useCharacters = () => {

  const { isLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
    onSuccess: loadedCharacters,
    onError(error: any) {
      loadCharactersFailed(error.message)
    },
  })

  return {
    // properties
    characters,
    isLoading,
    hasError,
    errorMessage,

    // getters
    count: computed(() => characters.value.length)

    // methods
  }
}

export default useCharacters
