<template>
  <div class="recommend">
    <div class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider ref="slider">
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="imgLoad" alt="">
              </a>
            </div>
          </slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from "base/loading/loading2";
import Scroll from "base/scroll/scroll2";
import Slider from "base/slider/slider3";
import { getRecommend, getDiscList } from "api/recommend2";
import { ERR_OK } from "api/config";
export default {
  components: {
    Slider
  },
  created() {
    this._getRecommend();
  },
  data() {
    return {
      recommends: []
    };
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    imgLoad() {
      console.log(123);
      this.$refs.slider.refresh();
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>