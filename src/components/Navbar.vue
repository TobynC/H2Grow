<template>
    <nav>
        <v-toolbar dark app>
            <v-toolbar-side-icon class="hidden-md-and-up grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <router-link to="/" class="toolbar-title">
                <v-toolbar-title class="headline">
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
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn class="text-capitalize" flat>Login</v-btn> 
                <v-btn class="text-capitalize" flat>Register</v-btn> 
                <v-btn class="text-capitalize" flat>Account</v-btn> 
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
            </v-list>
        </v-navigation-drawer>
    </nav>    
</template>

<script>
export default {
    data(){
        return {
            drawer: false,
            links: [
                {icon: 'home', text: 'Home', route: '/'},
                {icon: 'wifi', text: 'Wifi Configuration Tool', route: '/wifi'},
                {icon: 'opacity', text: 'Water Usage', route: '/water'},
                {icon: 'help', text: 'Manual', route: '/manual'}
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
