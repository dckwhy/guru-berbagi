<template>
    <v-subheader v-if="item.subheader && !item.hidden">
        {{ item.title }}
    </v-subheader>
    <v-list-item v-else-if="!item.subheader && !item.hidden" :to="item.to ? item.to : null" exact>
        <v-list-item-action v-if="level==0">
            <v-icon :small="item.small" v-html="item.icon"></v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="level>0">
            <v-icon :small="item.small" v-html="item.icon"></v-icon>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name : 'm-list-tile',
    props : {
        item : {
            type : Object,
        },
        level : {
            type : Number,
        }
    },
}
</script>

<style>

</style>
