<template>
    <v-form ref="form">
        <v-layout row wrap>
            <v-flex display-1 xs12 mb-5>
                Limit water usage
            </v-flex>
            <v-flex xs12>
                <v-switch label="Enable Water Cap" color="success" v-model="waterCapEnabled"></v-switch>
            </v-flex>
            <v-flex v-if="waterCapEnabled" xs2>
                    <v-text-field
                    label="Water (Gallons)"
                    v-model="waterCap"
                    type="number"
                    :rules="waterCapRules"
                ></v-text-field>       
            </v-flex>
            <v-flex xs1>
                <v-btn @click="saveWaterLimitData" outline color="success grey--text text--darken-4">Save Water Limit</v-btn>
                <v-alert
                :value="success"
                type="success"
                transition="scale-transition"
                >
                Saved.
                </v-alert>            
                <v-alert
                :value="error"
                type="error"
                transition="scale-transition"
                >
                Something went wrong.
                </v-alert>            
            </v-flex>
        </v-layout>   
    </v-form>    
</template>

<script>
import db from '@/fb'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data(){
        return {
            waterCapEnabled: false,
            waterCap: null,
            success: false,
            error: false,
            waterCapRules: [
                v => !!v || 'Must enter a value if the water cap is enabled.',
                v => parseInt(v) < 10000 || 'Number is too large'
            ]
        }
    },
    created() {
        this.getWaterCap();
    },
    methods: {
        getWaterCap(){
            db.collection('sensors').doc(firebase.auth().currentUser.email).get().then(doc => {
                if(doc.exists && typeof doc.data().waterLimit !== 'undefined'){
                    this.waterCapEnabled = doc.data().waterLimit.waterCapEnabled;
                    this.waterCap = doc.data().waterLimit.waterCap;
                }
            })
        },
        saveWaterLimitData(){
            if(this.$refs.form.validate()){
                db.collection('sensors').doc(firebase.auth().currentUser.email).update({
                    waterLimit: {
                        waterCapEnabled: this.waterCapEnabled, 
                        waterCap: this.waterCap
                }}).then(() => {
                    this.success = true;

                    setTimeout(() => {
                        this.success = false;
                    }, 2000);
                }).catch(() => {
                    this.error = true;

                    setTimeout(() => {
                        this.error = false;
                    }, 2000);
                })
            }
        }
    },
}
</script>