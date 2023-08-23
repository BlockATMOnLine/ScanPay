<template>
  <div>
    <div class="head"></div>
    <div class="main">
      <div class="top-content">
        <img class="logo" src="@/assets/logo.svg" width="120">
      </div>  
      <router-view />
    </div>
    <div v-show="showLoading" class="loading-page">
      <div class="loading-content">
        <img class="status-icon" src="@/assets/loading-vertical.svg">
        <p>{{ $t('loading' )}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const requestCount = ref(0)
const showLoading = ref(false)

const openLoading = () => {
  requestCount.value ++
  if(requestCount.value == 1) {
    showLoading.value = true
  }
}

const closeLoading = () => {
  requestCount.value --
  if(requestCount.value == 0) {
    showLoading.value = false
  }
}

provide('openLoading', openLoading)
provide('closeLoading', closeLoading)

</script>

<style lang="scss">
@import '@/sass/common.scss';
@import '@/sass/global.scss';
</style>
