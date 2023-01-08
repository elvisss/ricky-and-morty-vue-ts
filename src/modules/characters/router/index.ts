import type { RouteRecordRaw } from 'vue-router'
import CharacterLayout from '../layout/CharacterLayout.vue'
import CharacterId from '../pages/CharacterId.vue'
import CharacterList from '../pages/CharacterList.vue'
import CharacterSearch from '../pages/CharacterSearch.vue'

export const charactersRoute: RouteRecordRaw = {
  path: '/characters',
  redirect: {
    name: 'character-list'
  },
  component: CharacterLayout,
  children: [
    {
      path: 'by/id',
      name: 'character-id',
      component: CharacterId,
      props: {
        title: 'Character by Id',
        visible: false
      },
      meta: {
        title: 'Character by Id',
        isVisible: false
      },
    },
    {
      path: 'list',
      name: 'character-list',
      component: CharacterList,
      props: {
        title: 'List',
        visible: true
      },
      meta: {
        title: 'List',
        isVisible: true
      },
    },
    {
      path: 'search',
      name: 'character-search',
      component: CharacterSearch,
      props: {
        title: 'Search',
        visible: true
      },
      meta: {
        title: 'Search',
        isVisible: true
      },
    },
  ],
}
