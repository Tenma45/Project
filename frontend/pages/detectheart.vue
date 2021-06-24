<template>
  <b-container class="my-5">
    <p class="b">ประเมินความเสี่ยงการเป็นโรคหัวใจ</p>
    <hr class="mt-3 mb-5" />
    <b-card
      border-variant="primary"
      header="โปรดกรอกข้อมูลผลตรวจสุขภาพประจำปี"
      header-bg-variant="primary"
      header-text-variant="white"
      bg-variant="light"
      body-class="text-center"
      align="center"
      style="
          color: darkslategray;
          font-family: 'K2D', sans-serif;
          font-size: 22px;
          margin-top: 50px;
          mx-auto;
        "
    >
      <b-alert v-if="message" show variant="success">{{ message }}</b-alert>
      <b-alert v-if="alert" show variant="danger">{{ alert }}</b-alert>
      <b-row class="mb-3" align-v="center" align-h="end">
        <b-col sm="5">อายุ</b-col>
        <b-col sm="2">
          <b-form-input v-model="value.age" type="number" inline></b-form-input>
        </b-col>
        <b-col sm="5">ปี</b-col>

        <b-col cols="12"><hr class="my-2" /></b-col>

        <b-col sm="5">
          <b-card-text> ระดับน้ำตาลในเลือด </b-card-text>
        </b-col>
        <b-col sm="2">
          <b-form-input
            id="glucose"
            v-model="value.fbs"
            type="number"
            inline
          ></b-form-input>
        </b-col>
        <b-col sm="5"> มิลลิลิตร/เดซิลิตร </b-col>

        <b-col cols="12"><hr class="my-2" /></b-col>

        <b-col sm="5">
          <b-card-text> ความยาวรอบเอว </b-card-text>
        </b-col>
        <b-col sm="2">
          <b-form-input
            id="waist"
            v-model="value.waist"
            type="number"
            inline
          ></b-form-input>
        </b-col>
        <b-col sm="5"> เซนติเมตร </b-col>

        <b-col cols="12"><hr class="my-2" /></b-col>

        <b-col sm="5"> ความดันสูงสุดขณะหัวใจบีบตัว </b-col>
        <b-col sm="2">
          <b-form-input
            id="pressurehigh"
            v-model="value.bpsy"
            type="number"
            inline
          ></b-form-input>
        </b-col>
        <b-col sm="5"> มิลลิเมตร.ปรอท </b-col>

        <b-col cols="12"><hr class="my-2" /></b-col>

        <b-col sm="5"> ความดันต่ำสุดขณะหัวใจคลายตัว </b-col>
        <b-col sm="2">
          <b-form-input
            id="pressureสนไ"
            v-model="value.bpdi"
            type="number"
            inline
          ></b-form-input>
        </b-col>
        <b-col sm="5"> มิลลิเมตร.ปรอท </b-col>

        <b-col cols="12"><hr class="my-2" /></b-col>

        <b-col sm="5">
          <b-card-text> คลอเรสเตอรอลทั้งหมด </b-card-text>
        </b-col>
        <b-col sm="2">
          <b-form-input
            id="chloresterolall"
            v-model="value.tchol"
            type="number"
            inline
          ></b-form-input>
        </b-col>
        <b-col sm="5"> มิลลิกรัม.เดซิลิตร </b-col>

        <b-col cols="12"><hr class="my-2" /></b-col>

        <b-col sm="5"> คลอเรสเตอรอลHDL </b-col>
        <b-col sm="2">
          <b-form-input
            id="hdl"
            v-model="value.hdl"
            type="number"
            inline
          ></b-form-input>
        </b-col>
        <b-col sm="5"> มิลลิกรัม.เดซิลิตร </b-col>
      </b-row>
    </b-card>

    <b-button
      sm="5"
      type="submit"
      size="lg"
      variant="primary"
      align="center"
      style="
        margin-left: 40%;
        margin-top: 30px;
        font-family: 'K2D', sans-serif;
        font-size: 25px;
      "
      @click="submit"
      >ประเมินความเสี่ยง
    </b-button>
  </b-container>
</template>

<script>
export default {
  layout: 'headerguest',
  middlewares: 'notAdmin',
  data() {
    return {
      value: {
        age: 50,
        fbs: 100,
        waist: 70,
        bpsy: 120,
        bpdi: 80,
        tchol: 175,
        hdl: 50,
      },
      message: '',
      alert: '',
    }
  },
  methods: {
    async submit() {
      this.message = null
      this.alert = null
      const res = await this.$axios.post('predict/cad', {
        fbs: this.value.fbs,
        waist: this.value.waist,
        age: this.value.age,
        bpsy: this.value.bpsy,
        bpdi: this.value.bpdi,
        tchol: this.value.tchol,
        hdl: this.value.hdl,
      })
      res.data === 0
        ? (this.message = 'ไม่มีความเสี่ยงจะเป็นโรคหัวใจ')
        : (this.alert = 'มีความเสี่ยงจะเป็นโรคหัวใจ')
    },
  },
}
</script>

<style>
/* import font Kanit */
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
/* import font K2D */
@import url('https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

.b {
  color: darkslategray;
  font-family: 'K2D', sans-serif;
  font-size: 40px;
  text-align: center;
}
</style>
