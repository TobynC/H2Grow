<template>
    <v-card>
        <v-card-title primary-title>
            <v-flex display-1 xs12 mb-5>
                Watering Schedule
            </v-flex>
        </v-card-title>
        <v-card-text>
            <v-layout v-if="!schedule" justify-center>
                <v-progress-circular
                :size="50"
                color="success"
                indeterminate
                ></v-progress-circular>
            </v-layout> 

            <v-layout v-if="schedule" row wrap>       
                <v-flex xs12>
                    <v-switch
                    label="All Week"
                    v-model="allWeek"
                    @change="allWeekOnChange"
                    ></v-switch>
                </v-flex>
                <v-flex v-if="schedule && !allWeek" xs12>
                    <v-expansion-panel>
                        <v-expansion-panel-content v-for="(obj, index) in schedule" :key="index">
                        <div slot="header"><div class="font-weight-bold subheading">{{obj.day}}</div></div>
                        <v-card>
                            <v-card-text>                        
                                <v-flex xs12>
                                    <v-switch
                                    label="Active"
                                    v-model="obj.active"
                                    ></v-switch>
                                    <v-checkbox
                                    label="All Day"
                                    v-if="obj.active"
                                    v-model="obj.allDay"                            
                                    ></v-checkbox>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-layout wrap justify-space-around>
                                    <v-card v-if="obj.active && !obj.allDay" md6 xs12>
                                        <v-card-title class="justify-center" primary-title>
                                            <div class="headline success--text">Start Time</div>
                                        </v-card-title>
                                        <v-card-text>                                        
                                            <v-time-picker v-model="obj.start" color="green lighten-1"></v-time-picker>
                                        </v-card-text>
                                    </v-card> 
                                    <v-card v-if="obj.active && obj.start && !obj.allDay" md6 xs12>
                                        <v-card-title primary-title  class="justify-center">
                                            <div class="headline success--text">Stop Time</div>
                                        </v-card-title>
                                        <v-card-text>                                      
                                            <v-time-picker v-model="obj.stop" :min="obj.start" color="green lighten-1"></v-time-picker>
                                        </v-card-text>
                                    </v-card> 
                                </v-layout>                        
                            </v-card-text>
                        </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-flex>
                <v-flex xs12 mt-2>
                    <v-btn @click="saveSchedule" color="success grey--text text--darken-4">Save Schedule</v-btn>
                    <v-alert
                    :value="success"
                    type="success"
                    transition="scale-transition"
                    >
                    Schedule successfully saved.
                    </v-alert>            
                    <v-alert
                    :value="error"
                    type="error"
                    transition="scale-transition"
                    >
                    Schedule did not save correctly.
                    </v-alert>            
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase/app'
import 'firebase/auth'
import toastMixin from '@/mixins/toastMixin'

export default {
    data(){
        return {
            schedule: null,
            allWeek: false,
            success: false,
            error: false,
            errorFeedback: '',
            currentUser: null
        }
    },
    created() {
        this.loadSchedule();
    },
    methods: {
        loadSchedule(){
            this.currentUser = firebase.auth().currentUser;

            db.collection('schedule').doc(this.currentUser.email).get().then(doc => {
                if(doc.exists){
                    this.schedule = doc.data().schedule;
                    this.allWeek = doc.data().allWeek;
                }
                else 
                    this.seedSchedule();                
            });
        },
        saveSchedule(){
            db.collection('schedule').doc(this.currentUser.email).set({schedule: this.schedule, allWeek: this.allWeek}).then(() => {
                this.success = true;
                this.toast(this, 'success', 4000);
            }).catch(error => {
                this.errorFeedback = error;
                this.toast(this, 'error', 4000);
            });            
        },
        allWeekOnChange(){
            for(const obj of this.schedule)
                obj.active = obj.allDay = this.allWeek;  
        },
        seedSchedule(){
            this.schedule = [
                { day: 'Monday', active: false, allDay: true, start: null, stop: null },
                { day: 'Tuesday', active: false, allDay: true, start: null, stop: null },
                { day: 'Wednesday', active: false, allDay: true, start: null, stop: null },
                { day: 'Thursday', active: false, allDay: true, start: null, stop: null },
                { day: 'Friday', active: false, allDay: true, start: null, stop: null },
                { day: 'Saturday', active: false, allDay: true, start: null, stop: null },
                { day: 'Sunday', active: false, allDay: true, start: null, stop: null }
            ];
            this.allWeek = false;  
        }
    },
    mixins: [toastMixin]
}
</script>

<style>
div.v-expansion-panel__header{
  background-color: #303030 !important;
}
li.v-expansion-panel__container.v-expansion-panel__container--active{
    border: 1px solid #303030;
}
</style>
