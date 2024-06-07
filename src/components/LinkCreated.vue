<template>
    <div class="col-md-6">
      <div class="shadow p-3 mb-5 bg-body rounded text-center">
      <div>
      <p style="font-size: larger; font-weight: bold;">Invite players to the room</p>
      <p>Share the link below with your friends you want to participate</p>
      <br>
      </div>
        <div class="d-flex align-items-center justify-content-between" style="margin-bottom: 20px;">
        <p class="flex-grow-1">{{ link }}</p>
        <i class="fa-solid fa-copy" style="font-size: 24px;" @click="copyLink"></i>
      </div>
        <button class="btn btn-success" style="background-color: #2c7cb6 ;" @click="startGame" v-if="user.moderator">Start</button>
        <div v-if="copySuccess" class="mt-3 alert alert-success" role="alert">
          Link copied
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'; 
import { isConnected } from '../plugins/signalr'; 

export default {
    data() {
    return {
      link: '',
      copySuccess: false
    };
  },
  computed: {
    ...mapState(['user']),
    isConnected() {
      return isConnected.value;
    },
  },
  mounted() {
    this.link = 'stroypointpoker-client-dev.azurewebsites.net/' + this.$route.params.id;
  },
   methods: {
    copyLink() {
      const dummyInput = document.createElement('input');
      document.body.appendChild(dummyInput);
      dummyInput.value = this.link;
      dummyInput.select();
      document.execCommand('copy');
      document.body.removeChild(dummyInput);
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    },
     startGame() {
      if(isConnected){
        this.$signalr.invoke('StartGame', this.$route.params.id);
      } 
    }
  }
}
</script>

