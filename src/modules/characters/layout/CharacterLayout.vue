<template>
  <h1>Character Layout</h1>

  <NavBarVue :show-icon="false" :links="routeLinks" />

  <router-view />
</template>

<script serup lang="ts">
import type { RouterLink } from '@/router/link-routes'
import NavBarVue from '@/shared/components/NavBar.vue'
import { defineComponent } from 'vue'
import { charactersRoute } from '../router'

export default defineComponent({
  components: { NavBarVue },
  setup() {
    const routeLinks: RouterLink[] = charactersRoute
      .children!.filter(
        (route) => route.meta?.isVisible
      )
      .map((route) => {
        return {
          name: route.name as string,
          path: route.path,
          title: route.meta?.title || '',
        }
      })

    return {
      routeLinks,
    }
  },
})
</script>

<style scoped></style>
