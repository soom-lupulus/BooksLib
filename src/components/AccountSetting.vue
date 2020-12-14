<template>
  <div>
      <div class="account-outer">
          <div class="account-left"></div>
          <div class="account-middle"></div>
          <div class="account-right"></div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.account-outer{
    width: 100%;
    height: 50%;
    .account-left{
        background-color: antiquewhite;
        flex: 1;
    }
    .account-middle{
        background-color: rgb(114, 79, 34);
        flex: 2;
    }
    .account-right{
        background-color: rgb(32, 20, 5);
        flex: 1;
    }
}
</style>
