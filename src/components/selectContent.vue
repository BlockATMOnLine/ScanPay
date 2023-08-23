<template>
  <div class="select-content">
    <div v-if="curItem.name" class="selected-item" @click="clickHandle">
      <div class="selected-val">
        <img class="icon" :src="'/image/' + curItem.name?.toLowerCase() + '.png'" />
        <span>{{ curItem.label || curItem.name }}</span>
      </div>
      <i class="selected-icon"></i>
    </div>
    <div v-show="visible" class="options-content">
      <ul>
        <li v-for="(item, index) in list"
            :class="item.name === curItem.name  && 'selected'"
            :key="index"
            @click="selectedHandle(item.name)">
            <img class="icon" :src="'/image/' + item.name?.toLowerCase() + '.png'"  />
            <span>{{ curItem.label || curItem.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: String,
  list: Array
})

const visible = ref(false)

const emit = defineEmits(['update:modelValue'])

// 当前选中的选项
const curItem = computed(() => {
  const list = props.list || []
  let cur = null
  if (props.modelValue !== undefined) {
    cur = list.find(item => item.name === props.modelValue)
  }
  if (!cur) {
    cur = list[0]
    emit('update:modelValue', cur.name)
  }
  return cur;
})

const clickHandle = () => {
  visible.value = !visible.value
}

const selectedHandle = (item) => {
  visible.value = false
  emit('update:modelValue', item)
}

</script>

<style lang="scss" scoped>
.select-content {
  position: relative;
  height: 100%;

  .icon {
    width: 24px;
    height: 24px;
  }
  
  .selected-item {
    height: 100%;
    cursor: pointer;

    .selected-val {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .selected-icon {
      position: absolute;
      top: calc(50% - 10px);
      right: 10px;
      width: 20px;
      height: 20px;
      background: url('@/assets/v-shaped-downward.svg') no-repeat;
    }
  }

  .options-content {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 110%;
    background: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    border: 2px solid #f2f6fa;

    ul {
      li {
        padding: 10px;
        display: flex;
        justify-content: center;
        gap: 10px;

        span {
          text-align: center;
        }
      }
      .selected {
        background-color: #f0eef7;
      }
    }
  }
}
</style>
