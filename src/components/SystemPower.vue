<template>
    <v-layout row wrap mb-5>
        <v-flex style="transform: scale(1.5) translateX(3.5rem) !important;" xs2>
            <v-switch id="powerSwitch" :color="powerColor" left v-model="systemPower" @change="onSystemPowerChange">
                <template slot="label">
                    <v-icon id="powerIcon" :color="powerColor" style="margin-right: 0.5rem;">power_settings_new</v-icon> System Power
                </template>
            </v-switch>           

            <v-alert
            :value="error"
            type="error"
            transition="scale-transition"
            >
            Something went wrong
            </v-alert>
      </v-flex>
    </v-layout>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase/app'
import 'firebase/firestore'
import toastMixin from '@/mixins/toastMixin'

export default {
    data(){
        return {
            systemPower: true,
            error: false,
            errorFeedback: null
        }
    },
    created() {
        this.getSystemPower();
    },
    computed: {
      powerColor(){
          return this.systemPower ? 'primary' : 'error';
      }  
    },
    methods: {
        saveSystemPower(){
        db.collection('systemPower').doc(firebase.auth().currentUser.email).set({systemPower: this.systemPower}).then(() =>{
        }).catch(error => {
            this.errorFeedback = error;
            this.toast(this, 'error', 4000);
        });
    },
    getSystemPower(){
        db.collection('systemPower').doc(firebase.auth().currentUser.email).get().then(doc => {
            if(doc.exists){
                this.systemPower = doc.data().systemPower;
            }
        })
    },
    onSystemPowerChange(){
        this.saveSystemPower();
    }
  },
  mixins: [toastMixin] 
}
</script>