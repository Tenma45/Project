<template>
  <div>
    <b-container class="my-5">
      <b-row style="font-family: 'K2D', sans-serif">
        <b-col cols="12">
          <h1 style="color: darkslategray">อัพเดตโมเดล</h1>
          <hr class="mt-3 mb-5" />
        </b-col>
        <b-col cols="12">
          <b-card>
            <b-alert v-if="massage" show variant="success">
              {{ massage }}
            </b-alert>
            <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>
            <b-form-group
              style="font-size: 20px"
              label="โมเดลตรวจโรคเบาหวานและโรคหัวใจ"
              label-cols-sm="4"
            >
              <b-form-file
                v-model="file"
                accept=".csv"
                placeholder="กดที่ปุ่ม 'ค้นหา' เพื่อเลือกไฟล์"
                browse-text="ค้นหา"
                class="mb-4"
              ></b-form-file>
            </b-form-group>
            <b-button variant="warning" @click="file = null">รีเซ็ต</b-button>
            <b-button variant="primary" class="ml-2" @click="submit"
              >อัพเดต</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'headerguest',
  data() {
    return {
      file: null,
    }
  },
}
</script>
