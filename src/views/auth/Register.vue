<template>
    <v-layout row wrap>
        <v-flex sm8 offset-sm2 md4 offset-md4 mt-5>
            <v-card>
              <v-card-title class="display-1" primary-title>
                  Register
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                    <v-layout row wrap>
                        <v-flex class="font-weight-bold subheading" error--text xs12>
                            {{feedback}}
                        </v-flex>
                        <v-flex class="font-weight-bold subheading" error--text xs12>
                            {{firebaseFeedback}}
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                name="firstName"
                                label="First Name"
                                id="firstName"
                                type="text"
                                v-model="firstName"
                                :rules="nameRules"
                                maxlength="50"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                name="lastName"
                                label="Last Name"
                                id="lastName"
                                type="text"
                                v-model="lastName"
                                :rules="nameRules"
                                maxlength="50"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                name="email"
                                label="Email"
                                id="email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                name="password1"
                                label="Password"
                                id="password1"
                                type="password"
                                v-model="password1"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                name="password2"
                                label="Re-enter Password"
                                id="password2"
                                type="password"
                                v-model="password2"
                                :rules="password2Rules"
                            ></v-text-field>
                        </v-flex>
                        <v-btn color="success grey--text text--darken-4" @click="submit">Sign Up</v-btn>
                    </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import db from '@/fb'
    import firebase from 'firebase/app'
    import 'firebase/firestore'
    import validateEmailMixin from '@/mixins/validateEmailMixin'

    export default {
        data(){
            return{
                feedback: '',
                firstName: '',
                lastName: '',
                email: '',
                password1: '',
                password2: '',
                firebaseFeedback: '',
                nameRules: [
                    v => v.length > 0 ? v.length < 50 || 'Name is too long.' : true
                ],
                emailRules: [
                    v => v.length > 0 ? this.validateEmail(v) || 'Invalid email.' : true
                ],
                password1Rules: [
                   v => v.length > 0 ? v.length < 50 || 'Password is too long.' : true
                ],
                password2Rules: [
                    v => v.length > 0 ? v === this.password1 || 'Passwords do not match.' : true
                ]
            }
        },
        methods: {
            submit(){
                if(this.$refs.form.validate()){  
                    let dbReference = db.collection('users').doc(this.email);

                    dbReference.get().then(doc => {
                        if(doc.exists)
                            this.feedback = 'This email already exists'
                        else{
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password1).then(cred => {
                                dbReference.set({
                                    userId: cred.user.uid,
                                    email: cred.user.email,
                                    firstName: this.firstName,
                                    lastName: this.lastName
                                })
                            }).then(() => this.$router.push({name: 'home'}))
                            .catch(error => {
                                this.firebaseFeedback = error.message;
                                this.feedback = '';   
                            });
                        }                      
                    });            
                }
            }            
        },
        mixins: [validateEmailMixin]
    }
</script>