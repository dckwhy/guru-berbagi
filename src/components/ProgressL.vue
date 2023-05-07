<template>
    <div v-if="loading" class="top-progress">
        <v-progress-linear
            indeterminate
            color="primary lighten-3"
            class="ma-0"
            height="5"
            style="position:fixed"
        ></v-progress-linear>        
    </div>
</template>

<script>
export default {
    props : {
        loading : {
            type : Boolean
        }
    }
}
</script>

<style>
    .top-progress {
        z-index: 4;     
    }
</style>
