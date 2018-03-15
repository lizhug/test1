<template lang="html">
    <div id="app">
        <article :class="$style.infor">
            <div :class="$style.form_group">
                <label for="phone">Phone Number <span>*</span></label>
                <input id="phone" v-model="userInfor.phone" :class="$style.form_control" placeholder="Add your phone number" maxlength="11" @click="showDialog()" >
            </div>
            <div :class="$style.form_group">
                <label for="birthdate">Birthdate <span>*</span></label>
                <input id="birthdate" v-model="userInfor.birthdate" :class="$style.form_control" type="date" placeholder="Add your birthdate">
            </div>
            <div :class="$style.form_group">
                <label for="industry">Industry <span>*</span></label>
                <select id="industry" v-model="userInfor.industry" :class="$style.form_control_select">
                    <option disabled value="">Add your industry</option>
                    <option v-for="item in Industry" :key="item">{{ item }}</option>
                </select>
                <i class="icon iconfont icon-xiala2"/>
            </div>
            <div :class="$style.form_group">
                <label for="hometown">Hometown</label>
                <select id="hometown" v-model="userInfor.hometown" :class="$style.form_control_select">
                    <option disabled value="">Add your hometown</option>
                    <option v-for="item in Hometown" :key="item">{{ item }}</option>
                </select>
                <i class="icon iconfont icon-xiala2"/>
            </div>
            <div :class="$style.form_group">
                <label for="personality">Personality</label>
                <select id="personality" v-model="userInfor.personality" :class="$style.form_control_select">
                    <option disabled value="">Add your personality</option>
                    <option v-for="item in Personality" :key="item">{{ item }}</option>
                </select>
                <i class="icon iconfont icon-xiala2"/>
            </div>
        </article>
        <transition name="fade">
            <section v-show="dialog" :class="$style.modal_dialog">
                <div :class="$style.modal_content">
                    <div :class="$style.modal_header">
                        <span @click="hideDialog()">Cancel</span>
                        <span>Phone Number</span>
                        <span @click="doneDialog()">Done</span>
                    </div>
                    <div :class="$style.modal_body" @click="inputFocus()">
                        <input ref="userPhone" v-model="userInfor.phone" maxlength="11" placeholder="Add your phone number">
                    </div>
                </div>
            </section>
        </transition>
        {{ userInfor }}
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "App",
    data() {
        return {
            userInfor: {
                phone: "",
                birthdate: "",
                industry: "",
                hometown: "",
                personality: "",
            },
            Industry: ["Apple", "Orange", "Pink"],
            Hometown: ["Beijing", "Shanghai", "Nanjing"],
            Personality: ["Good Boy", "Bad Girl", "Beautiful Women"],
            dialog: false,
        }
    },
    watch: {
        userInfor: {
            deep: true,
            handler(obj) {
                let complete
                for (const key in obj) {
                    if (key === "phone" || key === "birthdate" || key === "industry") {
                        if (obj[key] === "") {
                            complete = false
                            break
                        }
                        else {
                            complete = true
                        }
                    }
                }
                if (obj.phone !== "" && obj.industry !== "" && obj.birthdate === "") {
                    const now = new Date()
                    const year = now.getFullYear()
                    let month = now.getMonth() + 1
                    month = month < 10 ? `0${month}` : month
                    let day = now.getDate()
                    day = day < 10 ? `0${day}` : day
                    obj.birthdate = `${year}-${month}-${day}`
                }
                if (complete) {
                    /* 发送请求 */
                    axios({
                        method: "post",
                        url: "http://www.test.com/submit_data",
                        data: obj,
                    }).then(response => {
                        console.log(response)
                    })
                }
            },
        },
    },
    methods: {
        showDialog() {
            this.dialog = true
        },
        hideDialog() {
            this.dialog = false
        },
        doneDialog() {
            if (this.userInfor.phone) {
                this.dialog = false
            }
        },
        inputFocus() {
            this.$refs.userPhone.focus()
        },
    },
}
</script>

<style lang="scss" module>
    .infor {
        height: 840px;
        .form_group {
            position: relative;
            display: flex;
            height: 84px;
            border-bottom: 1px solid #eee;
            label {
                width: 40%;
                font-size: 28px;
                text-align: left;
                line-height: 84px;
                padding-left: 5%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                span {
                    color: #f00;
                }
            }
            .form_control {
                flex: 1;
                border: none;
                font-size: 28px;
            }
            .form_control_select {
                flex: 1;
                font-size: 28px;
                /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
                border: none;

                /*很关键：将默认的select选择框样式清除*/
                appearance:none;
                -moz-appearance:none;
                -webkit-appearance:none;
                option {
                    font-size: 14px;
                    border: none;
                }
            }
            i {
                position: absolute;
                right: 5%;
                bottom: 35%;
                font-size: 28px;
            }
        }
    }
    .modal_dialog {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 1;
        background: rgba(7, 17, 27, 0.8);
        .modal_content {
            width: 80%;
            margin: 0 auto;
            margin-top: 10%;
            background: #fff;
            border-radius: 10px;
            .modal_header {
                display: flex;
                justify-content: space-around;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 28px;
                color: blue;
                line-height: 80px;
                border-bottom: 1px solid #ddd;
                span:nth-child(2) {
                    color: #000;
                }
            }
            .modal_body {
                height: 288px;
                input {
                    font-size: 28px;
                    border: none;
                    padding-left: 20px;
                }
            }
        }
    }
</style>
