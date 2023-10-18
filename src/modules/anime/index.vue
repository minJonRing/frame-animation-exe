<template>
  <div class="animation">
    <div :class="['content', !entity ? 'active' : '']">
      <div class="all-title">
        <img :src="ImgTitle" />
      </div>
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
          <div class="more-img">
            <img class="bottle" v-for="(item, index) in animaPicFile" :key="index" :src="item"
              :style="{ visibility: animaPicIndex === index ? 'inherit' : 'hidden' }" />
          </div>
        </div>
      </div>
    </div>
    <div :class="['circle', entity ? 'active' : '']">
      <img class="bottle" v-for="(item, index) in circleFile" :key="index" :src="item"
        :style="{ visibility: circleIndex === index ? 'inherit' : 'hidden' }" />
    </div>
    <!-- <div class="next" @click="handleNext">next</div>
    <div class="prev" @click="handlePrev">prev</div> -->
  </div>
</template>

<script>
import ImgTitle from '@/assets/title.png'

import Box from './box.vue'
import Decoration from './decoration.vue'
import { texts } from './text'
export default {
  name: 'Anime',
  props: {
    animeGroup: {
      type: Boolean,
      default: -1
    },
    entity: {
      type: Number,
      default: 0
    }
  },
  components: {
    Box,
    Decoration
  },
  data() {
    return {
      circleFile: [],
      circle: 0,
      circleIndex: 0,
      // 
      ImgTitle,
      // 
      animeObject: {},
      animeKey: 0,
      // 路径
      animeSequence: 0,
      animeSequenceIndex: 0,
      // 瓶子
      animeBottle: 0,
      animeBottleIndex: 0,
      animeMid: 0,
      // pic 展示图
      animaPicFile: [],
      animaPic: 0,
      animaPicIndex: 0,
      // 当前时间戳
      animeTime: 0,
      // 是否执行动画
      animeStart: false,
      // 文字框序列
      textDecoration: [],
      textDecorationIndex: 0,
      textDecorationLen: 0,
      texts,
      textObj: {
        html: []
      },
      // 
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

  },
  created() {
    this.animeKey = this.animeGroup;

  },
  mounted() {
    this.loadCircleFile();
    this.loadDecorationFile()
    this.loadFile()
    requestAnimationFrame(this.animate)
    this.setAnime(1)
  },
  methods: {
    handleNext() {
      let i = this.animeKey + 1
      if (i > 29) {
        i = 1
      }
      this.setAnime(i)
    },
    handlePrev() {
      let i = this.animeKey - 1
      if (i <= 0) {
        i = 29
      }
      this.setAnime(i)
    },
    scrollOne() {
      return `scroll-1-${this.animeKey}`
    },
    scrollTow() {
      return `scroll-2-${this.animeKey}`
    },
    // 加载圆圈
    loadCircleFile() {
      const circleFile = Object.values(import.meta.globEager('@/assets/circle/*.png', { as: "url" }));
      this.circle = circleFile.length - 1;
      this.circleFile = circleFile
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
      const circulate1 = Object.values(import.meta.globEager('@/assets/petroleum/1Gasoline/circulate/*.png', { as: "url" })).map(i => i)
      const m1 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/1Gasoline/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate1],
        mid: 0,
      }
      const m2 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/2DieselOi/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate1],
        mid: 0,
      }
      const m3 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/3JetFule/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate1],
        mid: 0,
      }
      const circulate4 = Object.values(import.meta.globEager('@/assets/petroleum/4Naphtha/circulate/*.png', { as: "url" })).map(i => i)
      const m4 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/4Naphtha/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate4],
        mid: 0,
      }
      const circulate5 = Object.values(import.meta.globEager('@/assets/petroleum/5Sulphur/circulate/*.png', { as: "url" })).map(i => i)
      const m5 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/5Sulphur/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate5],
        mid: 0,
      }
      const circulate6 = Object.values(import.meta.globEager('@/assets/petroleum/6PX/circulate/*.png', { as: "url" })).map(i => i)
      const m6 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/6PX/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate6],
        mid: 0,
      }
      const circulate7 = Object.values(import.meta.globEager('@/assets/petroleum/7PTA/circulate/*.png', { as: "url" })).map(i => i)
      const m7 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/7PTA/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate7],
        mid: 0,
      }
      const circulate8 = Object.values(import.meta.globEager('@/assets/petroleum/8FDY/circulate/*.png', { as: "url" })).map(i => i)
      const m8 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/8FDY/bottle/*.png', { as: "url" })).map(i => i),
        pic: Object.values(import.meta.globEager('@/assets/petroleum/8FDY/pic/*.png', { as: "url" })).map(i => i),
        list: [...circulate8],
        mid: 0,
      }
      const m9 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/9POY/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate8],
        mid: 0,
      }
      const m10 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/10DTY/bottle/*.png', { as: "url" })).map(i => i),
        pic: Object.values(import.meta.globEager('@/assets/petroleum/10DTY/pic/*.png', { as: "url" })).map(i => i),
        list: [...circulate8],
        mid: 0,
      }
      const circulate11 = Object.values(import.meta.globEager('@/assets/petroleum/11聚酯薄膜、薄膜级切片/circulate/*.png', { as: "url" })).map(i => i)
      const m11 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/11聚酯薄膜、薄膜级切片/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate11],
        mid: 0,
      }
      const circulate12 = Object.values(import.meta.globEager('@/assets/petroleum/12瓶级切片/circulate/*.png', { as: "url" })).map(i => i)
      const m12 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/12瓶级切片/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate12],
        mid: 0,
      }
      const circulate13 = Object.values(import.meta.globEager('@/assets/petroleum/13EG/circulate/*.png', { as: "url" })).map(i => i)
      const m13 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/13EG/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate13],
        mid: 0,
      }
      const circulate14 = Object.values(import.meta.globEager('@/assets/petroleum/14HDPE/circulate/*.png', { as: "url" })).map(i => i)
      const m14 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/14HDPE/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate14],
        mid: 0,
      }
      const circulate15 = Object.values(import.meta.globEager('@/assets/petroleum/15LDPE/circulate/*.png', { as: "url" })).map(i => i)
      const m15 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/15LDPE/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate15],
        mid: 0,
      }
      const circulate16 = Object.values(import.meta.globEager('@/assets/petroleum/16PP/circulate/*.png', { as: "url" })).map(i => i)
      const m16 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/16PP/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate16],
        mid: 0,
      }
      const circulate17 = Object.values(import.meta.globEager('@/assets/petroleum/17Phenol/circulate/*.png', { as: "url" })).map(i => i)
      const m17 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/17Phenol/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate17],
        mid: 0,
      }
      const m18 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/18Acetone/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate17],
        mid: 0,
      }
      const circulate19 = Object.values(import.meta.globEager('@/assets/petroleum/19ABPA/circulate/*.png', { as: "url" })).map(i => i)
      const m19 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/19ABPA/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate19],
        mid: 0,
      }
      const circulate20 = Object.values(import.meta.globEager('@/assets/petroleum/20PC/circulate/*.png', { as: "url" })).map(i => i)
      const m20 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/20PC/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate20],
        mid: 0,
      }
      const circulate21 = Object.values(import.meta.globEager('@/assets/petroleum/21MMA/circulate/*.png', { as: "url" })).map(i => i)
      const m21 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/21MMA/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate21],
        mid: 0,
      }
      const circulate22 = Object.values(import.meta.globEager('@/assets/petroleum/22Acrylonitrile/circulate/*.png', { as: "url" })).map(i => i)
      const m22 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/22Acrylonitrile/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate22],
        mid: 0,
      }
      const circulate23 = Object.values(import.meta.globEager('@/assets/petroleum/23Benzene/circulate/*.png', { as: "url" })).map(i => i)
      const m23 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/23Benzene/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate23],
        mid: 0,
      }
      const circulate24 = Object.values(import.meta.globEager('@/assets/petroleum/24Styrene/circulate/*.png', { as: "url" })).map(i => i)
      const m24 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/24Styrene/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate24],
        mid: 0,

      }
      const circulate25 = Object.values(import.meta.globEager('@/assets/petroleum/25C5/circulate/*.png', { as: "url" })).map(i => i)
      const m25 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/25C5/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate25],
        mid: 0,

      }
      const circulate26 = Object.values(import.meta.globEager('@/assets/petroleum/26LLDPE/circulate/*.png', { as: "url" })).map(i => i)
      const m26 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/26LLDPE/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate26],
        mid: 0,

      }
      const circulate27 = Object.values(import.meta.globEager('@/assets/petroleum/27E/circulate/*.png', { as: "url" })).map(i => i)
      const m27 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/27E/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate27],
        mid: 0,

      }
      const circulate28 = Object.values(import.meta.globEager('@/assets/petroleum/28ABS/circulate/*.png', { as: "url" })).map(i => i)
      const m28 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/28ABS/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate28],
        mid: 0,

      }
      const circulate29 = Object.values(import.meta.globEager('@/assets/petroleum/29丁苯橡胶/circulate/*.png', { as: "url" })).map(i => i)
      const m29 = {
        bottle: Object.values(import.meta.globEager('@/assets/petroleum/29丁苯橡胶/bottle/*.png', { as: "url" })).map(i => i),
        list: [...circulate29],
        mid: 0,

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
        28: m28,
        29: m29,
      }
    },

    // 路径循环动画
    animate(time) {
      if (time - this.animeTime > 40) {
        // 路径动画
        if (this.animeStart) {
          this.animeTime = time;
          this.animeSequenceIndex = this.animeSequenceIndex === this.animeSequence ? 0 : this.animeSequenceIndex + 1
          this.animeBottleIndex = this.animeBottleIndex === this.animeBottle ? 0 : this.animeBottleIndex + 1
          this.animaPicIndex = this.animaPicIndex === this.animaPic ? 0 : this.animaPicIndex + 1
        }
        // 文字装饰
        this.textDecorationIndex = this.textDecorationIndex === this.textDecorationLen ? 0 : this.textDecorationIndex + 1;
        this.circleIndex = this.circleIndex === this.circle ? 0 : this.circleIndex + 1;
      }
      // 其他循环动画
      requestAnimationFrame(this.animate)
    },
    // 切换内容
    setAnime(key) {
      this.animeStart = false
      this.animeKey = key
      const { bottle, pic, list, mid } = this.animeObject[key]
      this.animaPicFile = pic || [];
      this.animeSequence = list.length - 1
      this.animeBottle = bottle.length - 1
      this.animaPic = (pic || []).length - 1
      this.animeSequenceIndex = 0
      this.animeBottleIndex = 0
      this.animaPicIndex = 0
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

  .circle {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 9;

    &.active {
      opacity: 1;

    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
    }
  }

  .content {
    position: relative;
    height: 100%;
    z-index: 2;
    opacity: 0;

    &.active {
      opacity: 1;

    }

    .all-title {
      position: absolute;
      top: 30px;
      left: 30px;

      img {
        display: block;
      }
    }



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

        :deep(.piece) {
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
            // color: #fff;
            font-size: 16px;
            line-height: 26px;
            letter-spacing: 1.6px;
          }

          .w-en {
            font-size: 16px;
            // color: #fff;

            line-height: 26px;
            word-break: break-all;
            word-wrap: break-word;
            hyphens: auto;
            -webkit-hyphens: auto;
            letter-spacing: 1.6px;
          }


          .w-other {
            // color: #fff;
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

        .more-img {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;

          img {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
          }
        }
      }
    }
  }

  .next {
    position: absolute;
    font-size: 30px;
    top: 100px;
    left: 350px;
    color: #fff;
    z-index: 999;
  }

  .prev {
    position: absolute;
    top: 100px;
    left: 500px;
    font-size: 30px;
    color: #fff;
    z-index: 999;
  }

}
</style>
