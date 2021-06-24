<template>
  <div style="font-family: 'K2D', sans-serif">
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
        label="ระดับน้ำตาลในเลือด : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.fbs" readonly></b-form-input>
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
        <b-form-input :value="data.bpsy" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="ความดันต่ำสุดขณะหัวใจคลายตัว : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.bpdi" readonly></b-form-input>
      </b-form-group>
      <b-form-group
        label="คลอเรสเตอรอลทั้งหมด : "
        label-for="email"
        label-cols-sm="6"
        label-align-sm="right"
      >
        <b-form-input :value="data.tchol" readonly></b-form-input>
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
          :value="transformResult(data.risk_cad)"
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
      if (!data) {
        result = 'ไม่มีความเสี่ยง'
      } else {
        result = 'มีความเสี่ยง'
      }
      return result
    },
  },
}
</script>

<style scoped></style>
