<template>
    <v-layout row wrap>
        <v-flex xs4 offset-xs4 mt-5>
            <v-card>
              <v-card-title class="display-1" primary-title>
                  Account Overview
              </v-card-title>
              <v-card-text v-if="user">
                <v-layout row wrap>
                    <v-flex xs12>
                        Email: {{user.email}}
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        Name: {{user.firstName}} {{user.lastName}}
                    </v-flex>
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
        created() {
            let dbReference = db.collection('users');
            let currentUser = firebase.auth().currentUser;

            dbReference.doc(currentUser.email).get().then(user => {
                this.user = user.data();
            });            
        }
    }
</script>

<style scoped>

</style>