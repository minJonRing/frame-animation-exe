<template>
  <div class="anime">
    <div class="anime-box">
      <div v-for="(animeList, j) in box" :key="j" class="anime"
        :style="{ visibility: animeKey === j ? 'inherit' : 'hidden' }">
        <img v-for="(item, index) in animeList" :key="index" :src="item"
          :style="{ visibility: animeIndex === index ? 'inherit' : 'hidden' }" />
      </div>
    </div>
    <div class="btns">
      <div v-for="item in btns" :key="item.key" @click="handleClick(item)">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import aa from '@/assets/anime/1_0001.jpg'
export default {
  name: 'Anime',
  setup() {
    return {
      aa
    }
  },
  data() {
    return {
      animeObject: {},
      animeKey: 0,
      animeList: [],
      animeIndex: 1,
      animeTime: 0,
      animeStart: false,
      // 
      btns: [{ key: 0, name: '按钮1' }, { key: 1, name: '按钮2' }],
    }
  },
  computed: {
    box() {
      return Object.values(this.animeObject)
    }
  },
  mounted() {
    const modulesFiles = import.meta.globEager('@/assets/anime/*.jpg', { as: "url" })
    const modulesFiles1 = import.meta.globEager('@/assets/anime1/*.jpg', { as: "url" })
    this.animeObject = {
      0: Object.values(modulesFiles).map(item => {
        return item
      }),
      1: Object.values(modulesFiles1).map(item => {
        return item
      })
    }
    requestAnimationFrame(this.animate)
  },
  methods: {
    animate(time) {
      if (this.animeStart) {
        if (time - this.animeTime > 40) {
          this.animeTime = time;
          this.animeIndex = this.animeIndex === this.animeList.length - 1 ? 0 : this.animeIndex + 1
        }
      }
      requestAnimationFrame(this.animate)
    },
    handleClick(item) {
      this.animeStart = false
      const { key } = item;
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
.anime {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  .anime-box {
    position: relative;
    height: calc(100% - 100px);

    .anime {
      position: absolute;
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
  }

  .btns {
    height: 100px;
    display: flex;
    align-items: center;
  }

  .anime-item {
    position: absolute;
    background-color: #dfdfdf;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
