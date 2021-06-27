<template>
  <div class="box">
    <p class="bigmsg">ระบบล็อกอิน</p>
    <hr class="solid" />
    <p class="desc">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>

    <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>
    <p class="fieldname">อีเมล</p>
    <b-input-group class="mb-2" size="lg">
      <b-input-group-prepend is-text>
        <b-icon icon="envelope-fill"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        v-model="$v.data.identifier.$model"
        :class="{ hasError: $v.data.identifier.$error }"
        class="msg"
        type="text"
        placeholder="โปรดกรอกอีเมลของท่านลงในช่องนี้"
        @input="$v.data.identifier.$touch()"
      ></b-form-input>
    </b-input-group>
    <div
      v-if="!$v.data.identifier.required && $v.data.identifier.$dirty"
      class="error"
    >
      กรุณากรอกอีเมล์
    </div>
    <div v-if="!$v.data.identifier.email" class="error">อีเมล์ไม่ถูกต้อง</div>

    <p class="fieldname">รหัสผ่าน</p>
    <b-input-group class="mb-2" size="lg">
      <b-input-group-prepend is-text>
        <b-icon icon="person-fill"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        v-model="$v.data.password.$model"
        :class="{ hasError: $v.data.password.$error }"
        class="msg"
        type="password"
        placeholder="โปรดกรอกรหัสผ่านของท่านลงในช่องนี้"
        @input="$v.data.password.$touch()"
      ></b-form-input>
    </b-input-group>
    <div
      v-if="!$v.data.password.required && $v.data.password.$dirty"
      class="error"
    >
      กรุณากรอกรหัสผ่าน
    </div>

    <b-button
      type="submit"
      value="submit"
      variant="outline-primary"
      style="
        display: block;
        font-family: 'K2D', sans-serif;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.5px;
        border-width: 3px;
        border-radius: 5px;
        transition-duration: 0.4s;
        padding: 10px 15px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        text-align: center;
      "
      @click="login"
    >
      เข้าสู่ระบบ
    </b-button>
    <div class="link-to">
      ยังไม่มีบัญชี? <nuxt-link to="/register">ลงทะเบียน</nuxt-link>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  layout: 'headerguest',
  data() {
    return {
      data: {
        identifier: '',
        password: '',
      },
      error: '',
    }
  },
  validations: {
    data: {
      identifier: {
        email,
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    async login() {
      this.error = null
      try {
        if (!this.$v.data.$anyError) {
          await this.$auth.loginWith('local', { data: this.data })
          this.$toast.success('เข้าสู่ระบบสำเร็จ')
        }
      } catch (e) {
        if (e.response?.data?.message[0]?.messages[0]?.message) {
          const errorMessage =
            'เข้าสู่ระบบไม่สำเร็จ : ' +
            e.response?.data?.message[0]?.messages[0]?.message
          console.error(errorMessage)
          this.error = errorMessage
        } else {
          const errorMessage = 'เข้าสู่ระบบไม่สำเร็จ : ' + e
          console.error(errorMessage)
          this.error = errorMessage
        }
      }
    },
  },
}
</script>

<style>
/* import font Kanit */
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
/* import font K2D */
@import url('https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

.bigmsg {
  color: darkslategray;
  font-family: 'K2D', sans-serif;
  font-size: 40px;
  text-align: center;
  padding-top: 120px;
  font-weight: bold;
}
.box {
  margin: auto;
  width: 60%;
  padding: 10px;
}
.desc {
  color: black;
  font-family: 'K2D', sans-serif;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
}
.fieldname {
  margin-top: 20px;
  color: darkslategray;
  font-family: 'K2D', sans-serif;
  font-size: 20px;
}
.link-to {
  font-family: 'K2D', sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
.msg {
  font-family: 'K2D', sans-serif;
  font-size: 20px;
}
.bg {
  background-color: blue;
}
.error {
  color: red;
}
</style>
