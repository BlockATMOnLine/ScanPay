<template>
  <div class="address-content">
    <div class="content">
      <p class="sub-title">{{ title }}</p>
      <p>{{ content }}</p>
      <p>{{ tip }}</p>
    </div>
    <i class="icon copy-icon" @click="copyHandle"></i>
  </div>
</template>

<script setup>
import Clipboard from 'clipboardy';
import message from "@/utils/message";
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' })

const props = defineProps({
  title: String,
  content: String,
  tip: String
})

const copyHandle = () => {
  Clipboard.write(props.content).then(() => {
    message({ type: "info", text: t('copySuccess') })
  })
}

</script>

<style lang="scss" scoped>
.address-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  word-wrap: break-word;
  text-align: left;

  p {
    margin: 0;
  }

  .content {
    width: calc(100% - 100px);
    max-width: 380px;

    .sub-title {
      color: #909090;
      font-size: 14px;
    }
  }

  .copy-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
    background: url('@/assets/copy.svg') no-repeat;
  }
}
</style>