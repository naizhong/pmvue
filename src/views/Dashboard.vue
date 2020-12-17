<template>
    <v-container>
        <v-row>
            <v-col cols="4">
            </v-col>
            <v-col clls="8">
                <v-row>
                    <v-data-table
                        :headers="posHeaders"
                        :items="positions"
                        class="elevation-1"
                        dense
                    >
                    </v-data-table>
                </v-row>
                <v-row>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapMultiRowFields } from 'vuex-map-fields';

export default {
    name: 'Dashboard',

    data(){
        return {
            posHeaders :[
                {text:'Stock', value:'stock'},
                {text:'Open', value:'openprice'},
                {text:'Quantity', value:'quantity'},
            ],
        }
    },

    created(){
        this.$store
            .dispatch('populatePositions');
        this.$store
            .dispatch('populatePortfolios')
    },
    
    methods:{

    },

    computed:{
        ...mapMultiRowFields(['positions'])
    },
}
</script>