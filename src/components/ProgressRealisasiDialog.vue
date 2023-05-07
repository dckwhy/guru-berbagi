<template>
    <v-menu offset-y v-model="menu" left :close-on-content-click="false" 
        content-class="ra-2">
        <template v-slot:activator="{ on }">
        <v-btn small text icon color="primary" v-on="on">
            <v-icon small>edit</v-icon>
        </v-btn>
        </template>
        <v-card width="300" v-if="progress">
            <v-card-title primary-title class="mb-0 pb-0">
                <span class="title">Progress - {{progress.periodStr}}</span>
            </v-card-title>
            <v-card-text class="px-3">
                <v-layout column class="px-1">
                    <span class="grey--text">Fisik</span>
                    <v-slider
                        class="mt-0"
                        hide-details
                        v-model="progress.physicalPct"
                        :label="`${progress.physicalPct}%`"
                        inverse-label
                    ></v-slider>
                    <span class="grey--text">Keuangan</span>
                    <v-slider
                        class="mt-0"
                        hide-details
                        v-model="progress.costPct"
                        :label="`${progress.costPct}%`"
                        inverse-label
                    ></v-slider>
                    <v-flex xs12>
                        <v-text-field
                            type="number"
                            label="Nominal Keuangan (Rp.)"
                            v-model="progress.cost"
                        ></v-text-field>                        
                    </v-flex>

                </v-layout>
            </v-card-text>
            <v-card-actions class="rb-2">
                <v-btn text @click="menu=false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    props:{
        item:{
            type: Object,
        },
        module:{
            type: String,
            default: '',
        },        
    },
    mounted(){
        this.progress = {...this.item}
    },
    data(){
        return {
            menu: false,
            progress: null,
        }
    },
    methods:{
        save(){
            this.$store.dispatch(`${this.module}/implementasi/implProgress`, this.progress)
            .then(()=>{
                // set manual saja, 
                this.item.physicalPct = parseFloat(this.progress.physicalPct)
                this.item.costPct = parseFloat(this.progress.costPct)
                this.item.cost = parseInt(this.progress.cost)
                this.item.remark = this.progress.remark

                this.menu = false
                this.$success('Progress berhasil disimpan');
            })
            .catch(e=>e)          
        }
    },
    watch:{
        item(val){
            this.progress = val ? {...val} : null
        }
    }
}
</script>

<style>

</style>
