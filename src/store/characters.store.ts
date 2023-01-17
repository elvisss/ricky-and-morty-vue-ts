import { reactive } from 'vue'
import type {
  Character,
  RickyAndMortyResponse,
} from '@/modules/characters/interfaces/character'
import rickyAndMorphyApi from '@/api/rickyAndMorphyApi'

interface Store {
  characters: {
    list: Character[]
    count: number
    isLoading: boolean
    hasError: boolean
    errorMessage: string | null
  }
  ids: {
    list: {
      [id: string]: Character
    }
    isLoading: boolean
    hasError: boolean
    errorMessage: string | null
  }

  // methods
  startLoadingCharacters: () => void
  loadedCharacters: (data: Character[]) => void
  loadCharactersFailed: (error: string) => void

  // by Id
  startLoadingCharacterById: () => void
  checkIdInStore: (id: string) => boolean
  loadedCharacterById: (character: Character) => void
  loadCharacterByIdFailed: (error: string) => void
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

  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: null,
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
      list: [...data],
    }
  },
  loadCharactersFailed(error) {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: [],
    }
  },
  // methods by id
  startLoadingCharacterById() {
    this.ids = {
      ...this.ids,
      errorMessage: null,
      hasError: false,
      isLoading: true,
    }
  },
  checkIdInStore(id: string) {
    return !!this.ids.list[id]
  },
  loadedCharacterById(character: Character) {
    this.ids = {
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: {
        ...this.ids.list,
        [character.id]: character
      },
    }
  },
  loadCharacterByIdFailed(error) {
    this.ids.errorMessage = error
    this.ids.hasError = true
  },
})

// characterStore.startLoadingCharacters()

export default characterStore
