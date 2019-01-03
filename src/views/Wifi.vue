<template>
  <v-layout row wrap>
      <v-flex md6 xs12>
        <v-form ref="form">
            <v-text-field
                name="wifiName"
                label="Wifi Name"
                id="wifiName"
                v-model="wifiName"
                required
                prepend-icon="router"
                type="text"
                maxlength="50"
                :rules="wifiRules"
            ></v-text-field>
            <v-text-field
                name="wifiPassword"
                label="Wifi Password"
                id="wifiPassword"
                prepend-icon="fingerprint"
                v-model="wifiPassword"
                type="password"
                maxlength="50"
                required
                :rules="wifiRules"
            ></v-text-field>

            <v-subheader v-if="showErrorMessage" class="error--text">There was a problem submitting the form.</v-subheader>
            
            <v-btn class="text-capitalize primary" @click="submit">submit</v-btn>
            <v-btn class="text-capitalize" @click="clear">clear</v-btn>
        </v-form>
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
            wifiRules: [
                v => v.length <= 50 || 'Length is too long.',
                v => v.length > 0 || 'Cannot be empty.'
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