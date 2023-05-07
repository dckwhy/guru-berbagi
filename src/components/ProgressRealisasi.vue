<template>
    <v-layout wrap="">
        <v-flex md12>
            <v-data-table :headers="progressHeader" 
            :items="list_progress"
            :rows-per-page-items="rowPerPage">
                <template v-slot:no-data>
                    <div class="text-md-center">Tidak ada data. Tentukan <span class="font-weight-medium red--text">WAKTU PELAKSANAAN</span> terlebih dahulu</div>
                </template>
                <template v-items v-slot="progressData">
                    <td class="text-right">ke-{{progressData.index}}</td>
                    <td class="text-left">{{ progressData.item.periodStr }}</td>
                    <td class="text-right">
                        {{ progressData.item.physicalPct }} 
                    </td>
                    <td class="text-right">
                        {{ progressData.item.cost | toC }}
                    </td>
                    <td class="text-right">
                        {{ progressData.item.costPct }}
                    </td>
                    <td>
                        <ProgressDlg 
                            :item="progressData.item"
                            :module="module"
                        />
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
import { addM, monthBetween, toYM, toMMY } from '@/tools'
import ProgressDlg from '@/components/ProgressRealisasiDialog'

export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
        module: {
            type: String,
            default: '',
        }        
    },
    components: {
        ProgressDlg,
    },
    data() {
        return {
            list_progress: [],
            implProgressObj: {},
            progressHeader: [
                { text: '', width:'100', align: 'left', sortable: false, value: 'periodsCount' },
                { text: 'Progres Bulan', align: 'left', sortable: false, value: 'periods' },
                { text: 'Fisik (%)', width:'200', align: 'right', sortable: false, value: 'progressPhysical' },
                { text: 'Keuangan (Rp)', width:'200', align: 'right', sortable: false, value: 'progressCost' },
                { text: 'Keuangan (%)', width:'200', align: 'right', sortable: false, value: 'progressCostPct' },
                { text: '#', width:'10', align: 'center', sortable: false }
            ],
            rowPerPage: [ 10, 5, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        }
    },
    mounted() {
        this.buildListProgress()
    },
    methods: {
        buildListProgress() {
            if (!this.periode) {
                this.list_progress = []
            }
            else {
                this.implProgressObj = {}
                if (this.item.implProgress) {
                    this.item.implProgress.map(i => {
                        this.implProgressObj[`${i.periods}`] = i
                    })
                }
                this.list_progress = []
                let s = this.item.detailActivity.startDate
                let c = monthBetween(this.item.detailActivity.startDate, this.item.detailActivity.endDate)
                for (let index = 0; index < c; index++) {
                    let o = this.implProgressObj[toYM(s)]
                    this.list_progress.push(
                        {
                            implId: this.item.detailActivity.id,
                            periods: toYM(s),
                            periodStr: toMMY(s),
                            physicalPct: o ? parseFloat(o.physicalPct) : 0,
                            costPct: o ? parseFloat(o.costPct) : 0,
                            cost: o ? parseInt(o.cost) : 0,
                            remark: o ? o.remark || '-' : '-',
                        }
                    )
                    s = addM(s, 1)
                }
            }
        }
    },
    computed: {
        periode() {
            if (!this.item || !this.item.detailActivity.startDate || !this.item.detailActivity.endDate || this.item.detailActivity.endDate < this.item.detailActivity.startDate)
                return ''
            return `${this.item.detailActivity.startDate}-${this.item.detailActivity.endDate}`
        },
    },
    watch: {
        item() {
            this.buildListProgress()
        },
        periode() {
            this.buildListProgress()
        }
    }
}
</script>

<style>
</style>
