<template>
<div class="container">
<div class="mt-5">
  <div class="row" style="font-family: Roboto, Helvetica, Arial, sans-serif !important;">
    <div class="col-md-4">
    <div v-if="errorMessage" class="mt-3 alert alert-success" role="alert">
        {{ errorMessage }}
      </div>
      <div class="shadow p-3 mb-5 bg-body rounded">
        <ul class="list-group">
          <li class="list-group-item disabled" style="background-color:rgb(44, 124, 182); ; color: white;" aria-disabled="true">Players</li>
<li class="list-group-item" style="background-color: #cce5ff; display: flex; justify-content: space-between;" v-for="user in groupUsers" :key="user.connectionId">
  <div>
  {{ user.fullName }}
  <i v-if="user.moderator" class="fa-solid fa-gamepad" style="color: black; margin-left: 5px;"></i>
  </div>
  
  <div>
  <i v-if="!user.status" class="fa-regular fa-clock"></i>
  <i v-if="user.status && !startResult" class="fa-solid fa-check"></i>
  <i v-if="startResult && user.option != null" > {{ user.option.name }}</i>
  </div>
</li>

        </ul>
      </div>
    </div>
    <LinkCreated v-if="!startGame && !startResult"/>
    <GameCard :isEstimateBtnDisabled = this.isEstimateBtnDisabled v-if="startGame && !startResult"/>
    <GameResult @disable-estimate-btn="disableEstimateBtn" v-if="startResult"/>
  </div>
</div>
</div>
</template>
 
<script>
import LinkCreated from '@/components/LinkCreated.vue'
import GameCard from '@/components/GameCard.vue'
import GameResult from '@/components/GameResult.vue'
import { mapMutations, mapGetters } from 'vuex';
import { isConnected } from '../plugins/signalr'; 

export default {
    data() {
    return {
      groupUsers: [],
      errorMessage: '',
      isEstimateBtnDisabled : true
    };
  },
    components: {
    LinkCreated,
    GameCard,
    GameResult
  },
  computed: {
    isConnected() {
      return isConnected.value;
    },
    startGame(){
      const group = this.getGroup();
      return group && group.gameStatus;
    },
    startResult(){
      const group = this.getGroup();
      return group && group.resultStatus;
    }
  }, 
    mounted() {
      if(isConnected){
        this.$signalr.on('UpdateConnectionId', (user) => {
      this.setUser(user);
      this.$router.push({ name: 'estimation', params: { id: this.id } });
      })
      this.getUserToGroup();
    this.$signalr.on('UpdateUser', (user) => this.setUser(user))
    this.$signalr.on('Users', (users) => {this.groupUsers = users;
    })
    this.$signalr.on('UpdateGroup', (group) => this.setGroup(group))
    this.$signalr.on('EnableEstimateBtn', () => this.isEstimateBtnDisabled = false )
    this.$signalr.on('Information', (data) => {this.errorMessage = data;
           setTimeout(() => {
            this.errorMessage = ''; 
          }, 5000);})
      }
  },
   methods: {
    ...mapMutations(['setUser', 'setGroup', 'clearUser', 'clearGroup']),
    ...mapGetters(['getGroup']),
    getUserToGroup() {
      if(this.isConnected){
        this.$signalr.invoke('GetUserToGroup', this.$route.params.id); 
      }
    },
    disableEstimateBtn(){
      this.isEstimateBtnDisabled = true;
    }
  }
} 
</script>