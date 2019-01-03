<template>
  <div>
    <v-layout row mb-5>
      <v-flex xs12>
        <div class="display-2 font-weight-regular success--text">Dashboard</div>
      </v-flex>
    </v-layout> 
    <v-layout row>
      <v-flex xs12>
        <water-graph/>
      </v-flex>
    </v-layout> 
  </div>
</template>

<script>
import WaterGraph from '@/components/WaterGraph'
  export default {
    components: {
      WaterGraph
    }
  }
</script>
