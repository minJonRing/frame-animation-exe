<template>
  <div class="animation">
    <div class="anime-box">
      <!-- 路径动画 -->
      <div v-for="(obj, j) in box" :key="j" class="sequence-box"
        :style="{ visibility: animeKey === (+j + 1) ? 'inherit' : 'hidden' }">
        <img class="sequence" v-for="(item, index) in obj.list" :key="index" :src="item"
          :style="{ visibility: animeSequenceIndex === index ? 'inherit' : 'hidden' }" />

      </div>
      <!-- 物体动画 -->
      <div v-for="(obj, j) in box" :key="j" class="bottle-box"
        :style="{ visibility: animeKey === (+j + 1) ? 'inherit' : 'hidden' }">
        <img class="bottle" v-for="(item, index) in obj.bottle" :key="index" :src="item"
          :style="{ visibility: animeBottleIndex === index ? 'inherit' : 'hidden' }" />
      </div>
      <!-- 文字 -->
      <div class="text-box">
        <img class="text" src="" alt="">
      </div>
    </div>
    <!-- svg元素 -->
    <div class="element">
      <Decoration class="decoration-1" />
      <Decoration class="decoration-2" />
      <!-- 标题装饰 -->
      <div class="title-decoration">
        <img v-for="(item, index) in textDecoration" :key="index" :src="item"
          :style="{ visibility: textDecorationIndex === index ? 'inherit' : 'hidden' }" />
      </div>
      <!-- 文字框 -->
      <Box :style="{ top: '70px', right: '20px' }" />
      <!-- 连接线 -->
      <svg class="link" width="230" height="100" viewBox="0 0 230 100" version="1.1">
        <filter id="linkOutShadow">
          <feFlood result="flood" flood-color="#ffff4a" flood-opacity="1"></feFlood>
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
          <feMorphology in="mask" result="dilated" operator="dilate" radius="0.1"></feMorphology>
          <feGaussianBlur in="dilated" result="blurred" stdDeviation="3"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blurred"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <polyline points="10,90 90,90 90,10 220,10" fill="transparent" stroke="#ffff4a" stroke-width="6"
          filter="url(#linkOutShadow)" />
        <filter id="linkOutShadow2">
          <feFlood result="flood" flood-color="#fff" flood-opacity="1"></feFlood>
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
          <feMorphology in="mask" result="dilated" operator="dilate" radius="0.1"></feMorphology>
          <feGaussianBlur in="dilated" result="blurred" stdDeviation="3"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blurred"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <polyline class="link-move" points="10,90 90,90 90,10 220,10" fill="transparent" stroke="#fff" stroke-width="10"
          stroke-dasharray="10 86.6" filter="url(#linkOutShadow2)" />
      </svg>
      <!-- 文字框 -->
      <Box :style="{ top: '570px', right: '130px' }" />
    </div>
    <!-- <img class="text" :src="Text" /> -->
    <div class="word-box">
      <div class="title-box">
        <i class="iconfont icon-huaxuehuagong"></i>
        <div class="title">
          <div class="top">{{ textObj.title }}</div>
          <div class="bottom">{{ textObj.sub }}</div>
        </div>
      </div>
      <div class="word-item word-item-1">
        <div class="words">
          <div :class="['scroll', scrollOne()]">
            <template v-for="(item, index) in textObj.html[0] || []" :key="index">
              <div :class="['w-title', 'w-cn', 'w-en', 'w-other'][item.type]">{{ item.label }}</div>
            </template>
          </div>
        </div>
      </div>
      <div class="word-item word-item-2">
        <div class="words">
          <div :class="['scroll', scrollTow()]">
            <template v-for="(item, index) in textObj.html[1] || []" :key="index">
              <div :class="['w-title', 'w-cn', 'w-en', 'w-other'][item.type]">{{ item.label }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Box from './box.vue'
import Decoration from './decoration.vue'
import Text from '@/assets/text.png'
import { texts } from './text'
export default {
  name: 'Anime',
  props: {
    animeGroup: {
      type: Boolean,
      default: -1
    }
  },
  components: {
    Box,
    Decoration
  },
  data() {
    return {
      animeObject: {},
      animeKey: 0,
      // 
      animeSequence: 0,
      animeSequenceIndex: 0,
      animeBottle: 0,
      animeBottleIndex: 0,
      animeMid: 0,
      // 当前时间戳
      animeTime: 0,
      // 是否执行动画
      animeStart: false,
      // 文字框序列
      textDecoration: [],
      textDecorationIndex: 0,
      textDecorationLen: 0,
      Text,
      texts,
      textObj: {
        html: []
      },
      // 
      clickIndex: 1
    }
  },
  computed: {
    box() {
      return Object.values(this.animeObject)
    }
  },
  watch: {
    animeGroup(data) {
      this.setAnime(data)
    },
    clickIndex(data) {
      this.setAnime(data)
    },

  },
  created() {
    this.animeKey = this.animeGroup;

  },
  mounted() {
    this.loadDecorationFile()
    this.loadFile()
    requestAnimationFrame(this.animate)
    this.setAnime(1)

  },
  methods: {
    scrollOne() {
      return `scroll-1-${this.clickIndex}`
    },
    scrollTow() {
      return `scroll-2-${this.clickIndex}`
    },
    // 加载其他装饰png
    loadDecorationFile() {
      // 文字装饰
      const textDecoration = Object.values(import.meta.globEager('@/assets/textDecoration/*.png', { as: "url" }));
      this.textDecorationLen = textDecoration.length - 1;
      this.textDecoration = textDecoration;
    },
    // 加载文件
    loadFile() {
      const sequence1 = Object.values(import.meta.globEager('@/assets/petroleum/1Gasoline/sequence/*.png', { as: "url" })).map(i => i)
      const circulate1 = Object.values(import.meta.globEager('@/assets/petroleum/1Gasoline/circulate/*.png', { as: "url" })).map(i => i)
      const m1 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/1Gasoline/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence1, ...circulate1],
        mid: sequence1.length - 1,
      }
      const m2 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/2DieselOi/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence1, ...circulate1],
        mid: sequence1.length - 1,
      }
      const m3 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/3JetFule/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence1, ...circulate1],
        mid: sequence1.length - 1,
      }
      const sequence4 = Object.values(import.meta.globEager('@/assets/petroleum/4Naphtha/sequence/*.png', { as: "url" })).map(i => i)
      const circulate4 = Object.values(import.meta.globEager('@/assets/petroleum/4Naphtha/circulate/*.png', { as: "url" })).map(i => i)
      const m4 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/4Naphtha/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence4, ...circulate4],
        mid: sequence4.length - 1,
      }
      const sequence5 = Object.values(import.meta.globEager('@/assets/petroleum/5Sulphur/sequence/*.png', { as: "url" })).map(i => i)
      const circulate5 = Object.values(import.meta.globEager('@/assets/petroleum/5Sulphur/circulate/*.png', { as: "url" })).map(i => i)
      const m5 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/5Sulphur/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence5, ...circulate5],
        mid: sequence5.length - 1,
      }
      const sequence6 = Object.values(import.meta.globEager('@/assets/petroleum/6PX/sequence/*.png', { as: "url" })).map(i => i)
      const circulate6 = Object.values(import.meta.globEager('@/assets/petroleum/6PX/circulate/*.png', { as: "url" })).map(i => i)
      const m6 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/6PX/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence6, ...circulate6],
        mid: sequence6.length - 1,
      }
      const sequence7 = Object.values(import.meta.globEager('@/assets/petroleum/7PTA/sequence/*.png', { as: "url" })).map(i => i)
      const circulate7 = Object.values(import.meta.globEager('@/assets/petroleum/7PTA/circulate/*.png', { as: "url" })).map(i => i)
      const m7 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/7PTA/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence7, ...circulate7],
        mid: sequence7.length - 1,
      }
      const sequence8 = Object.values(import.meta.globEager('@/assets/petroleum/8FDY/sequence/*.png', { as: "url" })).map(i => i)
      const circulate8 = Object.values(import.meta.globEager('@/assets/petroleum/8FDY/circulate/*.png', { as: "url" })).map(i => i)
      const m8 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/8FDY/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence8, ...circulate8],
        mid: sequence8.length - 1,
      }
      const m9 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/9POY/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence8, ...circulate8],
        mid: sequence8.length - 1,
      }
      const m10 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/10DTY/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence8, ...circulate8],
        mid: sequence8.length - 1,
      }
      const sequence11 = Object.values(import.meta.globEager('@/assets/petroleum/11聚酯薄膜、薄膜级切片/sequence/*.png', { as: "url" })).map(i => i)
      const circulate11 = Object.values(import.meta.globEager('@/assets/petroleum/11聚酯薄膜、薄膜级切片/circulate/*.png', { as: "url" })).map(i => i)
      const m11 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/11聚酯薄膜、薄膜级切片/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence11, ...circulate11],
        mid: sequence11.length - 1,
      }
      const sequence12 = Object.values(import.meta.globEager('@/assets/petroleum/12瓶级切片/sequence/*.png', { as: "url" })).map(i => i)
      const circulate12 = Object.values(import.meta.globEager('@/assets/petroleum/12瓶级切片/circulate/*.png', { as: "url" })).map(i => i)
      const m12 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/12瓶级切片/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence12, ...circulate12],
        mid: sequence12.length - 1,
      }
      const sequence13 = Object.values(import.meta.globEager('@/assets/petroleum/13EG/sequence/*.png', { as: "url" })).map(i => i)
      const circulate13 = Object.values(import.meta.globEager('@/assets/petroleum/13EG/circulate/*.png', { as: "url" })).map(i => i)
      const m13 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/13EG/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence13, ...circulate13],
        mid: sequence13.length - 1,
      }
      const sequence14 = Object.values(import.meta.globEager('@/assets/petroleum/14HDPE/sequence/*.png', { as: "url" })).map(i => i)
      const circulate14 = Object.values(import.meta.globEager('@/assets/petroleum/14HDPE/circulate/*.png', { as: "url" })).map(i => i)
      const m14 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/14HDPE/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence14, ...circulate14],
        mid: sequence14.length - 1,
      }
      const sequence15 = Object.values(import.meta.globEager('@/assets/petroleum/15LDPE/sequence/*.png', { as: "url" })).map(i => i)
      const circulate15 = Object.values(import.meta.globEager('@/assets/petroleum/15LDPE/circulate/*.png', { as: "url" })).map(i => i)
      const m15 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/15LDPE/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence15, ...circulate15],
        mid: sequence15.length - 1,
      }
      const sequence16 = Object.values(import.meta.globEager('@/assets/petroleum/16PP/sequence/*.png', { as: "url" })).map(i => i)
      const circulate16 = Object.values(import.meta.globEager('@/assets/petroleum/16PP/circulate/*.png', { as: "url" })).map(i => i)
      const m16 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/16PP/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence16, ...circulate16],
        mid: sequence16.length - 1,
      }
      const sequence17 = Object.values(import.meta.globEager('@/assets/petroleum/17Phenol/sequence/*.png', { as: "url" })).map(i => i)
      const circulate17 = Object.values(import.meta.globEager('@/assets/petroleum/17Phenol/circulate/*.png', { as: "url" })).map(i => i)
      const m17 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/17Phenol/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence17, ...circulate17],
        mid: sequence17.length - 1,
      }
      const m18 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/18Acetone/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence17, ...circulate17],
        mid: sequence17.length - 1,
      }
      const sequence19 = Object.values(import.meta.globEager('@/assets/petroleum/19ABPA/sequence/*.png', { as: "url" })).map(i => i)
      const circulate19 = Object.values(import.meta.globEager('@/assets/petroleum/19ABPA/circulate/*.png', { as: "url" })).map(i => i)
      const m19 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/19ABPA/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence19, ...circulate19],
        mid: sequence19.length - 1,
      }
      const sequence20 = Object.values(import.meta.globEager('@/assets/petroleum/20PC/sequence/*.png', { as: "url" })).map(i => i)
      const circulate20 = Object.values(import.meta.globEager('@/assets/petroleum/20PC/circulate/*.png', { as: "url" })).map(i => i)
      const m20 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/20PC/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence20, ...circulate20],
        mid: sequence20.length - 1,
      }
      const sequence21 = Object.values(import.meta.globEager('@/assets/petroleum/21MMA/sequence/*.png', { as: "url" })).map(i => i)
      const circulate21 = Object.values(import.meta.globEager('@/assets/petroleum/21MMA/circulate/*.png', { as: "url" })).map(i => i)
      const m21 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/21MMA/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence21, ...circulate21],
        mid: sequence21.length - 1,
      }
      const sequence22 = Object.values(import.meta.globEager('@/assets/petroleum/22Acrylonitrile/sequence/*.png', { as: "url" })).map(i => i)
      const circulate22 = Object.values(import.meta.globEager('@/assets/petroleum/22Acrylonitrile/circulate/*.png', { as: "url" })).map(i => i)
      const m22 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/22Acrylonitrile/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence22, ...circulate22],
        mid: sequence22.length - 1,
      }
      const sequence23 = Object.values(import.meta.globEager('@/assets/petroleum/23Benzene/sequence/*.png', { as: "url" })).map(i => i)
      const circulate23 = Object.values(import.meta.globEager('@/assets/petroleum/23Benzene/circulate/*.png', { as: "url" })).map(i => i)
      const m23 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/23Benzene/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence23, ...circulate23],
        mid: sequence23.length - 1,
      }
      const sequence24 = Object.values(import.meta.globEager('@/assets/petroleum/24Styrene/sequence/*.png', { as: "url" })).map(i => i)
      const circulate24 = Object.values(import.meta.globEager('@/assets/petroleum/24Styrene/circulate/*.png', { as: "url" })).map(i => i)
      const m24 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/24Styrene/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence24, ...circulate24],
        mid: sequence24.length - 1,

      }
      const sequence25 = Object.values(import.meta.globEager('@/assets/petroleum/25C5/sequence/*.png', { as: "url" })).map(i => i)
      const circulate25 = Object.values(import.meta.globEager('@/assets/petroleum/25C5/circulate/*.png', { as: "url" })).map(i => i)
      const m25 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/25C5/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence25, ...circulate25],
        mid: sequence25.length - 1,

      }
      const sequence26 = Object.values(import.meta.globEager('@/assets/petroleum/26LLDPE/sequence/*.png', { as: "url" })).map(i => i)
      const circulate26 = Object.values(import.meta.globEager('@/assets/petroleum/26LLDPE/circulate/*.png', { as: "url" })).map(i => i)
      const m26 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/26LLDPE/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence26, ...circulate26],
        mid: sequence26.length - 1,

      }
      const sequence27 = Object.values(import.meta.globEager('@/assets/petroleum/27E/sequence/*.png', { as: "url" })).map(i => i)
      const circulate27 = Object.values(import.meta.globEager('@/assets/petroleum/27E/circulate/*.png', { as: "url" })).map(i => i)
      const m27 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/27E/bottle/*.png', { as: "url" })).map(i => i),
        list: [...sequence27, ...circulate27],
        mid: sequence27.length - 1,

      }
      this.animeObject = {
        1: m1,
        2: m2,
        3: m3,
        4: m4,
        5: m5,
        6: m6,
        7: m7,
        8: m8,
        9: m9,
        10: m10,
        11: m11,
        12: m12,
        13: m13,
        14: m14,
        15: m15,
        16: m16,
        17: m17,
        18: m18,
        19: m19,
        20: m20,
        21: m21,
        22: m22,
        23: m23,
        24: m24,
        25: m25,
        26: m26,
        27: m27,
      }
    },

    // 路径循环动画
    animate(time) {
      if (time - this.animeTime > 40) {
        // 路径动画
        if (this.animeStart) {
          this.animeTime = time;
          this.animeSequenceIndex = this.animeSequenceIndex === this.animeSequence ? this.animeMid : this.animeSequenceIndex + 1
          this.animeBottleIndex = this.animeBottleIndex === this.animeBottle ? 0 : this.animeBottleIndex + 1
        }
        // 文字装饰
        this.textDecorationIndex = this.textDecorationIndex === this.textDecorationLen ? 0 : this.textDecorationIndex + 1;
      }
      // 其他循环动画
      requestAnimationFrame(this.animate)
    },
    // 切换内容
    setAnime(key) {
      this.animeStart = false
      this.animeKey = key
      const { bottle, list, mid } = this.animeObject[key]
      this.animeSequence = list.length - 1
      this.animeBottle = bottle.length - 1
      this.animeSequenceIndex = 0
      this.animeBottleIndex = 0
      this.animeMid = mid;
      // text
      this.textObj = this.texts[key]
      this.$nextTick(() => {
        this.animeStart = true
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.animation {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1920px;
  height: 1080px;
  overflow: hidden;

  .anime-box {
    position: relative;
    height: 100%;

    // 路径动画
    .sequence-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .sequence {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
        object-fit: cover;
      }
    }

    // 物体动画
    .bottle-box {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      width: 600px;
      height: 100%;
      left: 850px;

      .bottle {
        position: absolute;
        top: 100px;
        display: block;
        object-fit: cover;
      }
    }

    .link {
      position: absolute;
      left: 800px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
      }
    }


  }

  .element {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;

    // 装饰
    .decoration-1 {
      top: -100px;
      right: -150px;

    }

    .decoration-2 {
      bottom: -100px;
      left: -150px;

      :deep .piece {
        animation-delay: 4000ms;
      }
    }

    // 标题装饰
    .title-decoration {
      position: absolute;
      width: 696px;
      height: 266px;
      top: -70px;
      left: 745px;

      img {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }

    // 链接
    .link {
      position: absolute;
      top: 518px;
      right: 220px;

      .link-move {
        animation: animaDashed 2000ms linear infinite;

        @keyframes animaDashed {
          0% {
            stroke-dashoffset: 0
          }

          0% {
            stroke-dashoffset: 96.6
          }
        }
      }
    }
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
  }

  .word-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 19;

    .title-box {
      position: absolute;
      color: #91e7ff;
      display: flex;
      left: 1048px;
      // left: 1120px;
      top: 68px;
      // top: 0px;
      line-height: 1;

      .iconfont {
        font-size: 26px;
        padding-right: 10px;
      }

      .title {
        line-height: 1;

        .top {
          font-family: 黑体;
          padding-top: 2px;
          font-size: 24px;
          letter-spacing: 2px;
          font-weight: bold;
        }

        .bottom {
          font-size: 18px;
          letter-spacing: 2px;
          line-height: 1.3;
        }
      }
    }

    .word-item {
      position: absolute;
      width: 500px;
      height: 350px;
      padding: 8px 16px;


      &.word-item-1 {
        left: 1328px;
        top: 143px;
      }

      &.word-item-2 {
        left: 1218px;
        top: 643px;
      }

      .words {
        width: 100%;
        height: 100%;
        // background-color: rgba(255, 255, 255, .1);
        overflow: hidden;

        .scroll {
          animation-delay: 2000ms;
          transform: matrix(1, 0, 0, 1, 0, 0);

          &.scroll-1-15 {
            animation: anima115 30000ms linear infinite;
          }

          @keyframes anima115 {
            0% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            30% {
              transform: matrix(1, 0, 0, 1, 0, -304);
            }

            50% {
              transform: matrix(1, 0, 0, 1, 0, -304);
            }

            80% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            100% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }
          }

          &.scroll-1-26 {
            animation: anima126 30000ms linear infinite;
          }

          @keyframes anima126 {
            0% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            30% {
              transform: matrix(1, 0, 0, 1, 0, -186);
            }

            50% {
              transform: matrix(1, 0, 0, 1, 0, -186);
            }

            80% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            100% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }
          }

          &.scroll-1-27 {
            animation: anima127 90000ms linear infinite;
          }

          @keyframes anima127 {
            0% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            30% {
              transform: matrix(1, 0, 0, 1, 0, -758);
            }

            50% {
              transform: matrix(1, 0, 0, 1, 0, -758);
            }

            80% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            100% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }
          }

          &.scroll-2-27 {
            animation: anima227 90000ms linear infinite;
          }

          @keyframes anima227 {
            0% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            30% {
              transform: matrix(1, 0, 0, 1, 0, -835);
            }

            50% {
              transform: matrix(1, 0, 0, 1, 0, -835);
            }

            80% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }

            100% {
              transform: matrix(1, 0, 0, 1, 0, 0);
            }
          }
        }

        .w-title {
          position: relative;
          color: #ffe555;
          font-size: 18px;
          line-height: 40px;
          padding-left: 25px;

          &::before {
            content: "";
            position: absolute;
            width: 12px;
            height: 12px;
            border: 2px #ffe555 solid;
            left: 0;
            top: 13px;
            transform-origin: center center;
            transform: rotate(45deg);
          }

          &::after {
            content: "";
            position: absolute;
            width: 4px;
            height: 4px;
            background-color: #ffe555;
            left: 6px;
            top: 19px;
            transform-origin: center center;
            transform: rotate(45deg);
          }
        }

        .w-cn {
          font-size: 16px;
          line-height: 26px;
          letter-spacing: 1.6px;
        }

        .w-en {
          font-size: 16px;
          line-height: 26px;
          word-break: break-all;
          word-wrap: break-word;
          hyphens: auto;
          -webkit-hyphens: auto;
          letter-spacing: 1.6px;
        }


        .w-other {
          position: relative;
          font-size: 16px;
          line-height: 26px;
          padding-left: 20px;
          letter-spacing: 1.6px;

          &::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #ffe555;
            left: 0;
            top: 8px;
            border-radius: 2px;
          }
        }
      }
    }
  }

}
</style>
