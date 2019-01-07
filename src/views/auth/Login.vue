<template>
    <v-layout row wrap>
        <v-flex sm8 offset-sm2 md4 offset-md4 mt-5>
            <v-card>
              <v-card-title class="display-1 success--text" primary-title>
                  Login
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                    <v-layout row wrap>
                        <v-flex class="font-weight-bold subheading" error--text xs12>
                            {{firebaseFeedback}}
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
                                name="password"
                                label="Password"
                                id="password"
                                type="password"
                                v-model="password"
                                :rules="passwordRules"
                            ></v-text-field>                            
                            <v-checkbox label="Show Password" v-model="showPassword" @change="showPasswordOnChange"></v-checkbox>
                        </v-flex>
                        <v-btn color="success grey--text text--darken-4" @click="submit">Continue</v-btn>
                    </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/firestore'
    import validateEmailMixin from '@/mixins/validateEmailMixin'

    export default {
        data(){
            return{
                email: '',
                password: '',
                firebaseFeedback: '',
                showPassword: false,
                passwordRules: [
                    v => v.length > 0 ? v.length < 50 || 'Password is too long.' : true
                ],
                emailRules: [
                    v => v.length > 0 ? this.validateEmail(v) || 'Invalid email.' : true
                ]
            }
        },
        methods: {
            submit(){
                if(this.$refs.form.validate()){      
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {                        
                        this.$router.push({name: 'home'});
                    }).catch(error => {
                        this.firebaseFeedback = error.message;
                    })                   
                }
            },
            showPasswordOnChange(){
                const type = this.showPassword ? 'text' : 'password';
                
                document.getElementById('password').setAttribute('type', 'text')                
            }     
        },
        mixins: [validateEmailMixin]
    }
</script>