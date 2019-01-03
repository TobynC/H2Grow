<template>
    <v-layout row wrap>
        <v-flex xs4 offset-xs4 mt-5>
            <v-card>
              <v-card-title class="display-1" primary-title>
                  Login
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field
                                name="email"
                                label="Email"
                                id="email"
                                type="text"
                                required
                                v-model="email"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                name="password"
                                label="Password"
                                id="password"
                                type="password"
                                v-model="password"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-btn color="primary" @click="submit">Continue</v-btn>
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
                email: '',
                password: ''
            }
        },
        methods: {
            submit(){
                if(this.$refs.form.validate()){      
                           
                    //this.$router.push({ name: 'home' });                    
                }
            }     
        }
    }
</script>