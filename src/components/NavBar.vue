<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #2c7cb6 ;"> 
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="color: white;">Story Estimation Game</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <i v-if="isConnected && !isConnecting" class="fas fa-wifi" style="color: white; margin-right: 10px;"></i>
            <i v-if="!isConnected && !isConnecting" class="fa-solid fa-triangle-exclamation" style="color: red; margin-right: 10px;"></i>
          </li>
        </ul>
        <div class="spinner-container" v-if="isConnecting">
          <div class="spinner-border" role="status" style="color: white;">
          </div>
          <span class="connecting-text" style="color: white;">Connecting...</span>
        </div>
      </div>
      <i class="fa-solid fa-right-from-bracket" style="font-size: 24px; color: white;" @click="handleLogout" v-if="user"></i>
    </div>
  </nav>
</template>

<script>
import { isConnected,isConnecting } from '../plugins/signalr'; 
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapMutations(['clearUser', 'clearGroup']),
    ...mapGetters(['getUser']),
    user() {
        return this.getUser;
    },
    isConnected() {
      return isConnected.value;
    },
    isConnecting() {
      return isConnecting.value; 
    }
  },
  methods: {
    handleLogout(){
      this.$signalr.invoke('Logout', this.$route.params.id);
      this.$store.commit('clearUser');
      this.$store.commit('clearGroup');
      localStorage.clear();
    }
  }
};
</script>
