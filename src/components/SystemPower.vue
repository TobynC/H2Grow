<template>
    <v-layout row wrap mb-5>
        <v-flex xs2>
            <v-switch color="success" class="red--text" left label="System Power" v-model="systemPower" @change="onSystemPowerChange"></v-switch>   
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
    methods: {
        saveSystemPower(){
        db.collection('systemPower').doc(firebase.auth().currentUser.email).set({systemPower: this.systemPower}).then(() =>{
            //do nothing
        }).catch(error => {
            this.errorFeedback = error;

            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 4000);
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
  } 
}
</script>