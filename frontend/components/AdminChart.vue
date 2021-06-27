<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    items: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chartData: {
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        labels: {
          fontSize: 15,
          fontFamily: 'K2D',
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
          ],
        },
      },
    }
  },
  watch: {
    items(val) {
      this.chartData.datasets = []
      this.updateChart(val)
      this.renderChart(this.chartData, this.options)
    },
  },
  mounted() {
    this.init(this.items)
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    updateChart(data) {
      this.chartData.datasets.push({
        label: 'เบาหวาน',
        data: this.items.predictdb,
        fill: false,
        borderColor: '#EF4444',
      })
      this.chartData.datasets.push({
        label: 'โรคหัวใจ',
        data: this.items.predictcad,
        fill: false,
        borderColor: '#EC4899',
      })
      this.chartData.datasets.push({
        label: 'สมัครสมาชิก',
        data: this.items.register,
        fill: false,
        borderColor: '#34D399',
      })
      this.chartData.datasets.push({
        label: 'เล่นเกม',
        data: this.items.quiz,
        fill: false,
        borderColor: '#3B82F6',
      })
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
              },
            },
          ],
        },
      }
    },
    init() {
      this.chartData.datasets.push({
        label: 'ประเมินเบาหวานเบาหวาน',
        data: this.items.predictdb,
        fill: false,
        borderColor: '#EF4444',
      })
      this.chartData.datasets.push({
        label: 'ประเมินโรคหัวใจ',
        data: this.items.predictcad,
        fill: false,
        borderColor: '#EC4899',
      })
      this.chartData.datasets.push({
        label: 'สมัครสมาชิก',
        data: this.items.register,
        fill: false,
        borderColor: '#34D399',
      })
      this.chartData.datasets.push({
        label: 'เล่นเกม',
        data: this.items.quiz,
        fill: false,
        borderColor: '#3B82F6',
      })
    },
  },
}
</script>
