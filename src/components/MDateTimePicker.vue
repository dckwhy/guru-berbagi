<template>
  <v-dialog ref="dialog" v-model="menu" :return-value.sync="date_time" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-bind="$attrs"
        v-on="on"
        :value="value | toDT"
        append-icon="mdi-calendar-month"
        readonly
        outlined
        dense
      ></v-text-field>
    </template>
    <v-card text>
      <v-layout column>
        <span
          v-if="tgl && st==2"
          class="title grey--text text--lighten-2 text-right px-3 pt-2 primary white--text"
        >{{ tgl | toD }} {{waktu}}</span>
        <v-stepper v-model="st" class="elevation-0">
          <v-stepper-items>
            <v-stepper-content step="1" class="pa-0">
              <v-date-picker v-model="tgl" no-title @input="tglSelected" :min="min" :max="max"></v-date-picker>
            </v-stepper-content>
            <v-stepper-content step="2" class="pa-0">
              <v-time-picker v-model="waktu" format="24hr"></v-time-picker>
            </v-stepper-content>
          </v-stepper-items>
          <v-card-actions>
            <template v-if="st==1">
              <v-btn text color="primary" @click="menu = false">Batal</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="tgl" icon text color="primary" @click="st=2">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </template>
            <template v-if="st==2">
              <v-btn icon text color="primary" @click="st=1">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Batal</v-btn>
              <v-btn :disabled="!valid" text color="primary" @click="save">Simpan</v-btn>
            </template>
          </v-card-actions>
        </v-stepper>
      </v-layout>
    </v-card>
    <!-- </v-menu> -->
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import parse from "date-fns/parse";

export default {
  inheritAttrs: false,
  inject: {
    $validator: "$validator"
  },
  props: {
    value: {
      default: null
    },
    label: {
      type: String,
      default: "Date"
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      menu: false,
      tgl: null,
      waktu: null,
      date_time: null,
      st: 1
    };
  },
  methods: {
    tglSelected() {
      this.st = 2;
    },
    save() {
      // this.date_time = new Date(`${this.tgl} ${this.waktu}`);
      this.date_time = `${this.tgl} ${this.waktu}`;
      this.$emit("input", this.date_time);
      this.$refs.dialog.save(this.date_time);
    }
  },
  mounted() {
    this.tgl = null;
    this.waktu = null;

    if (this.value) {
      let d = null;
      if (this.value instanceof Date) {
        d = this.value;
      } else if (this.value instanceof String) {
        d = parse(this.value);
      }

      this.tgl = format(d, "YYYY-DD-MM");
      this.waktu = format(d, "HH:mm");
    }
  },
  computed: {
    valid() {
      return this.tgl && this.waktu;
    }
  },
  watch: {
    menu(n) {
      if (!n) this.st = 1;
    }
  }
};
</script>