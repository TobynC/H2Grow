<template>
  <div>
    <v-layout row mb-5>
      <v-flex xs12>
        <div class="display-2 font-weight-regular">Manual</div>
      </v-flex>
    </v-layout>    

    <v-layout row wrap>
      <v-flex mb-4 mx-2 lg2 md3 sm4 xs6 v-for="(item, index) in parts" :key="index">
         <v-card>
          <v-img
            class="white--text"
            height="200px"
            :src="require(`../assets/images/${item.fileName}`)"
          >
          </v-img>
          <v-card-title>
            {{item.text}}
          </v-card-title>
        </v-card>        
      </v-flex>
    </v-layout>

    <v-layout row mb-5>
      <v-flex xs12>
        <div class="display-1 font-weight-regular">Setup Instructions</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-img
        :src="require('../assets/images/User Documentation.jpg')"
        ></v-img>
      </v-flex>
    </v-layout>
    <v-layout my-5 row wrap>
      <v-flex xs12>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(instruction,index) in instructions" :key="index">
            <div class="display-1" slot="header">{{instruction.title}}</div>
            <v-card>
              <v-card-text>
                <ul v-for="(step, index) in instruction.steps" :key="index">
                  <li mb-2 class="headline">{{step}}</li>
                </ul>
                <v-layout mt-5 row wrap>
                  <v-flex v-for="(picturePath, index) in instruction.picturePaths" :key="`A-${index}`" xs6>
                    <v-img                    
                    max-width="50rem"
                    :src="require(`../assets/images/${picturePath}`)"
                    ></v-img>
                  </v-flex>
                </v-layout>                
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data(){
    return {
      parts: [
        {text: '1. Power Cord', fileName: 'powercord.jpg'},
        {text: '2. Hose Adaptor', fileName: 'adaptor.jpg'},
        {text: '3. Flow Rate Sensor', fileName: 'flowsensor.jpg'},
        {text: '4. Moisture Sensor x2', fileName: 'moisturesensor.jpg'},
        {text: '5. Valve', fileName: 'valve.jpg'}
      ],
      instructions: [
        {title: '1. Configure Wi-fi Settings', steps: [
          'Remove SD card from the system and connect it to your computer via an SD card reader.',
          'Go to the Wi-fi Configuration page (link at the top of the page) and enter your information then click the button at the bottom of the form to save the configuration file to your device.',
          'Safely remove the SD card from your computer and reinsert it into the system.'
        ],
        picturePaths: ['sdcard.jpg']},
        {title: '2. Place System and Moisture Sensors', steps: [
          'Place system outside near your garden.',
          'Insert moisture sensors into your garden soil, making sure to place them as far apart as possible.'
        ],
        picturePaths: ['sensorlocationdrawing.jpg', 'systemdrawing.jpg']},
        {title: '3. Configure Settings Through the Web Application', steps: [
          'Log into web application.',
          'Go to settings.',
          'Adjust sensor thresholds and scheduling data appropriately.'
        ],
        picturePaths: ['moisturesensitivity.jpg']}
      ]
    }
  }
}
</script>