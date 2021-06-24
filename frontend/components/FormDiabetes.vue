<template>
  <div>
    <b-form-group
      label-cols-sm="62"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-group
        label="อายุ : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.age" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="ส่วนสูง : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.height" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="น้ำหนัก : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.weight" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="ระดับน้ำตาลในเลือด : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.glucose" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="ความยาวรอบเอว : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.waist" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="ความดันสูงสุดขณะหัวใจบีบตัว : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.pressurehigh" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="คลอเรสเตอรอลทั้งหมด : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.chloresterolall" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="คลอเรสเตอรอล HDL : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.hdl" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="ผลลัพธ์การประเมิน : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input
          :value="transformResult(data.risk_diabetes)"
          readonly
        ></b-form-input>
      </b-form-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: null },
  },
  methods: {
    transformResult(data) {
      let result = ''
      if (data === 0) {
        result = 'ไม่มีความเสียง'
      }
      if (data === 1) {
        result = 'มีความเสียง'
      }
      return result
    },
  },
}
</script>

<style scoped></style>
