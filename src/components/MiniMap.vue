<template>
    <v-layout wrap>
        <v-flex md12>
            <v-card color="secondary" tile>
                <v-card-text>{{title}}</v-card-text>
            </v-card>
            <v-card id="map" tabindex="1">
            </v-card>
        </v-flex>
    </v-layout>
</template>

<style>
</style>

<script>
import {Map, View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import OSM from 'ol/source/OSM'
import {defaults as defaultInteractions} from 'ol/interaction.js';
// import {fromLonLat} from 'ol/proj';
// import {transformExtent} from 'ol/proj'
import {MAP_SERVER} from '@/const'

export default {
    props : {
        title : {
            default : 'LOKASI KEGIATAN',
        },
        doc : {
            type: Object,
            default : null,
            map : null,
        },
        phu : {
            type: Object,
            default : null,
        },
        pRef : {
            default : '',
        }
    },
    mounted(){
        var base = new TileLayer({
            source: new OSM()
        });

        var LayerInfo;
        
        switch (this.pRef) {
            case "bor":
                LayerInfo = {
                    'layer' : 'brg:rtt-sumur_bor',
                    'filter' : 'kode_sbo=\''+ this.doc.code + '\''
                };
                break;
            case "skanal":
                LayerInfo = {
                    'layer' : 'brg:rtt-sekat_kanal',
                    'filter' : 'kode_kse=\''+ this.doc.code + '\''
                };
                break;
            case "pkanal":
                LayerInfo = {
                    'layer' : 'brg:rtt-kanal_timbun',
                    'filter' : 'kode_penim=\''+ this.doc.code + '\''
                };
                break;
            case "revegetasi":
                LayerInfo = {
                    'layer' : 'brg:rtt-revegetasi',
                    'filter' : 'kode_reveg=\''+ this.doc.code + '\''
                };
                break;
            case "embung":
                LayerInfo = {
                    'layer' : 'brg:rtt-embung',
                    'filter' : 'kode_embun=\''+ this.doc.code + '\''
                };
                break;
            case "revitalisasi":
                LayerInfo = {
                    'layer' : 'brg:rtt-revitalisasi',
                    'filter' : 'kode_revit=\''+ this.doc.code + '\''
                };
                break;
            default:
                LayerInfo = {'layer' : '', 'filter' : ''}
        }

        var base2 = new TileLayer({
            source: new TileWMS({
                url : MAP_SERVER,
                params : {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    'LAYERS': 'brg:sasaran_provinsi,brg:batas_khg',
                    'exceptions': 'application/vnd.ogc.se_inimage',
                    CQL_FILTER : `WA='${this.doc.administrativeArea.province.longName.toUpperCase()}';
                        KODE_KHG='${this.phu.code}'`
                }
            })
        });
        var overlay = new TileLayer({
            source: new TileWMS({
                url : MAP_SERVER,
                params : {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    'LAYERS': LayerInfo['layer'],
                    'exceptions': 'application/vnd.ogc.se_inimage',
                    'STYLES': 'dev_style_point',
                    CQL_FILTER : LayerInfo['filter']
                }
            })
        });

        // perlu dipisahkan ke const ? pindahin aja
            var Center = {
            'Jambi' : [102.72691, -1.69877],
            'Kalteng' : [113.41842, -1.60586],
            'Papua' : [138.69597, -4.66432],
            'Riau' : [101.81344, 0.50903],
            'Sumsel' : [104.16792, -3.21838],
            'Kalsel' : [115.43864, -3.00846],
            'Kalbar' : [111.12116, -0.08705],
        }

        this.map = new Map({
            interactions: defaultInteractions({
                constrainResolution: true, 
                onFocusOnly: true
            }),
            layers: [base, base2, overlay],
            target: 'map',
            view: new View({
                projection: 'EPSG:4326',
                center: Center[this.doc.administrativeArea.province.shortName] || [117.29476,-2.23473],
                zoom: 6.5,
                minZoom: 4.5, // Zoom out max
                // maxZoom: 6.5, // Zoom in max
            })
        });

    }
}
</script>
