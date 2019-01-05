<template>
  <v-layout row wrap>
      <v-flex xs4 offset-xs4 mt-5>
            <v-card>
              <v-card-title class="display-1 success--text" primary-title>
                  Wifi Configuration Tool 
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        name="wifiName"
                        label="Wifi Name"
                        id="wifiName"
                        v-model="wifiName"
                        prepend-icon="router"
                        type="text"
                        maxlength="50"
                        :rules="wifiRules"
                    ></v-text-field>
                    <v-text-field
                        name="wifiPassword"
                        label="Wifi Password"
                        id="wifiPassword"
                        prepend-icon="lock"
                        v-model="wifiPassword"
                        type="password"
                        maxlength="50"
                        :rules="wifiRules"
                    ></v-text-field>

                    <v-subheader v-if="showErrorMessage" class="error--text">There was a problem submitting the form.</v-subheader>
                    
                    <v-layout justify-space-between>
                        <v-flex xs4>
                            <v-btn class="text-capitalize success grey--text text--darken-4" @click="submit" block>download<v-icon right>save_alt</v-icon></v-btn>                    
                        </v-flex>
                        <v-flex xs4>
                            <v-btn class="text-capitalize" @click="clear" block outline>clear</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
        </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
export default {
    data(){
        return {
            wifiName: '',
            wifiPassword: '',
            showErrorMessage: false,
            submitted: false,
            wifiRules: [
                v => v.length > 0 ? v.length <= 50 || 'Password is too long.' : true,
                v => !!v || 'Field is required',
            ]
        }
    },
    methods: {
        submit(){
            if(this.$refs.form.validate()){
                this.showErrorMessage = false;
                this.saveFile(); 
                this.$router.push({ name: 'home' });
            }            
            else
                this.showErrorMessage = true;           
        },
        clear(){
            this.wifiName = this.wifiPassword = this.driveLetter = '';
        },
        createConfFile(){
            let conf = 
            `country=US
            ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
            update_config=1

            network={
                ssid="${this.wifiName}"
                scan_ssid=1
                psk="${this.wifiPassword}"
                key_mgmt=WPA-PSK
            }`;
            return conf;
        },
        saveFile(){
            this.submitted = true;
            this.download(this.createConfFile(), "wpa_supplicant.conf", "conf")
        },
        download(data, filename, type) {
            var file = new Blob([data], {type: type});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        }
    }
}
</script>