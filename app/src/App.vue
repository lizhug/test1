<template>
  <div id="app">
    <custom-dialog
      :isShow="isShow.dialog"
      @closeDialog="isShow.dialog = false"
      @getPhoneNumber="getPhoneNumber"
    >
    </custom-dialog>

    <table class="user-info">
      <tbody class="user-info-tbody">
      <!--Phone Number-->
      <tr>
        <td class="user-info-keyword">
          Phone Number
          <i class="hint-required">*</i>
        </td>
        <td>
          <input
            type="tel"
            placeholder="Add your phone number"
            class="user-info-input"
            v-model="userData.phoneNumber"
            @focus="isShow.dialog = true"
          >
        </td>
      </tr>
      <!--Birthday-->
      <tr>
        <td class="user-info-keyword">
          Birthday
          <i class="hint-required">*</i>
        </td>
        <td>
          <input
            type="date"
            placeholder="Add your birthdate"
            class="user-info-input"
            v-model="userData.birthday"
          >
        </td>
      </tr>
      <!--Industy-->
      <tr>
        <td class="user-info-keyword">
          Industy
          <i class="hint-required">*</i>
        </td>
        <td>
          <input
            type="text"
            placeholder="Add your industy"
            class="user-info-input"
            v-model="userData.industy"
            @focus="isShow.industyList = true"
            @blur="isShow.industyList = false"
          >
          <ul class="choose-list" v-show="isShow.industyList" @mousedown="getIndusty">
            <li v-for="(item,index) in IndustyList" :key="index">{{item}}</li>
          </ul>
        </td>
      </tr>
      <!--Hometown-->
      <tr>
        <td class="user-info-keyword">Hometown</td>
        <td>
          <input
            type="text"
            placeholder="Add your hometown"
            class="user-info-input"
            v-model="userData.hometown"
            @focus="isShow.hometownList = true"
            @blur="isShow.hometownList = false"
          >
          <ul class="choose-list" v-show="isShow.hometownList" @mousedown="getHometown">
            <li v-for="(item,index) in HometownList" :key="index">{{item}}</li>
          </ul>
        </td>
      </tr>
      <!--Personality-->
      <tr>
        <td class="user-info-keyword">Personality</td>
        <td>
          <input
            type="text"
            placeholder="Add your personality"
            class="user-info-input"
            v-model="userData.personality"
            @focus="isShow.personalityList = true"
            @blur="isShow.personalityList = false"
          >
          <ul class="choose-list" v-show="isShow.personalityList" @mousedown="getPersonality">
            <li v-for="(item,index) in PersonalityList" :key="index">{{item}}</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import customDialog from './base/dialog';

  export default {
    name: 'app',
    components: {
      customDialog
    },
    data() {
      return {
        userData: {
          phoneNumber: '',
          birthday: '',
          industy: '',
          hometown: '',
          personality: ''
        },
        isShow: {
          industyList: false,
          hometownList: false,
          personalityList: false,
          dialog: false
        },
        IndustyList: ['Apple', 'Orange', 'Pink'],
        HometownList: ['Beijing', 'Shanghai', 'Nanjing'],
        PersonalityList: ['Good Boy', 'Bad Girl', 'Beautiful Women']
      };
    },
    methods: {
      /*获取phoneNumber*/
      getPhoneNumber(value) {
        this.userData.phoneNumber = value;
        this.isShow.dialog = false;
      },
      /*获取industy*/
      getIndusty($event) {
        this.userData.industy = $event.target.innerHTML;
      },
      /*获取hometown*/
      getHometown($event) {
        this.userData.hometown = $event.target.innerHTML;
      },
      /*获取personality*/
      getPersonality($event) {
        this.userData.personality = $event.target.innerHTML;
      },
      /*发送用户数据*/
      postUserData(url, data) {
        return axios.post(url, data);
      }
    },
    watch: {
      /*检测数据变化，条件成立则向服务器发送数据 */
      userData: {
        handler(data) {
          //使用的函数节流思路，防止多次向服务器请求数据和频繁提示用户必填项。
          clearTimeout(this.postDateTimer);
          this.postDateTimer = setTimeout(() => {
            let complete = false;

            // 判断红点标注的选项为必选项是否都已填上
            data.phoneNumber && data.birthday && data.industy ? complete = true : complete = false;

            if (complete) {
              /*
              * 此处遇到跨域问题，CORS 头缺少 'Access-Control-Allow-Origin'
              * 因CORS设置需要后端配合，所以这里可以进一步优化
              * */
              this.postUserData('http://www.test.com/submit_data', this.userData)
                .then(res => {
                  console.log(res);
                }).catch(err => {
                  console.log(err);
                });
            } else {
              console.log('红点标注的选项为必选项，如Phone Number*');
            }
          }, 1000);
        },
        deep: true
      }
    }
  };
</script>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  /*必选提示*/
  .hint-required {
    color: red;
  }

  /*垂直水平居中*/
  @mixin center {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .user-info-tbody {
    display: flex;
    flex-direction: column;
    width: 380px;
    height: 320px;
    border: 1px solid #ddd;
    border-radius: 10px;
    @include center;
    tr {
      flex: 1;
      display: flex;
      padding: 0 2%;
      align-items: center;
      .user-info-keyword {
        flex: 1;
        color: #666;
        font-weight: bold;
      }
      .user-info-input {
        position: relative;
        border: none;
        width: 200px;
        color: #666;
      }
      .choose-list {
        position: absolute;
        z-index: 2;
        width: 200px;
        height: 60px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 0 0 4px 4px;
        li {
          color: #666;
          cursor: pointer;
        }
        li:hover {
          background-color: #ddd;
        }
        li + li {
          border-top: 1px solid #ddd;

        }
      }
    }
    tr + tr {
      border-top: 1px solid #ddd;
    }
  }
</style>
