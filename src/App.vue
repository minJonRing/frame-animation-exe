<template>
  <div class="app">
    <Anime :animeGroup="animeGroup" :entity="entity" />
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
    // 监听进程推送信息
    window.electronAPI?.uploadValue((e, v) => {
      const _v = +v
      this.entity = _v === this.entity ? 0 : _v;
      this.animeGroup = _v
    })
  },
}
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
}
</style>
