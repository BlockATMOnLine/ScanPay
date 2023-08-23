<template>
  <div class="qrcode-content">
    <div ref="qrcodeRef" class="qrcode"></div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import QRCode from 'qrcodejs2';

const props = defineProps({
  content: String
})

const qrcodeRef = ref(null)
const qrcode = ref(null)

const drawQrCode = (content) => {
  if (qrcodeRef.value) {
    if(qrcode.value) {
      qrcode.value.makeCode(content)
    } else {
      qrcode.value = new QRCode(qrcodeRef.value, {
        text: content,
        width: 180,
        height: 180,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }
}

watchEffect(() => {
  if(props.content) {
    drawQrCode(props.content)
  }
})

</script>

<style lang="scss" scoped>
.qrcode {
  display: flex;
  justify-content: center;
}
</style>
