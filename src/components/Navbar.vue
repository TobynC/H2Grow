<template>
    <nav>
        <v-toolbar dark app>
            <v-toolbar-side-icon class="hidden-md-and-up grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <router-link to="/" class="toolbar-title">
                <v-toolbar-title class="headline success--text">
                    <span>H<sub>2</sub>Grow</span>
                </v-toolbar-title>
            </router-link>            
            <v-toolbar-items class="hidden-sm-and-down ml-5">
                <v-btn class="text-capitalize" flat v-show="index>0" v-for="(link, index) in links" :key="index" router :to="link.route">
                    <v-icon left>{{link.icon}}</v-icon>
                    {{link.text}}
                </v-btn>   
            </v-toolbar-items>  
            <v-spacer></v-spacer> 
            <v-toolbar-items class="hidden-sm-and-down" v-for="(authLink, index) in authLinks" :key="index">
                <v-btn class="text-capitalize" router :to="authLink.route" flat  v-if="authLink.authState" @click="authLink.actionMethod ? authLink.actionMethod() : null">
                    <v-icon left>{{authLink.icon}}</v-icon>
                    {{authLink.text}}
                </v-btn>
                <!-- <v-btn v-if="!user" to="/Login" class="text-capitalize" flat>Login</v-btn> 
                <v-btn v-if="!user" to="/Register" class="text-capitalize" flat>Register</v-btn> 
                <v-btn v-if="user" to="/Account" class="text-lowercase" flat>{{user.email}}</v-btn> 
                <v-btn v-if="user" @click="logout" class="text-capitalize" flat>Logout</v-btn>  -->
            </v-toolbar-items> 
        </v-toolbar>

        <v-navigation-drawer v-if="drawer" v-model="drawer" app grey darken-2>
            <v-list>
                <v-list-tile v-for="(link, index) in links" :key="index" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{link.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="authLinks"></v-divider>
                <div class="auth-links" v-if="authLinks">
                    <div v-for="(authLink, index) in authLinks" :key="index" >
                        <v-list-tile router :to="authLink.route" v-if="authLink.authState" @click="authLink.actionMethod ? authLink.actionMethod() : null">
                            <v-list-tile-action>
                                <v-icon>{{authLink.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{authLink.text}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </div>                    
                </div>
            </v-list>
        </v-navigation-drawer>
    </nav>    
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data(){
        return {
            drawer: false,
            user: null,
            links: [
                {icon: 'dashboard', text: 'Dashboard', route: '/'},
                {icon: 'wifi', text: 'Wifi Configuration Tool', route: '/Wifi'},
                {icon: 'opacity', text: 'Water Usage', route: '/Water'},
                {icon: 'help', text: 'Manual', route: '/Manual'}
            ],            
            authLinks: null
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
                this.user = user;                      
            else
                this.user = null;

            this.populateAuthLinks();
        })
    },
    watch: {
        user(){
            this.populateAuthLinks();
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => 
                {                    
                    this.$router.push({
                        name: 'login'
                    })
                }
            )            
        },
        populateAuthLinks(){
            const email = this.user ? this.user.email : '';
            this.authLinks = [
                {icon: 'input', text: 'Login', route: '/Login', authState: !this.user},
                {icon: 'assignment_ind', text: 'Register', route: '/Register', authState: !this.user},
                {icon: 'account_circle', text: email, route: '/Account', authState: this.user},
                {icon: 'exit_to_app', text: 'Logout', route: '/Login', actionMethod: this.logout, authState: this.user},
            ]
        }
    }
}
</script>

<style>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
