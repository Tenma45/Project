<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <div class="mx-auto">
            <b-calendar
              v-model="calendar.value"
              block
              locale="th-th"
              :date-info-fn="dateClass"
              @context="onContext"
            ></b-calendar>
          </div>
        </b-col>
        <b-col
          cols="12"
          md="6"
          lg="8"
          class="mt-3 mt-md-0"
          style="font-family: 'K2D', sans-serif"
        >
          <div class="mb-3">
            <h4>ประวัติการตรวจโรคเบาหวาน</h4>
            <b-table
              v-if="table.itemsDiabete"
              striped
              hover
              :items="table.itemsDiabete"
              :fields="table.fields"
              small
            >
              <template #cell(created_at)="data">
                {{ $moment(data.item.created_at).format('lll') }}
              </template>
              <template #cell(actions)="row">
                <b-button
                  size="sm"
                  class="mr-1"
                  @click="onDiabetesModal(row.item, row.index, $event.target)"
                >
                  รายละเอียด
                </b-button>
              </template>
            </b-table>
          </div>
          <hr class="my-3" />
          <div class="mb-3">
            <h4>ประวัติการตรวจโรคหัวใจ</h4>
            <b-table
              v-if="table.itemsHeart"
              striped
              hover
              :items="table.itemsHeart"
              :fields="table.fields"
              small
            >
              <template #cell(created_at)="data">
                {{ $moment(data.item.created_at).format('lll') }}
              </template>

              <template #cell(actions)="row">
                <b-button
                  size="sm"
                  class="mr-1"
                  @click="onHeartModal(row.item, row.index, $event.target)"
                >
                  รายละเอียด
                </b-button>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      :id="infoHeartModal.id"
      :title="infoHeartModal.title"
      ok-only
      @hide="resetInfoModal('heart')"
    >
      <FormHeart :data="infoHeartModal.data" />
    </b-modal>
    <b-modal
      :id="infoDiabetesModal.id"
      :title="infoDiabetesModal.title"
      ok-only
      @hide="resetInfoModal('diabetes')"
    >
      <FormDiabetes :data="infoDiabetesModal.data" />
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    diabetes: { type: Array, default: null },
    heart: { type: Array, default: null },
  },
  data() {
    return {
      table: {
        itemsDiabete: [],
        itemsHeart: [],
        fields: [
          { key: 'created_at', label: 'วันที่กรอกข้อมูล' },
          { key: 'actions', label: '' },
        ],
      },
      calendar: {
        value: '',
        context: null,
        attributes: [{ key: 'today', highlight: true, dates: new Date() }],
      },
      infoDiabetesModal: {
        id: 'info-diabetes-modal',
        title: '',
        content: '',
        data: [],
      },
      infoHeartModal: {
        id: 'info-heart-modal',
        title: '',
        content: '',
        data: [],
      },
    }
  },
  computed: {
    value() {
      return this.calendar.value
    },
  },
  watch: {
    value(val) {
      this.fetchDiabete(val)
    },
    deep: true,
  },
  mounted() {},
  methods: {
    onContext(ctx) {
      this.calendar.context = ctx
    },
    onDiabetesModal(item, index, button) {
      this.infoDiabetesModal.title = `รายละเอียดการประเมิน: ${moment(
        item.created_at
      ).format('lll')}`
      this.infoDiabetesModal.data = item
      this.$root.$emit('bv::show::modal', this.infoDiabetesModal.id, button)
    },
    onHeartModal(item, index, button) {
      this.infoHeartModal.title = `รายละเอียดการประเมิน: ${moment(
        item.created_at
      ).format('lll')}`
      this.infoHeartModal.data = item
      this.$root.$emit('bv::show::modal', this.infoHeartModal.id, button)
    },
    resetInfoModal(type) {
      if (type === 'diabetes') {
        this.infoDiabetesModal.title = ''
        this.infoDiabetesModal.content = ''
      }
      if (type === 'heart') {
        this.infoHeartModal.title = ''
        this.infoHeartModal.content = ''
      }
    },
    dateClass(ymd, date) {
      let classText = ''
      this.diabetes.forEach((element) => {
        if (ymd === this.formatDate(element.created_at)) {
          classText = 'table-success'
        }
      })
      this.heart.forEach((element) => {
        if (ymd === this.formatDate(element.created_at)) {
          classText = 'table-primary'
        }
      })
      return classText
    },
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    },
    async fetchDiabete(date) {
      this.table.itemsDiabete = await this.$axios.$post('db/findid/', {
        date_from: `${date} 00:00:00`,
        date_to: `${date} 23:59:59`,
      })
      this.table.itemsHeart = await this.$axios.$post('cad/findid', {
        date_from: `${date} 00:00:00`,
        date_to: `${date} 23:59:59`,
      })
    },
  },
}
</script>

<style scoped></style>
