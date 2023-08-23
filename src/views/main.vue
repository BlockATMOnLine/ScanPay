<template>
  <div class="main-content">
    <div class="right order-info">
      <p class="title">{{ $t("orderDetails") }}</p>
      <div class="info-content">
        <span>{{ $t("orderAmount") }}</span>
        <span>
          <span class="amount">{{ orderData?.amount || defaultVal }}</span>&nbsp;
          <span class="currency">{{ orderData?.currency }}</span>
        </span>
      </div>
      <div class="info-content">
        <span>{{ $t("currentChain") }}</span>
        <div class="chain" v-if="orderData.chain">
          <img class="icon" :src="'/image/' + orderData.chain?.toLowerCase() + '.png'" />
          <span>{{ orderData.chain }}</span>
        </div>
      </div>
    </div>
    <p class="line"><span></span></p>
    <div class="left">
      <div v-show="status === 'toPay'" class="payment-content">
        <p class="title">
          <span>{{ $t("paymentTips") }}</span><br/>
          <span>{{ orderData?.currency }} - <strong>{{ orderData?.chain }}</strong></span>
        </p>
        <template v-if="orderData?.address">
          <QrcodeContent :content="orderData.address"/>
          <AddressContent :title="$t('depositAddress')" :content="orderData.address" />
        </template>
        <img v-else src="@/assets/qrcode.svg" width="180">
      </div>
      <div v-show="status === 'confirm'" class="payment-content">
        <img class="status-icon" src="@/assets/loading-circular.svg">
        <p class="tip">{{ $t("confirmTips") }}</p>
      </div>
      <div v-show="status === 'success'" class="payment-content">
        <img class="status-icon" src="@/assets/success-linear.svg">
        <p class="tip">{{ $t("paymentSuccess") }}</p>
      </div>
      <div v-show="status === 'fail'" class="payment-content">
        <img class="status-icon" src="@/assets/error-linear.svg">
        <p class="tip">{{ $t("paymentFail") }}</p>
      </div>

      <div class="remain-content">
        <p class="title">{{ $t('tips.title') }}</p>
        <p>{{ $t('tips.first') }}</p>
        <p>{{ $t('tips.second', [orderData?.currency]) }}</p>
        <p>{{ $t('tips.third') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import QrcodeContent from '@/components/qrcodeContent';
import AddressContent from '@/components/addressContent';
import { getOrderData, getOrderStatus } from '@/api';
import { getParams } from '@/utils/utils.js';
import { onMounted, ref, inject } from 'vue';

const defaultVal = ref('--')
const orderData = ref({})

const status = ref('toPay')

const openLoading = inject('openLoading')
const closeLoading = inject('closeLoading')

const getData = () => {
  const oid = getParams('oid')
  openLoading()
  getOrderData({ oid }).then(res => {
    closeLoading()
    if(res.data) {
      const data = res.data
      if(data.status) {
        setStatus(data.status)
      }
      orderData.value = data
      beginQuery()
    }
  })
}

const getStatus = () => {
  getOrderStatus({
    orderNo: orderData.value?.orderNo
  }).then(res => {
    if(res.data && res.data.status) {
      setStatus(res.data.status)
    }
  })
}

const setStatus = (type) => {
  switch(type) {
    case 1:
      status.value = ('confirm')
      break;
    case 2:
      status.value = ('success')
      finishQuery()
      break;
    case 3:
      status.value = ('fail')
      finishQuery()
      break;
  }
}

const timer = ref()
const beginQuery = () => {
  timer.value = setInterval(() => {
    getStatus()
  }, 5000)
}

const finishQuery = () => {
  if(timer.value) {
    clearInterval(timer.value)
  }
}

onMounted(() => {
  getData()
})

</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 5%;

  @media screen and (min-width: 769px) {
    flex-direction: row-reverse;
    align-items: flex-start;
    padding: 15px;

    .left, .right {
      border: 1px solid #f2f6fa;
      border-radius: 10px;
      box-shadow: 10px 10px 10px #f2f6fa;
      padding: 10px;
    }
    .left {
      flex: 3;
    }
    .right {
      flex: 2;
    }
  }

  .line {
    margin: 0px 20px;

    span {
      width: 100%;
      display: inline-block;
      border-top: 1px solid #e6ecf2;
    }

    @media screen and (min-width: 500px) {
      display: none;
    }
  }

  .order-info {
    color: #9aa5b5;
    padding: 10px 10px 0;

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .info-content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      align-items: center;

      .amount {
        color: #4E5077;
        font-size: 28px;
        font-weight: 700;
      }

      .currency {
        font-size: 18px;
      }

      .chain {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .payment-content {
    text-align: center;

    @media screen and (min-width: 769px) {
      min-height: 320px;
    }

    .title {
      color: #fdc54c;
    }
    .tip {
      max-width: 400px;
      margin: 10px auto 30px;
    }
    .status-icon {
      margin: 30px;
      width: 100px;
    }
  }

  .remain-content {
    margin: 15px;
    padding: 0px 8px;
    border: 1px solid #fde3b0;
    background-color: #fffbf3;
    color: #e1990d;
    border-radius: 10px;

    p {
      margin: 8px 0px;
    }
    .title {
      font-size: 18px;
    }
  }
}
</style>