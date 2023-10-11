<template>
  <div class="animation">
    <div class="anime-box">
      <!-- 路径动画 -->
      <div v-for="(animeList, j) in box" :key="j" class="anime"
        :style="{ visibility: animeKey === j ? 'inherit' : 'hidden' }">
        <!-- 路径动画 -->
        <img v-for="(item, index) in animeList" :key="index" :src="item"
          :style="{ visibility: animeIndex === index ? 'inherit' : 'hidden' }" />
      </div>
      <!-- 物体动画 -->
      <!-- 文字 -->
      <img class="text" src="" alt="">
      <!-- 文字窗体动画-->
      <div class="boxs boxs-1">
        <img v-for="(item, index) in boxs" :key="index" :src="item"
          :style="{ visibility: boxsIndex === index ? 'inherit' : 'hidden' }" />
      </div>
      <!-- 文字窗体链接动画 -->
      <!-- <div class="link">
        <img v-for="(item, index) in link" :key="index" :src="item"
          :style="{ visibility: linkIndex === index ? 'inherit' : 'hidden' }" />
      </div> -->
      <!-- 文字窗体动画 -->
      <!-- <div class="boxs boxs-2"></div> -->
      <!-- 标题装饰动画 -->
      <div class="audio">
        <template v-for="i in 30" :key="i">
          <div :class="['a', `a${i}`]" />
        </template>
      </div>
      <!--  -->
      <Box />
    </div>
  </div>
</template>

