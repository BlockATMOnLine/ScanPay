import { createVNode, render } from 'vue'
// 引入信息提示组件
import Message from '@/components/message'

// 准备dom容器
const div = document.createElement('div')
document.body.appendChild(div)

// 定时器标识
let timer = null

const message = ({ type, text }) => {
    const vnode = createVNode(Message, { type, text })
    render(vnode, div)
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 2000)
}

export default message
