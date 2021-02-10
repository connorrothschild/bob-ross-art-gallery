# gelerator
> 超方便的 Elements 生成器

![](https://img.badgesize.io/gaoryrt/gelerator/master/dist/gelerator.min.js)
![](https://img.badgesize.io/gaoryrt/gelerator/master/dist/gelerator.min.js?compression=gzip)

[English](./README.md) | 简体中文

JS 代码 | 生成元素
---: | :---
`g('.btn')('click me')` | `<div class="btn">click me</div>`
`g('button#main')('content')` | `<button id="main">content</button>`
`g('img.demo-jpg')('./demo.jpg')` | `<img class="demo-jpg" src="./demo.jpg">`
`g('span', { style: { color: '#888' } })('ctt')` | `<span style="color: #888">ctt</span>`

<!-- [在 codepen 上亲手试试](https://codepen.io/gaoryrt/pen/ELrdVE) -->

<details>
    <summary>通过数组生成列表</summary>

```javascript
const arr = ['a', 'b', 'c', 'd']

// 使用 es6 很方便
const ctnr = g('ol.ctnr')(
    ...arr.map((item, idx) => g('li')(item))
)
```
</details>

<details>
<summary>特定标签生成器</summary>

```javascript
const P = g('p', { ...some attrs })  // 特定 p 标签生成器，一次性生成复杂标签模版

const p1 = P('content1')
const p2 = P('content2')     // p1 和 p2 拥有同样的 attributes
```

</details>

<details>
<summary>指定 style 标签</summary>

```javascript
// 可以在 style 里写字符串
const el = g('#styled', {
    style: 'top: 1px; left: 1px'
})('content')

// 也可以直接写对象
const el = g('#styled', {
    style: {
        top: '1px',
        left: '1px'
    }
})('content')
```

</details>

<details>
    <summary>监听事件</summary>

```javascript
// 下划线开头的 key 会作为事件监听
const btn = g('button', {
  _click: () => alert('hello world')
})('click me')


const btn = g('button', () => alert('hello world'))('click me')
```

</details>

## 语法

```javascript
g(selector[, attr])(arg1[, arg2[, ...]])
```
### 参数详解

**`selector`**
`字符串`

CSS 选择器，支持 `tag#id.class1.class2` 的格式。

**`attr`**
`方法` 或 `对象`

如果输入方法，那这个方法即为生成元素的 `onclick` 方法；
如果输入一个对象，对象里的值即为元素的属性。
对于对象中 `_` 开头的 key，会被当作事件监听。
对于对象中的 `style`，可以为其赋对象值，字符串也可以。

**`arg1, arg2, ...`**（可选参数）
`字符串` 或 `元素`

如果输入字符串，那字符串即为元素的 `innerText`；
如果输入元素，那这些元素会成为生成元素的子元素。
对于图片标签，输入字符串是图片的 `src` 属性；
对于Input标签，输入字符串是 `value` 属性


## 使用

### 1. 安装
[![NPM](https://nodei.co/npm/gelerator.png?compact=true)](https://nodei.co/npm/gelerator/)
或者 `yarn add gelerator`

### 2. import
```javascript
import { g } from 'gelerator'
```

### 3. 生成
```javascript
let userMessages = [
  'hi',
  'what are you up to?',
  '<script>alert("something evil")</script>'
]

g('chat-list')(
  g('ul')(
    ...userMessages.map(msg => g('li')(msg)),
    g('li.chat-end')('end of line')
  )
)
```

输出:

```HTML
<div class="chat-list">
  <ul>
    <li>hi</li>
    <li>what are you up to?</li>
    <li>&lt;script&gt;alert("something evil")&lt;/script&gt;</li>
    <li class="chat-end">end of line</li>
  </ul>
</div>
```

## License
MIT

## 开发
1. 安装开发依赖: `yarn`
2. 开始开发: `yarn dev`
3. 打包: `yarn build`

## 贡献代码
1. Fork 这个项目
2. 为新功能新建分支: `git checkout -b MY-NEW-FEATURE`
3. Commit: `git commit -am 'ADD SOME FEATURE'`
4. Push: `git push origin MY-NEW-FEATURE`

# 捐助
[![](https://cdn.buymeacoffee.com/buttons/default-white.png)](https://www.buymeacoffee.com/pT2Y5iN)
![](https://jungle.fm/assets/donate.jpg)
