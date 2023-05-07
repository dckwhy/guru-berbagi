<template>
    <v-list v-if="items">
        <template v-for="(item,i) in items">
            <m-list-group  v-if="item.items" :level="0" :key="i" :item="item"/>
            <m-list-tile  v-else :key="i" :level="0" :item="item"/>
        </template>
    </v-list>
</template>

<script>
import MListGroup from '@/components/MListGroup'
import MListTile from '@/components/MListTile'

export default {
    props : {
        items : {}
    },
    components : {
        MListGroup,
        MListTile
    },
}
</script>

<style>

</style>