<script>
import Box from './box.vue'
export default {
  name: 'Anime',
  props: {
    animeGroup: {
      type: Boolean,
      default: 0
    }
  },
  components: {
    Box
  },
  data() {
    return {
      animeObject: {},
      animeKey: 0,
      animeList: [],
      animeIndex: 1,
      animeTime: 0,
      animeStart: false,
      // 文字框序列
      boxs: [],
      boxsIndex: 0,
      boxsLen: 0,
      link: [],
      linkIndex: 0,
      linkLen: 0,
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
    }
  },
  created() {
    this.animeKey = this.animeGroup
  },
  mounted() {
    // const modulesFiles1 = import.meta.globEager('@/assets/1/*.png', { as: "url" })
    // const modulesFiles2 = import.meta.globEager('@/assets/2/*.png', { as: "url" })
    // const modulesFiles3 = import.meta.globEager('@/assets/3/*.png', { as: "url" })
    // const modulesFiles4 = import.meta.globEager('@/assets/4/*.png', { as: "url" })
    // const modulesFiles5 = import.meta.globEager('@/assets/5/*.png', { as: "url" })
    // const modulesFiles6 = import.meta.globEager('@/assets/6/*.png', { as: "url" })
    // const modulesFiles7 = import.meta.globEager('@/assets/7/*.png', { as: "url" })
    // const modulesFiles8 = import.meta.globEager('@/assets/8/*.png', { as: "url" })
    // const modulesFiles9 = import.meta.globEager('@/assets/9/*.png', { as: "url" })
    // const modulesFiles10 = import.meta.globEager('@/assets/10/*.png', { as: "url" })
    // const modulesFiles11 = import.meta.globEager('@/assets/11/*.png', { as: "url" })
    // const modulesFiles12 = import.meta.globEager('@/assets/12/*.png', { as: "url" })
    // const modulesFiles13 = import.meta.globEager('@/assets/13/*.png', { as: "url" })
    // const modulesFiles14 = import.meta.globEager('@/assets/14/*.png', { as: "url" })
    // const modulesFiles15 = import.meta.globEager('@/assets/15/*.png', { as: "url" })
    // const modulesFiles16 = import.meta.globEager('@/assets/16/*.png', { as: "url" })
    // const modulesFiles17 = import.meta.globEager('@/assets/17/*.png', { as: "url" })
    // const modulesFiles18 = import.meta.globEager('@/assets/18/*.png', { as: "url" })
    // const modulesFiles19 = import.meta.globEager('@/assets/19/*.png', { as: "url" })
    // const modulesFiles20 = import.meta.globEager('@/assets/20/*.png', { as: "url" })
    // const modulesFiles21 = import.meta.globEager('@/assets/21/*.png', { as: "url" })
    // const modulesFiles22 = import.meta.globEager('@/assets/22/*.png', { as: "url" })
    // const modulesFiles23 = import.meta.globEager('@/assets/23/*.png', { as: "url" })
    // const modulesFiles24 = import.meta.globEager('@/assets/24/*.png', { as: "url" })
    // const modulesFiles25 = import.meta.globEager('@/assets/25/*.png', { as: "url" })
    // const modulesFiles26 = import.meta.globEager('@/assets/26/*.png', { as: "url" })
    // const modulesFiles27 = import.meta.globEager('@/assets/27/*.png', { as: "url" })
    // const modulesFiles28 = import.meta.globEager('@/assets/28/*.png', { as: "url" })
    // const modulesFiles29 = import.meta.globEager('@/assets/29/*.png', { as: "url" })
    // this.animeObject = {
    //   1: Object.values(modulesFiles1).map(item => {
    //     return item
    //   }),
    //   2: Object.values(modulesFiles2).map(item => {
    //     return item
    //   }),
    //   3: Object.values(modulesFiles3).map(item => {
    //     return item
    //   }),
    //   4: Object.values(modulesFiles4).map(item => {
    //     return item
    //   }),
    //   5: Object.values(modulesFiles5).map(item => {
    //     return item
    //   }),
    //   6: Object.values(modulesFiles6).map(item => {
    //     return item
    //   }),
    //   7: Object.values(modulesFiles7).map(item => {
    //     return item
    //   }),
    //   8: Object.values(modulesFiles8).map(item => {
    //     return item
    //   }),
    //   9: Object.values(modulesFiles9).map(item => {
    //     return item
    //   }),
    //   10: Object.values(modulesFiles10).map(item => {
    //     return item
    //   }),
    //   11: Object.values(modulesFiles11).map(item => {
    //     return item
    //   }),
    //   12: Object.values(modulesFiles12).map(item => {
    //     return item
    //   }),
    //   13: Object.values(modulesFiles13).map(item => {
    //     return item
    //   }),
    //   14: Object.values(modulesFiles14).map(item => {
    //     return item
    //   }),
    //   15: Object.values(modulesFiles15).map(item => {
    //     return item
    //   }),
    //   16: Object.values(modulesFiles16).map(item => {
    //     return item
    //   }),

    //   17: Object.values(modulesFiles17).map(item => {
    //     return item
    //   }),
    //   18: Object.values(modulesFiles18).map(item => {
    //     return item
    //   }),
    //   19: Object.values(modulesFiles19).map(item => {
    //     return item
    //   }),
    //   20: Object.values(modulesFiles20).map(item => {
    //     return item
    //   }),
    //   21: Object.values(modulesFiles21).map(item => {
    //     return item
    //   }),
    //   22: Object.values(modulesFiles22).map(item => {
    //     return item
    //   }),
    //   23: Object.values(modulesFiles23).map(item => {
    //     return item
    //   }),
    //   24: Object.values(modulesFiles24).map(item => {
    //     return item
    //   }),
    //   25: Object.values(modulesFiles25).map(item => {
    //     return item
    //   }),
    //   26: Object.values(modulesFiles26).map(item => {
    //     return item
    //   }),
    //   27: Object.values(modulesFiles27).map(item => {
    //     return item
    //   }),
    //   28: Object.values(modulesFiles28).map(item => {
    //     return item
    //   }),
    //   29: Object.values(modulesFiles29).map(item => {
    //     return item
    //   }),
    // }
    // 文字框
    const boxs = Object.values(import.meta.globEager('@/assets/box/*.png', { as: "url" }))
    this.boxsLen = boxs.length
    this.boxs = boxs
    // 文字框连接线
    const link = Object.values(import.meta.globEager('@/assets/link/*.png', { as: "url" }))
    this.linkLen = boxs.length
    this.link = link
    requestAnimationFrame(this.animate)
  },
  methods: {
    // 加载文件

    // 路径循环动画
    animate(time) {
      if (time - this.animeTime > 40) {
        // 路径动画
        if (this.animeStart) {
          this.animeTime = time;
          this.animeIndex = this.animeIndex === this.animeList.length - 1 ? 0 : this.animeIndex + 1
        }
        // 文字框动画
        this.boxsIndex = this.boxsIndex === this.boxsLen - 1 ? 0 : this.boxsIndex + 1
        // 文字框连接线
        this.linkIndex = this.linkIndex === this.linkLen - 1 ? 0 : this.linkIndex + 1
      }
      // 其他循环动画
      requestAnimationFrame(this.animate)
    },
    // 切换内容
    setAnime(key) {
      this.animeStart = false
      this.animeKey = key
      this.animeList = this.animeObject[key]
      this.animeIndex = 0
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
  background-color: #333;
  width: 1920px;
  height: 1080px;
  // height: 100%;

  .anime-box {
    position: relative;
    height: 100%;

    .anime {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .boxs {
      // position: absolute;
      height: 490px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
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



}
</style>
