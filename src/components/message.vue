<template>
  <Transition name="down">
    <div class="message" :style="typeList[type]" v-show="visible">
      <i :class="['iconfont', typeList[type].icon]"></i>
      <span class="text">{{ text }}</span>
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, ref, defineProps } from "vue";

const visible = ref(false)

defineProps({
  text: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "warn"
  },
})

const typeList = {
  warn: {
    icon: "icon-warn",
    color: "#e6a23c",
    backgroundColor: "#fdf6ec",
    borderColor: "#faecd8"
  },
  error: {
    icon: "icon-error",
    color: "#f56c6c",
    backgroundColor: "#fef0f0",
    borderColor: "#fde2e2"
  },
  success: {
    icon: "icon-success",
    color: "#67c23a",
    backgroundColor: "#f0f9eb",
    borderColor: "#e1f3d8"
  },
  info: {
    icon: "icon-info",
    color: "#909399",
    backgroundColor: "#edf2fc",
    borderColor: "#ebeef5"
  },
}

onMounted(() => {
  visible.value = true
});


</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  z-index: 99;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  max-width: 350px;

  .iconfont {
    width: 20px;
    height: 20px;
  }
  .icon-warn {
    background: url('@/assets/warn.svg') no-repeat;
    background-size: contain;
  }
  .icon-error {
    background: url('@/assets/error.svg') no-repeat;
    background-size: contain;
  }
  .icon-success {
    background: url('@/assets/success.svg') no-repeat;
    background-size: contain;
  }
  .icon-info {
    background: url('@/assets/info.svg') no-repeat;
    background-size: contain;
  }
  .text {
    padding: 0 10px;
  }
}

.down {
  &-enter {
    &-from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: translate(-50%, 0%);
      opacity: 1;
    }
  }
}
</style>