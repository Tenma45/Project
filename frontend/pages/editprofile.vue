<template>
  <div>
    <b-container class="my-5">
      <b-row style="font-family: 'K2D', sans-serif">
        <b-col cols="12">
          <h1 style="color: darkslategray">แก้ไขโปรไฟล์</h1>
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
                label="ข้อมูลผู้ใช้"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
              >
                <b-form-group
                  label="อีเมล : "
                  label-for="email"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    disabled
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="ชื่อ : "
                  label-for="first-name"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="first-name"
                    v-model="$v.form.firstName.$model"
                    :class="{ hasError: $v.form.firstName.$error }"
                    @input="$v.form.firstName.$touch()"
                  ></b-form-input>
                  <div
                    v-if="
                      !$v.form.firstName.required && $v.form.firstName.$dirty
                    "
                    class="error"
                  >
                    กรุณากรอกชื่อ
                  </div>
                </b-form-group>

                <b-form-group
                  label="นามสกุล : "
                  label-for="last-name"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="last-name"
                    v-model="$v.form.lastName.$model"
                    :class="{ hasError: $v.form.lastName.$error }"
                    @input="$v.form.lastName.$touch()"
                  ></b-form-input>
                  <div
                    v-if="!$v.form.lastName.required && $v.form.lastName.$dirty"
                    class="error"
                  >
                    กรุณากรอกนามสกุล
                  </div>
                </b-form-group>
              </b-form-group>
              <hr />
              <b-button variant="primary" type="submit">บันทึก</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  layout: 'headerguest',
  middleware: ['auth', 'notAdmin'],
  data() {
    return {
      show: true,
      form: {
        email: this.$auth.user.email,
        firstName: this.$auth.user.first_name,
        lastName: this.$auth.user.last_name,
      },
      massage: '',
      error: '',
    }
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
    },
  },
  methods: {
    onSubmit(event) {
      this.saveUser()
      event.preventDefault()
    },
    async saveUser() {
      this.massage = null
      this.error = null
      if (!this.$v.form.$anyError) {
        try {
          await this.$axios.put('users/' + this.$auth.user.id, {
            username: this.form.email,
            email: this.form.email,
            FirstName: this.form.firstName,
            LastName: this.form.lastName,
          })
          await this.$auth.fetchUser()
          this.message = `แก้ไขข้อมูลสำเร็จ`
          // this.$toast.success('แก้ไขข้อมูลสำเร็จ')
          this.$router.push('/profile')
        } catch (e) {
          const errorMessage = 'แก้ไขข้อมูลไม่สำเร็จ : '
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
