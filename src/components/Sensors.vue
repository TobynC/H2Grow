<template>
    <div>
        <v-layout v-if="moisture === null" justify-center>
            <v-progress-circular
            :size="50"
            color="success"
            indeterminate
            ></v-progress-circular>
        </v-layout> 

        <v-layout mt-5 row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title primary-title>
                        Moisture Sensor Sensitivity
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-slider
                                v-model="moisture"
                                :thumb-size="24"
                                max="100"
                                min="0"
                                thumb-label="always"
                                ></v-slider>
                            </v-flex>
                            <v-flex xs12 mt-2>
                                <v-btn @click="saveSensorData" color="success grey--text text--darken-4">Save Sensor Settings</v-btn>
                                <v-alert
                                :value="success"
                                type="success"
                                transition="scale-transition"
                                >
                                Sensor settings successfully saved.
                                </v-alert>            
                                <v-alert
                                :value="error"
                                type="error"
                                transition="scale-transition"
                                >
                                Sensor settings did not save correctly.
                                </v-alert>            
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data(){
        return {
            moisture: null,
            success: null,
            error: null,
            errorFeedback: null,
            currentUser: null
        }
    },
    created() {
        this.getSensorData();
    },
    methods: {
        getSensorData(){
            this.currentUser = firebase.auth().currentUser;

            db.collection('sensors').doc(this.currentUser.email).get().then(doc => {
                if(doc.exists && typeof doc.data().moisture !== 'undefined')
                    this.moisture = doc.data().moisture;                
                else
                    this.moisture = 50;                
            })
        },
        saveSensorData(){
            db.collection('sensors').doc(this.currentUser.email).update({moisture: this.moisture}).then(() => {
                this.success = true;

                setTimeout(() => {
                    this.success = false;
                }, 4000);
            }).catch(error => {
                this.errorFeedback = error;

                this.error = true;
                setTimeout(() => {
                    this.error = false;
                }, 4000);
            });
        }
    }
}
</script>