<template>
  <div class="index-container">
    111
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 24px;
    background: #fff;
    .demo-home__title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 6px;
      font-size: 56px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 64px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      text-align: center;
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 28px;
    }
  }
}
</style>
