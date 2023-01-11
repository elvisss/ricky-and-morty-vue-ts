import { reactive } from 'vue'
import type { Character, RickyAndMortyResponse } from '@/modules/characters/interfaces/character'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'

interface Store {
  characters: {
    list: Character[]
    count: number
    isLoading: boolean
    hasError: boolean
    errorMessage: string | null
  }

  // methods
  startLoadingCharacters: () => void
  loadedCharacters: (data: Character[]) => void
  loadCharactersFailed: (error: string) => void
}

// initial state
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: [],
  },
  // methods
  async startLoadingCharacters() {
    console.log('start loading characters')
    const { data } = await rickyAndMorphyApi.get<RickyAndMortyResponse>(
      '/character'
    )
    this.loadedCharacters(data.results)
  },
  loadedCharacters(data) {
    // this.characters.count = data.length
    this.characters = {
      count: data.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: [...data]
    }
  },
  loadCharactersFailed(_error) {

  }
})

characterStore.startLoadingCharacters()

export default characterStore
