<template>
  <div class="app">
    <!-- <div class="anime" @click="handleSet">set</div> -->
    <Anime :animeGroup="animeGroup" :entity="entity" :entityKey="entityKey" />
  </div>
</template>

<script>
import Anime from '@/modules/anime/index.vue'
export default {
  name: 'App',
  data() {
    return {
      entity: 1,
      animeGroup: 0,
    }
  },
  components: {
    Anime
  },
  mounted() {
    console.log(window.electronAPI)
    // 监听进程推送信息
    window.electronAPI?.uploadValue((e, v) => {
      const [a, b] = v.split('/')
      this.entity = +a;
      this.$nextTick(() => {
        if (this.entity) {
          this.entityKey = +b
        } else {
          this.animeGroup = +b
        }

      })

    })
  },

  methods: {
    handleSet() {
      window.electronAPI.set(Math.floor(Math.random() * 10) + '')
    },
    async handleOpen() {
      // const value = await window.electronAPI.open()
      window.electronAPI.open().then(res => {
        console.log(res)
      })
      // console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
}
</style>
