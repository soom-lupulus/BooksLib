<template>
  <div>
    <div class="books-outer">
      <ul>
        <li id="book" v-for="(item, index) in booksinfo" :key="index">
          <div class="info-outer">
            <img :src='`http://www.polimin.top:80/upload/media/books/${item.image_info.img_name}`'/>
            <div class="info">
              <p>书名：{{ item.bname }}</p>
              <p>作者：{{ item.bauthor }}</p>
              <p>还剩{{ item.can_borrow }}本可借阅</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
    const { data: res } = await this.$http.get('/all/books/infos')
    this.booksinfo = res.data
    console.log(this.booksinfo)
  },
  data () {
    return {
      booksinfo: []
    }
  }
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.books-outer {
  ul {
    width: 80%;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    #book {
      width: 25%;
      .info-outer{
          display: flex;
          img{
              width: 150px;
          }
          .info{

          }
      }
    }
  }
}
</style>
