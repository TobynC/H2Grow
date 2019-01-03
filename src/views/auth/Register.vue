<template>
    <v-layout row wrap>
        <v-flex xs4 offset-xs4 mt-5>
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

    export default {
        data(){
            return{
                feedback: '',
                firstName: '',
                lastName: '',
                email: '',
                password1: '',
                password2: '',
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
                    let ref = db.collection('users').doc(this.email);

                    ref.get().then(doc => {
                        if(doc.exists)
                            this.feedback = 'This email already exists'                      
                    });            
                    //this.$router.push({ name: 'home' });
                }
            },
            validateEmail(email) {
                // eslint-disable-next-line
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                return re.test(String(email).toLowerCase());
            }
        }
    }
</script>

<style scoped>

</style>