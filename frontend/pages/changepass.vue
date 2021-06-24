<template>
  <div>
    <b-container class="my-5">
      <b-row style="font-family: 'K2D', sans-serif">
        <b-col cols="12">
          <h1 style="color: darkslategray">เปลี่ยนรหัสผ่าน</h1>
          <hr class="my-4" />
        </b-col>
        <b-col cols="12">
          <b-button to="/profile" variant="outline-danger">ย้อนกลับ</b-button>
        </b-col>
        <b-col cols="12" class="secondary-font my-3">
          <b-card>
            <b-alert v-if="massage" show variant="success">
              {{ massage }}
            </b-alert>
            <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>
            <b-form v-if="show" @submit="onSubmit">
              <b-form-group
                label-cols-lg="3"
                label="เปลี่ยนรหัสผ่าน"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
              >
                <!-- Email -->
                <b-form-group
                  label="รหัสผ่าน : "
                  label-for="password"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="password"
                    v-model="$v.form.password.$model"
                    type="password"
                    :class="{ hasError: $v.form.password.$error }"
                    @input="$v.form.password.$touch()"
                  ></b-form-input>
                  <div
                    v-if="!$v.form.password.required && $v.form.password.$dirty"
                    class="error"
                  >
                    กรุณากรอกรหัสผ่าน
                  </div>
                  <div v-if="!$v.form.password.minLength" class="error">
                    กรุณากรอกรหัสผ่านอย่างน้อย
                    {{ $v.form.password.$params.minLength.min }} ตัวอักษร
                  </div>
                </b-form-group>

                <b-form-group
                  label="ยืนยันรหัสผ่าน : "
                  label-for="confirm-password"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="confirm-password"
                    v-model="$v.form.repassword.$model"
                    type="password"
                    :class="{ hasError: $v.form.repassword.$error }"
                    @input="$v.form.repassword.$touch()"
                  ></b-form-input>
                  <div
                    v-if="
                      !$v.form.repassword.required && $v.form.repassword.$dirty
                    "
                    class="error"
                  >
                    กรุณายืนยันรหัสผ่าน
                  </div>
                  <div
                    v-if="
                      !$v.form.repassword.sameAsPassword &&
                      $v.form.repassword.required
                    "
                    class="error"
                  >
                    รหัสผ่านไม่ตรงกัน
                  </div>
                </b-form-group>
              </b-form-group>
              <b-button variant="primary" type="submit">บันทึก</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'headerguest',
  middleware: 'auth',
  data() {
    return {
      show: true,
      form: {
        password: '',
        repassword: '',
      },
      massage: '',
      error: '',
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(6),
      },
      repassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    onSubmit(event) {
      this.savePassword()
      event.preventDefault()
    },
    async savePassword() {
      this.massage = null
      this.error = null
      try {
        this.$v.form.$touch()
        if (!this.$v.form.$anyError) {
          await this.$axios.put('users/' + this.$auth.user.id, {
            password: this.form.password,
          })
          await this.$auth.fetchUser()
          this.message = `เปลี่ยนรหัสผ่านสำเร็จ`
          // this.$toast.success('เปลี่ยนรหัสผ่านสำเร็จ')
          this.$router.push('/profile')
        }
      } catch (e) {
        const errorMessage = 'เปลี่ยนรหัสผ่านไม่สำเร็จ : '
        if (e.response?.data?.message) {
          console.error(errorMessage + e.response?.data?.message)
          this.error = errorMessage + e.response?.data?.message
          // this.$toast.error(errorMessage + e.response?.data?.message)
        } else {
          console.error(errorMessage + e)
          this.error = errorMessage + e
          // this.$toast.error(errorMessage + e)
        }
      }
    },
  },
}
</script>

<style>
.error {
  color: red;
}
</style>
