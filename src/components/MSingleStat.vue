<template>
    <v-card height="150">
        <v-toolbar color="transparent" text dense card>
            <v-toolbar-title>
                <h4 class="font-weight-light">{{title}}</h4>
            </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fill-height>
            <v-layout wrap>
                <v-flex>
                    <h1 class="headline font-weight-black primary--text text-md-center pb-2">{{statValue}}</h1>
                    <div v-if="statPrefix" class="font-weight-light text-md-right">
                        {{statPrefix}}
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>

export default {
    props : {
        statValue : {
            default : '300.000',
        },
        statColor : {
            default : 'headline mb-0 primary--text',
        },
        statPrefix : {
            default : false,
        },
        title : {
            default : '',
        },
        statLegendColor : {
            default : 'black--text',
        },
    }
}
</script>

