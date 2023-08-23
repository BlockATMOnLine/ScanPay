<template>
  <div class="main-content">
    <div class="main-form">
      <div class="form-item">
        <label>{{ $t('orderAmount') }} : </label>
        <div class="item-value">
          <input v-model="order.amount">
        </div>
      </div>
      <div class="form-item">
        <label>{{ $t('currency') }} : </label>
        <div class="item-value">
          <SelectContent v-model="order.currency" :list="supportedCurrency" />
        </div>
      </div>
      <div class="form-item">
        <label>{{ $t('currentChain') }} : </label>
        <div class="item-value">
          <SelectContent v-model="order.chain" :list="supportedChains" />  
        </div>
      </div>
      <div class="form-item textarea-item">
        <label>{{ $t('depositAddress') }} : </label>
        <div class="item-value">
          <textarea v-model="order.address"></textarea>
        </div>
      </div>
      <div class="form-item">
        <button class="submit-btn main-btn" :disabled="!order.amount || !order.address" @click="submitHandle">{{ $t('generateOrder') }}</button>
      </div>
    </div>
    <ResultDialog v-show="resultVisible" :oid="oid" @close="resultVisible = false" />
  </div>
</template>

<script setup>
import ResultDialog from './components/resultDialog';
import SelectContent from '@/components/selectContent';
import supportedChains from '@/config/chains.js';
import supportedCurrency from '@/config/currency.js';
import { ref, reactive, inject } from 'vue';
import { generateOrder } from '@/api';

const oid = ref()
const resultVisible = ref(false)
const order = reactive({
  amount: '',
  address: '',
  chain: '',
  currency: ''
})

const openLoading = inject('openLoading')
const closeLoading = inject('closeLoading')

const submitHandle = () => {
  openLoading()
  generateOrder({ order }).then((res) => {
    closeLoading()
    if(res.data) {
      oid.value = res.data
      resultVisible.value = true
    }
  })
}

</script>

<style lang="scss" scoped>
.main-content {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media screen and (min-width: 1000px) {  
    border: 1px solid #f2f6fa;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 10px 10px 10px #f2f6fa;
    padding: 10px;
  }

  .form-item {
    display: flex;
    align-items: center;
    padding: 10px;
    
    label {
      display: inline-block;
      width: 100px;
      font-weight: 600;
      font-size: 16px;
    }

    .item-value {
      display: inline-block;
      font-size: 18px;
      height: 45px;
      width: 230px;
      border: 2px solid #f2f6fa;
      border-radius: 10px;

      input {
        font-size: 18px;
        text-align: center;
        height: 95%;
        width: 98%;
      }

      textarea {
        font-size: 18px;
        line-height: 30px;
        width: 98%;
        resize: none;
      }
    }

    button {
      height: 45px;
      border-radius: 10px;
      font-size: 18px;
    }

    .submit-btn {
      margin-top: 30px;
      width: 100%;
    }
  }

  .textarea-item {

    .item-value {
      height: 65px;
      width: 250px;
    }   
  }
}
</style>