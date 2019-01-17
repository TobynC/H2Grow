<template>
    <v-layout row wrap>
        <v-flex md4 offset-md4 xs8 offset-xs2 mt-5>
            <v-card v-if="user">
              <v-card-title class="display-1 success--text" primary-title>
                  Account Overview
              </v-card-title>
              <v-card-text v-if="user">
                <v-layout row wrap mb-3>
                    <v-flex xs10>
                        <div class="headline font-weight-bold success--text text--lighten-1">Email:</div> <div class="subheading">{{user.email}}</div>
                    </v-flex>
                    <!-- <v-flex xs2>
                        <v-btn @click="editEmail" flat icon>
                            <v-icon class="primary--text">edit</v-icon>
                        </v-btn>
                    </v-flex> -->
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs10>
                        <div class="headline font-weight-bold success--text text--lighten-1">Name:</div> <div class="subheading">{{ fullName }}</div>
                    </v-flex>
                    <!-- <v-flex xs2>
                        <v-btn @click="editName" flat icon>
                            <v-icon class="primary--text">edit</v-icon>
                        </v-btn>
                    </v-flex> -->
                </v-layout>
              </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import db from '@/fb'
    import firebase from 'firebase/app'
    import 'firebase/auth'

    export default {
        data(){
            return{
                user: null
            }
        },
        methods: {
            editEmail() {

            },
            editName() {

            }
        },
        created() {
            let dbReference = db.collection('users');
            let currentUser = firebase.auth().currentUser;

            dbReference.doc(currentUser.email).get().then(user => {
                this.user = user.data();
            });            
        },
        computed: {
            fullName(){
                return `${this.user.firstName} ${this.user.lastName}`
            }   
        }
    }
</script>

<style scoped>

</style>