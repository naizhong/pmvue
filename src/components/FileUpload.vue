<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Upload
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Upload Position File
        </v-card-title>
        <v-card-actions>
            <v-container>
              <v-row>
                <v-file-input
                    v-model="positionFile"
                    label="Position File"
                    dense
                ></v-file-input>
              </v-row>
              <v-row>
                <v-col>
                <v-combobox
                  v-model='portfolioName'
                  :items= '$store.state.portfolioNames'
                  label='Portfolio Name'
                  dense
                >
                </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-btn
                    color="primary"
                    @click="dialog = false"
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="uploadPositionFile"
                >
                  Upload
                </v-btn>
              </v-row>
            </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import restService from "@/services/RestService.js"

  export default {
    data: () => ({
        dialog: false,
        positionFile: null,
        portfolioNames: [], 
        portfolioName: null,
    }),
    methods:{
        uploadPositionFile(){
          this.portfolioNames = Object.keys(this.$store.state.portfolios);
            if(this.positionFile){
                restService.uploadPosition(this.positionFile, this.portfolioName)
            }
            else{
                console.log('there are no files.')
            }
            this.dialog = false
        },  
    },
  }
</script>