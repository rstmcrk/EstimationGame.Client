<template>
  <div class="home">
    <NavBar/>
    <CreateGroup/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import CreateGroup from '@/components/CreateGroup.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    CreateGroup
  },
}
</script>