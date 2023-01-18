import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Character } from './../interfaces/character'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'

const characterSet = ref<{ [id: string]: Character }>({})
const hasError = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) {
    return characterSet.value[id]
  }
  try {
    const { data } = await rickyAndMorphyApi.get<Character>(`/character/${id}`)
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const loadedCharacter = (character: Character) => {
  hasError.value = false
  errorMessage.value = null
  characterSet.value[character.id] = character
}

const loadCharacterFailed = (message: string) => {
  hasError.value = true
  errorMessage.value = message
}

const useCharacter = (id: string) => {
  const { isLoading } = useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacter(id),
    onSuccess: loadedCharacter,
    onError(error: any) {
      loadCharacterFailed(error.message)
    },
  })

  const getEpisodes = computed<string>(() => {
    const episodesNumber: string[] = []
    characterSet.value[id].episode.forEach((episode) => {
      const url = episode.split('/')
      const episodeNumber = url[url.length - 1]
      episodesNumber.push(episodeNumber)
    })
    return episodesNumber.join(', ')
  })


  return {
    // properties
    list: characterSet,
    isLoading,
    hasError,
    errorMessage,

    // getters
    character: computed<Character | null>(() => characterSet.value[id]),
    getEpisodes,

    // methods
  }
}

export default useCharacter
