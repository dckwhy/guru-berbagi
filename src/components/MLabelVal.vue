<template>
    <v-layout row align-baseline>
        <v-flex lg3 md4 sm5 xs5>
            <strong>{{label}}</strong>
        </v-flex>        
        <v-flex lg9 md8 sm7 xs7>
            <slot name="val">
            {{val}}
            </slot>
        </v-flex>
    </v-layout>    
</template>

<script>
export default {
    name: 'm-labelval',
    props : {
        label : {},
        val : {}
    }
}
</script>

<style>

</style>
