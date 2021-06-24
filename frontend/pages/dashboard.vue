<template>
  <div>
    <b-container class="my-5">
      <b-row style="font-family: 'K2D', sans-serif">
        <b-col cols="12">
          <h1 style="color: darkslategray">แดชบอร์ด</h1>
          <hr class="mt-3 mb-5" />
        </b-col>
        <b-col cols="12" sm="5" align-self="end">
          <label for="example-datepicker">จากวันที่</label>
          <b-form-datepicker
            id="date-from"
            v-model="dateFrom"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
        <b-col cols="12" sm="5" align-self="end">
          <label for="example-datepicker">ถึงวันที่</label>
          <b-form-datepicker
            id="date-to"
            v-model="dateTo"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
        <b-col cols="12" sm="2" align-self="end">
          <b-button variant="primary" class="mb-2" block @click="fetchStats">
            บันทึก
          </b-button>
        </b-col>
        <b-col cols="12">
          <b-card class="my-3">
            <AdminChart :items="data" />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// export default {
//   middleware: ['admin'],
//   async asyncData({ $axios }) {
//     const currentDate = new Date()
//     const formDate =
//       currentDate.getFullYear() +
//       '-' +
//       (currentDate.getMonth() + 1) +
//       '-' +
//       (currentDate.getDate() - 7)
//     const toDate =
//       currentDate.getFullYear() +
//       '-' +
//       (currentDate.getMonth() + 1) +
//       '-' +
//       currentDate.getDate()

//     const data = await $axios.$post(API_URL.ACTIVITY_STATS_YEAR, {
//       date_from: formDate,
//       date_to: toDate,
//     })
//     console.log('asyncData => ', data)
//     return { data }
//   },
//   data() {
//     return {
//       dateFrom: null,
//       dateTo: null,
//       data: null,
//     }
//   },
//   methods: {
//     async fetchStats() {
//       this.data = await this.$axios.$post(API_URL.ACTIVITY_STATS_YEAR, {
//         date_from: this.dateFrom,
//         date_to: this.dateTo,
//       })
//     },
//   },
// }
</script>
