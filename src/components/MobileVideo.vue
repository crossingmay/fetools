<template>
  <div class="mobile-video-wrapper" :id="'video-wrapper-'+idx"></div>
</template>

<script>
import ChimeeMobilePlayer from 'chimee-mobile-player'
import 'chimee-mobile-player/lib/chimee-mobile-player.browser.css'

export default {
  name: 'hseyeVideo',

  props: {
    src: String,
    idx: Number
  },

  data () {
    return {
      msg: 'hello'
    }
  },

  computed: {},

  methods: {
  },

  mounted () {
    this.$nextTick(() => {
      // eslint-disable-next-line
      new ChimeeMobilePlayer({
        wrapper: '#video-wrapper-' + this.idx, // video dom容器
        src: this.src,
        controls: true,
        playsInline: true,
        poster: require('@/assets/img/poster.png'),
        x5VideoPlayerFullscreen: true,
        x5VideoOrientation: 'landscape|portrait',
        xWebkitAirplay: true,
        muted: true
        // removeInnerPlugins: ['chimeeMobiControlbar', 'chimeeState'] // 需要移除的插件
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
