<template>
  <div class="singer">
    <list-view :data="singer"></list-view>
  </div>
</template>

<script>
import { getSingerList } from "api/singer2";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer2";
import ListView from "base/listview/listview2";

const HOT_SINGER_LENGTH = 10;
const HOT_NAME = "热门";
export default {
  data() {
    return {
      singer: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singer = this._normalizeSinger(res.data.list);
          console.log(this._normalizeSinger(res.data.list));
        }
      });
    },
    //通过次函数得到想要的数据结构
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((element, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(
            new Singer({
              name: element.Fsinger_name,
              id: element.Fsinger_mid
            })
          );
        }
        const key = element.Findex;

        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        if (isNaN(parseInt(key))) {
          map[key].items.push(
            new Singer({
              name: element.Fsinger_name,
              id: element.Fsinger_mid
            })
          );
        } else {
          delete map[key];
        }
      });

      const hot = [];
      const temp = [];

      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          temp.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }

      temp.sort((a, b) => {
        return a.title.charCodeAt() - b.title.charCodeAt();
      });

      return hot.concat(temp);
    }
  },
  components: {
    ListView
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
