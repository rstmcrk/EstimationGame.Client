<template>
  <div class="home">
    <NavBar/>
    <Estimation v-if="userExists"/>
    <AddGroup v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'; 
import NavBar from '@/components/NavBar.vue';
import Estimation from '@/components/Estimation.vue';
import AddGroup from '@/components/AddGroup.vue';

export default {
  name: 'EstimationView',
  components: {
    NavBar,
    Estimation,
    AddGroup
  },
  computed: { 
    ...mapState(['user']), 
    userExists() {
      return this.user !== null; 
    }
  },
  created() {
    this.checkUserExists();
  },
  methods: {
    checkUserExists() {
      this.userExists = this.user !== null;
    }
  }
}
</script>