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
              placeholder="Enter first and last name to create a group!"
              @keydown.enter="createGroup"
            >
            <span v-if="!fullNameValid && fullName == ''" class="invalid-feedback">Please enter your full name</span>
          </div>

          <div class="mt-3 d-grid">
            <button type="submit" @click="createGroup" class="btn btn-primary btn-block" style="background-color: #2c7cb6 ;">Create Room</button>
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
    data(){
        return{
            fullName: '',
            id: '',
            fullNameValid: true,
            errorMessage: ''
        } 
    },
    computed:{
      isConnected() {
      return isConnected.value;
    },
    },
    methods: {
      ...mapMutations({
        setUser: 'setUser',
        setGroup: 'setGroup'
      }),
        createGroup() {
      if (this.fullName.trim() === '') {
        this.fullNameValid = false;
        return;
      } else {
        this.fullNameValid = true;
      }
      if(isConnected){
        this.$signalr.invoke('CreateGroup', this.fullName)
        .then((response) => {
          this.id=response.resultObject.groupUrl;
          this.fullName = '';
          this.setUser(response.resultObject.user);
          this.setGroup(response.resultObject.group);
          this.$router.push({ name: 'estimation', params: { id: this.id } });
        })
        .catch((err) => {
           this.errorMessage = 'An error occurred while creating a group. Please check your connection and try again.';
           setTimeout(() => {
            this.errorMessage = ''; 
          }, 5000);
        }); 
      }
    },
    },
}
</script>