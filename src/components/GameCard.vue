<template>
  <div class="col-md-8" style="font-family: Roboto, Helvetica, Arial, sans-serif !important;">
    <div class="row">
      <div v-for="option in options" :key="option.id" class="col-md-3 d-flex justify-content-center point-div">
        <input class="form-check-input visually-hidden" type="radio" :name="option" :id="option.name" autocomplete="off" @click="selectOption(option)">
        <label class="form-check-label btn d-flex align-items-center justify-content-center btn-point" :for="option.name">{{ option.name }}</label>
      </div>
    </div>
   <br>
   <br>
    <button class="btn btn-lg" :disabled="isEstimateBtnDisabled" style="background-color: rgb(44, 124, 182); color: white;" @click="showResult" v-if="user.moderator">Show Estimates</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isConnected } from '../plugins/signalr'; 

export default {
  props: {
    isEstimateBtnDisabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      options: [
        { id: 1, value: 1, name: '0' },
        { id: 2, value: 1, name: '1/2' },
        { id: 3, value: 1, name: '1' },
        { id: 4, value: 1, name: '2' },
        { id: 5, value: 1, name: '3' },
        { id: 6, value: 1, name: '5' },
        { id: 7, value: 1, name: '8' },
        { id: 8, value: 1, name: '13' },
        { id: 9, value: 1, name: '20' },
        { id: 10, value: 1, name: '40' },
        { id: 11, value: 1, name: '100' },
        { id: 12, value: 1, name: '?' }
      ],
      user: {}
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    isConnected() {
      return isConnected.value;
    },
    user() {
      return this.getUser;
    }
  },
  methods: {
    selectOption(option) {
      if (isConnected) {
        this.$signalr.invoke('ProcessSelectedOption', this.$route.params.id, option.name);
      }
    },
    showResult() {
      if (isConnected) {
        this.$signalr.invoke('ProcessResult', this.$route.params.id);
      }
    }
  }
}
</script>

<style>
.form-check {
  padding: 5px;
}
 
.form-check-input:checked + .form-check-label {
  background-color: rgb(44, 124, 182);
  color: rgb(240, 240, 240);
}

.form-check-label {
  height: 150px;
  width: 150px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.btn-point{
  font-size: 2rem !important;
  font-weight: 150 !important;
  font-family: Roboto, Helvetica, Arial, sans-serif !important;
  padding: 0% !important;
  margin: 0% !important;
  
  height: 220px !important;
}

.point-div{
  margin: 0.7%;
  width: 150px !important;

  background-color: rgb(240, 240, 240);
}

.point-div:hover {
  transform: scale(1.0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.point-div:checked{
  background-color: black !important;
}

@media (max-width: 768px) {
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .point-div {
    flex: 0 0 45%;
    margin: 5px;
  }
}
</style>