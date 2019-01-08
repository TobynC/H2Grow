<template>
  <div>
    <v-layout row mb-5>
      <v-flex xs12>
        <div class="display-2 font-weight-regular success--text">Dashboard</div>
      </v-flex>      
    </v-layout>  
    <system-power/>
    <water-graph/>
    <schedule/>
    <sensors/>
  </div>
</template>

<script>
import WaterGraph from '@/components/WaterGraph'
import Schedule from '@/components/Schedule'
import Sensors from '@/components/Sensors'
import SystemPower from '@/components/SystemPower'

export default {
  components: {
    WaterGraph,
    Schedule,
    Sensors,
    SystemPower
  }  
}
</script>

<style>
.v-card.theme--dark{
  margin: 3rem 0 3rem 0;
}

div.v-card__title.v-card__title--primary > div{
    color: rgb(63, 177, 227);
}
</style>
