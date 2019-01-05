<template>
  <div>
    <v-layout row mb-5>
      <v-flex xs12>
        <div class="display-2 font-weight-regular success--text">Water Usage</div>
      </v-flex>
    </v-layout> 
    <v-layout row wrap>
      <v-flex xs12>
        <water-graph/>  
      </v-flex>
    </v-layout> 
    <v-layout row wrap>
      <v-flex xs12>
        <water-limit/>  
      </v-flex>
    </v-layout> 
  </div>
</template>

<script>
  import WaterGraph from '@/components/WaterGraph'
  import WaterLimit from '@/components/WaterLimit'

  export default {
    components: {
        WaterGraph,
        WaterLimit
    }
  }
</script>