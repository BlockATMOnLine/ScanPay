<template>
  <div class="result-dialog">
    <div class="dialog-content">
      <div class="top-content">
        <span class="title">收银台地址</span>
        <img class="close" src="@/assets/close.svg" width="24" @click="$emit('close')" />
      </div>
      <div class="main-content">
        <span>{{ cashierUrl }}</span>
      </div>
      <div class="footer">
        <button :disabled="!cashierUrl" @click="copyHandle">复制地址</button>
        <a :href="cashierUrl" target="_blank">
          <button :disabled="!cashierUrl">直接打开</button>
        </a>
        <button :disabled="!cashierUrl" @click="setHandle">设置状态</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import Clipboard from 'clipboardy';
import message from '@/utils/message';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const props = defineProps({
  oid: String
})

const cashierUrl = computed(() => {
  let url = null; 
  if(props.oid) {
    const originUrl = window.location.origin
    url = originUrl + '?oid=' + props.oid
  }
  return url;
})

const copyHandle = () => {
  Clipboard.write(cashierUrl.value).then(() => {
    message({ type: "info", text: t('copySuccess') })
  })
}

const setHandle = () => {
  const routeData = router.resolve({
    name: "SetStatus",
    query: { oid: props.oid }
  }, '_blank')
  window.open(routeData.href, '_blank')
}

</script>

<style lang="scss" scoped>

.result-dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dialog-content {
    background-color: #ffffff;
    min-width: 350px;
    border-radius: 10px;
    border: 1px solid #4E5077;
    overflow: hidden;
  }

  .top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;

    .close {
      cursor: pointer;
    }
  }

  .main-content {
    padding: 30px;
    font-size: 16px;
    color: #4E5077;
  }

  .footer {
    padding: 10px;
    text-align: right;

    button {
      border-radius: 10px;
      margin-left: 10px;
      height: 35px;
      font-size: 16px;
      padding: 0 15px;
    }
  }
}
</style>