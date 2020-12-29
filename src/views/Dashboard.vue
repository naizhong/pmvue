<template>
<div>
    <v-container>
        <v-row>
            <v-col cols="4">
            </v-col>
            <v-col clls="8">
                <v-row>
                    <v-data-table
                        :headers="posHeaders"
                        :items="$store.state.positions"
                        class="elevation-1"
                        dense
                    >
                    <template v-slot:top>
                        <v-row>
                            <v-col cols=8>
                                <v-combobox
                                    v-model='$store.state.portfolioName'
                                    :items='$store.state.portfolioNames'
                                    dense
                                    @change="populatePositions"
                                >
                                </v-combobox>
                            </v-col>
                            <v-col cols=4>
                                <SavePortfolio/>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:[`item.lastprice`] = "props">
                        {{ getLast(props.item.stock)}}
                    </template>
                    <template v-slot:[`item.value`] = "props">
                        {{formatNumber(parseFloat(getLast(props.item.stock)) * parseInt(props.item.quantity))}}
                    </template>
                    <template v-slot:[`item.quantity`]="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.quantity"
                            @open="open"
                        >
                        {{ formatNumber(props.item.quantity) }}
                            <template v-slot:input>
                                <v-text-field
                                v-model="props.item.quantity"
                                label="Edit"
                                single-line
                                counter
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    </v-data-table>
                </v-row>
                <v-row>
                </v-row>
            </v-col>
        </v-row>
        <v-snackbar
            v-model="snack"
            :timeout="2000"
            :color="snackColor"
        >
        {{ snackText }}
        <template v-slot:action="{ attrs }">
            <v-btn
                v-bind="attrs"
                text
                @click="snack = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>
    </v-container>

    </div>
</template>

<script>
import { mapMultiRowFields } from 'vuex-map-fields'
import SavePortfolio from '@/components/SavePortfolio.vue'

export default {
    name: 'Dashboard',

    data(){
        return {
            posHeaders :[
                {text:'Stock', value:'stock'},
                {text:'Open', value:'openprice'},
                {text:'Last', value:'lastprice'},
                {text:'Quantity', value:'quantity'},
                {text:'Value', value:'value'},
            ],
            snack: false,
            snackColor: '',
            snackText: '',
            saveBtnDisable : true,
        }
    },

    components: {
        SavePortfolio,
    },

    created(){
        this.$store.dispatch('populatePortfolios')
        this.$store.dispatch('populateStocks')
    },
    
    methods:{
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Editing opened'
        this.saveBtnDisable = false
      },

      getLast(stock){
          this.s = this.$store.state.stocks.filter(s => s.tick.localeCompare(stock) == 0)
          if(this.s.length > 0){
              return this.s[0].lastprice
          }
          else{
              return null
          }
      },
      formatNumber(num) {
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        },

        populatePositions(){
            this.$store.dispatch('populatePositions')
        },
        
        savePositions(){
            
        },
    },

    computed:{
        ...mapMultiRowFields(['positions'])
    },
}
</script>