<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Save
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Save Edited Positions
        </v-card-title>
        <v-card-actions>
            <v-container>
              <v-row>
                <v-col>
                <v-combobox
                  v-model='$store.state.portfolioName'
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
                  @click="savePortfolio()"
                >
                  Save
                </v-btn>
              </v-row>
            </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snack"
      :timeout="3000"
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
  </div>
</template>

<script>

  export default {
    data: () => ({
        dialog: false,
        positionFile: null,
        portfolioNames: [], 
        portfolioName: null,
        snack: false,
        snackColor: '',
        snackText: '',
    }),
    methods:{
        savePortfolio(){
          if (this.$store.state.portfolioName && this.$store.state.portfolioName.length < 1) {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Please enter Portfolio Name'
            return false
          }
          else{
            this.$store.dispatch('savePortfolio', {portfolio: this.$store.state.portfolioName})
            .then(()=>{
              this.dialog = false
            })
            .catch((err) =>{
              console.log('Error savePortfolio', err)
              console.log('dialog:', this.dialog)
            })
          }
        }, 
    },
  }
</script>