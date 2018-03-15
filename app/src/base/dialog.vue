<template>
  <!--mask为灰色背景层-->
  <div class="mask" v-show="isShow">
    <div class="dialog">
      <header>
        <button @click="close">Cancel</button>
        <span>Phone Number</span>
        <button @click="submitPhoneNumber">Done</button>
      </header>
      <main>
        <input
          type="tel"
          placeholder="Add your phone number"
          class="user-info-input"
          v-model="phoneNumber"
          autofocus
        >
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: "custom-dialog",
    data () {
      return {
        phoneNumber: ''
      }
    },
    props: ['isShow'],
    methods: {
      // 向父组件发送phoneNumber
      submitPhoneNumber () {
        if (this.phoneNumber === '') {
          return
        } else {
          this.$emit('getPhoneNumber', this.phoneNumber);
        }
      },
      // 关闭dialog
      close () {
        this.$emit('closeDialog')
      }
    }
  }
</script>

<style scoped lang="scss">

  /*垂直水平居中*/
  @mixin center {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .3);
    top: 0;
    left: 0;
    z-index: 10;
    .dialog {
      width: 360px;
      height: 250px;
      background-color: #fff;
      border-radius: 10px;
      @include center;
      header {
        display: flex;
        padding: 10px 10px;
        border-bottom: 1px solid #ddd;
        button {
          flex: 1;
          font-size: 16px;
          font-weight: bold;
          color: #46b1ff;
          background-color: #fff;
          border: none;
          cursor: pointer;
        }
        button:active {
          border: none;
        }
        span {
          flex: 4;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }
      }
      main {
        padding: 10px;
        input {
          display: block;
          width: 100%;
          height: 180px;
          border: none;
        }
        input:focus {
          border: none;
        }
      }
    }
  }
</style>
