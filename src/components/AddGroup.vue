<template>
<div class="row justify-content-center align-items-center" style="height: 80vh;">
  <div class="col-md-8 col-lg-6 col-xl-5">
  <div v-if="errorMessage" class="mt-3 alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    <div class="card overflow-hidden shadow">
      <div class="card-body pt-10">
        <div class="p-2">
          <div class="mb-3">
            <label for="input-1" class="form-label">Name Surname</label>
            <input
              id="fullName"
              type="text"
              v-model="fullName"
              :class="{ 'is-invalid': !fullNameValid && fullName == '' }"
              class="form-control"
              placeholder="Enter first and last name to join a group!"
              @keydown.enter="addGroup"
            >
          </div>
 
          <div class="mt-3 d-grid">
            <button type="submit" @click="addGroup" class="btn btn-primary btn-block" style="background-color: #2c7cb6 ;">Join Room</button>
          </div>
        </div>
      </div>
    </div> 

    <div class="mt-5 text-center">
      <p>
        © {{ new Date().getFullYear() }}. Crafted with <i class="mdi mdi-heart text-danger"></i> by Rüstem CIRIK
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import { isConnected } from '../plugins/signalr'; 

export default {
data() {
    return {
      fullName: '',
      fullNameValid: true,
      errorMessage: ''
    };
  },
  computed:{
      isConnected() {
      return isConnected.value;
    },
    },
  methods:{
    ...mapMutations({
        setUser: 'setUser',
        setGroup: 'setGroup'
      }),
    addGroup() {
      if (this.fullName.trim() === '') {
        this.fullNameValid = false;
        return;
      } else {
        this.fullNameValid = true;
      }
      if(isConnected){
        this.$signalr.invoke('AddUserToGroup', this.fullName, this.$route.params.id)
        .then((response) => {
            if(!response.status){
              this.errorMessage = response.explanation
             setTimeout(() => {
              this.errorMessage = ''; 
              this.$router.push({ name: 'home' });
            }, 3000);
          }
          this.fullName = '';
          this.setUser(response.resultObject.user);
          this.setGroup(response.resultObject.group);
        })
        .catch(() => {
          this.errorMessage = 'There was an error joining the group. Please check your connection and try again.';
           setTimeout(() => {
            this.errorMessage = ''; 
          }, 3000);
        });
      }
      
  }
}
}

</script>