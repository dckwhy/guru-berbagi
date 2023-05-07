<template>
    <MWidget ext :title="title">
        <v-layout wrap v-slot:action>
            <v-flex xs12>
                <v-select
                dense
                chips
                deletable-chips
                multiple
                v-model="selected_layer"
                :items="layers"
                item-value="code"
                item-text="title"
                label="Layer"
                >
                <template
                    v-slot:selection
                    v-slot="{item,index}"
                >
                    <v-chip v-if="index === 0">
                        <span>{{ item.title }}</span>
                    </v-chip>
                    <span v-if="index === 1"
                        class="grey--text caption"
                    >
                        (+{{ selected_layer.length - 1 }} others)
                    </span>

                    </template>                
                
                </v-select>                  
            </v-flex>
        </v-layout>
        <v-card text :height="height" id="map" tabindex="1">
        </v-card>
        <span class="ml-2 mt-3 caption grey--text text--lighten-1">Klik peta di atas lalu scroll dengan mouse untuk zoom</span>
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content">
                <v-layout class="mt-2" column v-for="(f,index) in features" :key="index" 
                    style="max-height:180px;overflow-y:auto;overflow-x: hidden;">
                    <template v-for="l in Object.keys(f.properties)">
                        <m-labelval  :key="l" :label="l" :val="f.properties[l]"/>
                    </template>
                </v-layout>
            </div>
        </div>            
    </MWidget>
</template>

<style>
      .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        min-width: 480px;
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }
</style>

<script>
import {Map, View, Overlay} from 'ol'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
// import XYZ from 'ol/source/XYZ';
import {MAP_SERVER} from '@/const'
import {defaults as defaultInteractions} from 'ol/interaction.js';

import MWidget from '@/components/MWidget'
export default {
    props : {
        height : {
            default : 400
        },
        info : {
            type : Boolean,
            default : false,
        },
        title : {
            default : 'DASHBOARD PERENCANAAN RESTORASI BRG',
        }
    },
    components : {
        MWidget
    },
    data(){
        return {
            map : null,
            layers: [
                { obj:null, code: 'brg:batas_provinsi' , title : 'Batas Wilayah'},
                { obj:null, code: 'brg:rtt-revegetasi', title : 'Revegetasi'},                
                { obj:null, code: 'brg:rtt-sekat_kanal', title : 'Sekat Kanal'},
                { obj:null, code: 'brg:rtt-revitalisasi', title : 'Revitalisasi'},
                { obj:null, code: 'brg:rtt-sumur_bor' , title : 'Sumur Bor'},
            ],
            overlay : null,
            features : [],
            selected_layer : []
        }
    },
    created(){
        this.selected_layer = this.layers.map(l=>l.code)
    },
    mounted(){
        var container = document.getElementById('popup');
        // var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');        
        closer.onclick=()=>{
            this.overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
        this.overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        let ll = this.layers.map(l=>{
            l.obj =  new TileLayer({
                source: new TileWMS({
                    url : MAP_SERVER,
                    params : {
                        'FORMAT': 'image/png', 
                        'VERSION': '1.1.1',
                        tiled: true,
                        "LAYERS": l.code,
                        "exceptions": 'application/vnd.ogc.se_inimage',
                    }
                })
            })
            return l.obj
        })

        this.map = new Map({
            interactions: defaultInteractions({
                constrainResolution: true, onFocusOnly: true
            }),               
            target: 'map',
            layers: ll,
            overlays: [this.overlay],
            view: new View({
                // projection: "EPSG:3857",
                projection : "EPSG:4326",
                // center : transform([-2.0723357,113.5130651],"EPSG:4326","EPSG:3857"),
                center : [117.5130651,-3.0723357],
                // zoom: 4.67
            })
        });        
        // this.map.getView().on('change:resolution', (evt)=>{
            // var resolution = evt.target.get('resolution');
            // var units = map.getView().getProjection().getUnits();
            // var dpi = 25.4 / 0.28;
            // var mpu = ol.proj.METERS_PER_UNIT[units];
            // var scale = resolution * mpu * 39.37 * dpi;
            // if (scale >= 9500 && scale <= 950000) {
            // scale = Math.round(scale / 1000) + "K";
            // } else if (scale >= 950000) {
            // scale = Math.round(scale / 1000000) + "M";
            // } else {
            // scale = Math.round(scale);
            // }
            // document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
        // });
        var bounds = [94.97266300000007, -11.00761499999993,
                141.02004178900006, 6.0769400000000875];        
        this.map.getView().fit(bounds, this.map.getSize())
        window.overlays = this.overlay
        // eslint-disable-next-line
        this.map.on('singleclick', (evt)=>{
            this.overlay.setPosition(undefined)

            if (!this.info)
                return            

            let coordinate = evt.coordinate
            this.features = []
            var viewResolution = /** @type {number} */ (this.map.getView().getResolution())
            // get feature dari layer paling atas
            // break jika sudah ada feature
            this.layers.reverse().reduce((p, l)=>p.then(()=>{
                    // jiks hidden, just resolve
                    if (!l.obj.getVisible())
                        return Promise.resolve()

                    if (this.features.length>0){
                        this.overlay.setPosition(coordinate)
                        return Promise.resolve()
                    }
                    var url = l.obj.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326',
                        {'INFO_FORMAT': 'application/json'}
                    );
                    if (url) {
                        // get info using fetch, karena error waktu menggunakan axios
                        return fetch(url)
                        .then(r=>r.json())
                        .then(o=>{
                            // baca geojson
                            this.features = o.features
                        }).catch(e=>{
                            let {message='Gagal mendapatkan info'} = e
                            this.$error(message)
                            // return as resolve
                            return Promise.resolve()
                        })
                    }
                    else
                        return Promise.resolve()
            }), Promise.resolve())
        });        
    },
    watch:{
        selected_layer(){
            //update layer
            this.layers.forEach(layer => {
                if (this.selected_layer.indexOf(layer.code)>=0){
                    layer.obj.setVisible(true)                    
                }
                else
                    layer.obj.setVisible(false)
            });
        }
    }
}
</script>

<style>

</style>
