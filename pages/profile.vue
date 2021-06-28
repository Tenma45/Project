<template>
  <div>
    <b-container class="my-5">
      <b-row>
        <b-col cols="12">
          <h1 class="a1">โปรไฟล์ของคุณ</h1>
          <hr class="my-4" />
        </b-col>
        <b-col cols="12" class="secondary-font my-2">
          <b-card class="a2">
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
                <b-form-input :value="$auth.user.email" readonly></b-form-input>
              </b-form-group>

              <b-form-group
                label="ชื่อ : "
                label-for="first-name"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  :value="$auth.user.FirstName"
                  readonly
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="นามสกุล : "
                label-for="last-name"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  :value="$auth.user.LastName"
                  readonly
                ></b-form-input>
              </b-form-group>
            </b-form-group>
          </b-card>
        </b-col>
        <b-col cols="12" class="text-right my-2">
          <b-button
            to="/editprofile"
            variant="danger"
            style="font-family: 'K2D', sans-serif"
          >
            แก้ไขโปรไฟล์
          </b-button>
          <b-button
            to="/changepass"
            variant="success"
            style="font-family: 'K2D', sans-serif"
          >
            เปลี่ยนรหัสผ่าน
          </b-button>
        </b-col>
        <b-col cols="12">
          <CalendarHistory
            class="my-2"
            :diabetes="diabetes.result"
            :heart="heart.result"
          />
        </b-col>
        <b-col cols="12" class="my-2">
          <b-card
            title="ประวัติการตรวจโรคเบาหวาน"
            style="font-family: 'K2D', sans-serif; text-align: center"
          >
            <DiabetesChart :data="diabetes.result" />
            <b-row class="my-3">
              <b-col cols="12" sm="12" md="5" align-self="end">
                <label for="diabetes-date-from-datepicker">จากวันที่</label>
                <b-form-datepicker
                  id="diabetes-date-from"
                  v-model="diabetes.dateFrom"
                  class="mb-2"
                ></b-form-datepicker>
              </b-col>
              <b-col cols="12" sm="12" md="5" align-self="end">
                <label for="diabetes-date-to-datepicker">ถึงวันที่</label>
                <b-form-datepicker
                  id="diabetes-date-to"
                  v-model="diabetes.dateTo"
                  class="mb-2"
                ></b-form-datepicker>
              </b-col>
              <b-col cols="12" sm="12" md="2" align-self="end">
                <b-button
                  variant="primary"
                  class="mb-2"
                  block
                  @click="fetchStats('diabetes')"
                >
                  บันทึก
                </b-button>
              </b-col>
            </b-row>
            <b-card-text>
              <b-table
                :items="diabetes.result"
                :fields="diabetesFields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                stacked="md"
                show-empty
                responsive
                small
              >
                <template #cell(risk_db)="data">
                  {{ transformResult(data.item.risk_db) }}
                </template>
                <template #cell(created_at)="data">
                  {{ $moment(data.item.created_at).format('lll') }}
                </template>
              </b-table>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col cols="12" class="my-2">
          <b-card
            title="ประวัติการตรวจโรคหัวใจ"
            style="font-family: 'K2D', sans-serif; text-align: center"
          >
            <HeartChart :data="heart.result" />
            <b-row class="my-3">
              <b-col cols="12" md="5">
                <label for="heart-date-from-datepicker">จากวันที่</label>
                <b-form-datepicker
                  id="heart-date-from"
                  v-model="heart.dateFrom"
                  class="mb-2"
                ></b-form-datepicker>
              </b-col>
              <b-col cols="12" md="5">
                <label for="heart-date-to-datepicker">ถึงวันที่</label>
                <b-form-datepicker
                  id="heart-date-to"
                  v-model="heart.dateTo"
                  class="mb-2"
                ></b-form-datepicker>
              </b-col>
              <b-col cols="12" md="2" align-self="end">
                <b-button
                  variant="primary"
                  class="mb-2"
                  block
                  @click="fetchStats('heart')"
                >
                  บันทึก
                </b-button>
              </b-col>
            </b-row>
            <b-card-text>
              <b-table
                :items="heart.result"
                :fields="heartFields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                stacked="md"
                show-empty
                small
                responsive
              >
                <template #cell(risk_cad)="data">
                  {{ transformResult(data.item.risk_cad) }}
                </template>
                <template #cell(created_at)="data">
                  {{ $moment(data.item.created_at).format('lll') }}
                </template>
              </b-table>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'headerguest',
  middleware: ['auth', 'notAdmin'],
  data() {
    return {
      sortBy: 'created_at',
      sortDesc: true,
      sortDirection: 'asc',

      diabetesFields: [
        { key: 'height', label: 'ส่วนสูง', sortable: true },
        { key: 'weight', label: 'น้ำหนัก', sortable: true },
        { key: 'waist', label: 'ความยาวรอบเอว', sortable: true },
        { key: 'fbs', label: 'ระดับน้ำตาลในเลือด', sortable: true },
        {
          key: 'bpsy',
          label: 'ความดันสูงสุดขณะหัวใจบีบตัว',
          sortable: true,
        },
        {
          key: 'tchol',
          label: 'คลอเรสเตอรอลทั้งหมด',
          sortable: true,
        },
        { key: 'hdl', label: 'คลอเรสเตอรอล HDL', sortable: true },
        { key: 'risk_db', label: 'ผลลัพธ์', sortable: true },
        { key: 'created_at', label: 'วันที่กรอกข้อมูล', sortable: true },
      ],

      heartFields: [
        { key: 'waist', label: 'ความยาวรอบเอว', sortable: true },
        { key: 'fbs', label: 'ระดับน้ำตาลในเลือด', sortable: true },
        {
          key: 'bpsy',
          label: 'ความดันสูงสุดขณะหัวใจบีบตัว',
          sortable: true,
        },
        {
          key: 'bpdi',
          label: 'ความดันต่ำสุดขณะหัวใจคลายตัว',
          sortable: true,
        },
        {
          key: 'tchol',
          label: 'คลอเรสเตอรอลทั้งหมด',
          sortable: true,
        },
        { key: 'hdl', label: 'คลอเรสเตอรอล HDL', sortable: true },
        { key: 'risk_cad', label: 'ผลลัพธ์', sortable: true },
        { key: 'created_at', label: 'วันที่กรอกข้อมูล', sortable: true },
      ],
      diabetes: {
        dateFrom: null,
        dateTo: null,
        result: [],
      },
      heart: {
        dateFrom: null,
        dateTo: null,
        result: [],
      },
    }
  },
  mounted() {
    if (this.$auth.user?.role?.type === 'admin') {
      this.$router.push('/admin/dashboard')
    }
    this.start()
    this.fetchStats('diabetes')
    this.fetchStats('heart')
  },
  methods: {
    start() {
      const currentDate = new Date()
      const fromDate =
        currentDate.getFullYear() +
        '-' +
        currentDate.getMonth().toString().padStart(2, '0') +
        '-' +
        currentDate.getDate()
      const toDate =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        currentDate.getDate()

      this.diabetes.dateFrom = fromDate
      this.diabetes.dateTo = toDate
      this.heart.dateFrom = fromDate
      this.heart.dateTo = toDate
    },
    transformResult(data) {
      let result = ''
      if (data === false) {
        result = 'ไม่มีความเสี่ยง'
      }
      if (data === true) {
        result = 'มีความเสี่ยง'
      }
      return result
    },
    async fetchStats(type) {
      if (type === 'diabetes') {
        this.diabetes.result = await this.$axios.$post(
          'resultdiabetes/findid',
          {
            date_from: `${this.diabetes.dateFrom} 00:00:00`,
            date_to: `${this.diabetes.dateTo} 23:59:59`,
          }
        )
      }
      if (type === 'heart') {
        this.heart.result = await this.$axios.$post('resultcad/findid', {
          date_from: `${this.heart.dateFrom} 00:00:00`,
          date_to: `${this.heart.dateTo} 23:59:59`,
        })
      }
    },
  },
}
</script>

<style scoped>
.a1 {
  color: darkslategray;
  font-family: 'K2D', sans-serif;
  font-size: 40px;
}

.a2 {
  color: black;
  font-family: 'K2D', sans-serif;
  font-size: 20px;
}
</style>
