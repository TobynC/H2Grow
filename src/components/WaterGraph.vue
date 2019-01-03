<template>
    <v-layout row wrap>
        <v-flex v-if="totalWater" display-1 xs12 mb-5>
            {{ totalWater | round }} gallons of water used this year.
        </v-flex>
        <v-flex xs12>
            <v-layout row wrap>
                <v-flex md6 xs12>
                    <la-polar :width="375" :data="pieChartData">
                        <la-pie show-label label-prop="percentage" prop="water"></la-pie>
                        <la-tooltip></la-tooltip>
                    </la-polar>                                     
                </v-flex>
                <v-flex md6 xs12>
                    <la-cartesian autoresize narrow :bound="[0]" :data="pieChartData">
                        <la-bar prop="water"></la-bar>
                        <la-x-axis prop="month"></la-x-axis>
                        <la-y-axis></la-y-axis>
                        <la-tooltip></la-tooltip>
                    </la-cartesian>
                </v-flex>    
            </v-layout>
        </v-flex>
         
        <v-flex xs12>
            <v-layout row wrap>
                <v-flex md4 sm6 xs12 my-5>
                    <v-layout row wrap>
                        <v-flex xs12 display-1>                                    
                            Monthly Usage
                            <v-select
                            :items="months"
                            label="Months"
                            v-model="monthSelection"
                            @change="updateMonth"
                            ></v-select>
                        </v-flex>                        
                        <v-flex mt-2 xs12>
                            <p v-if="waterData.length<3" class="error--text">There are not enough data points for this month to display the graph.</p>
                        </v-flex>
                    </v-layout>
                </v-flex>    
            
                <v-flex md8 sm12 xs12 my-5>
                    <la-cartesian autoresize :bound="[0]" v-if="waterData.length > 2 && monthSelection" :data="waterData">
                        <defs>
                            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
                                <stop stop-color="#0076b1" offset="0%" stop-opacity="0.4"></stop>
                                <stop stop-color="#0076b1" offset="50%" stop-opacity="0.2"></stop>
                                <stop stop-color="#0076b1" offset="100%" stop-opacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <la-area fill-color="url(#area-fill)" prop="water" dot curve></la-area>
                        <la-y-axis></la-y-axis>
                        <la-x-axis prop="month"></la-x-axis>
                        <la-tooltip></la-tooltip>
                    </la-cartesian>
                </v-flex>
            </v-layout>   
        </v-flex>     
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            waterData: null,
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            monthSelection: null,
            pieChartData: null,
            totalWater: null,
            pieWidth: 400
        }
    },
    methods: {
        test(){
            console.log(this.pieWidth)
        },
        populateWaterData(){
            //connect to db
            this.waterData = [
                {month: '12/31/2019', water: 3.3}, 
                {month: '1/1/2019', water: 3.3}, 
                {month: '1/2/2019', water: 8.2}, 
                {month: '1/3/2019', water: 1.9}, 
                {month: '8/4/2019', water: 0}, 
                {month: '9/5/2019', water: 1.0}, 
                {month: '8/6/2019', water: 9.8}, 
                {month: '12/31/2019', water: 3.3}, 
                {month: '2/1/2019', water: 3.3}, 
                {month: '2/2/2019', water: 8.2}, 
                {month: '5/3/2019', water: 1.9}, 
                {month: '6/4/2019', water: 0}, 
                {month: '3/5/2019', water: 1.0}, 
                {month: '3/6/2019', water: 9.8}, 
                {month: '4/31/2019', water: 3.3}, 
                {month: '4/1/2019', water: 3.3}, 
                {month: '4/2/2019', water: 8.2}, 
                {month: '11/3/2019', water: 1.9}, 
                {month: '7/4/2019', water: 0}, 
                {month: '7/5/2019', water: 1.0}, 
                {month: '10/6/2019', water: 9.8}, 
            ]
        },
        updateMonth(){
            this.populateWaterData();

            const numericMonthValue = this.months.findIndex(month => month === this.monthSelection) + 1;

            this.waterData = this.waterData.filter(
                data => numericMonthValue == parseInt(data.month.substring(0, data.month.indexOf('/')))
            );
        },
        populatePieChartData(){
            const compiledData = [];

            for(let i = 0; i < 12; i++){
                let newObj = {month: this.months[i]}
                let waterCount = 0;

                for(const data of this.waterData){
                    const val = parseInt(data.month.substring(0, data.month.indexOf('/')));
                    if(val == i+1)
                        waterCount+=data.water;
                }

                newObj.water = waterCount;
                if(waterCount > 0){
                    newObj.water = Math.round(newObj.water * 10)/10;
                    compiledData.push(newObj);
                }
            }   

            this.pieChartData = compiledData;
        },
        getTotalWaterUsage(){            
            for(const data of this.pieChartData)
                this.totalWater += data.water;            
        },
        createPercentageAttribute(){
            for(const data of this.pieChartData)
                data.percentage = `${data.month} (${parseInt((data.water/this.totalWater)*100)}%)`
        }
    },
    beforeMount() {
        this.populateWaterData();
        this.populatePieChartData();  
        this.getTotalWaterUsage(); 
        this.createPercentageAttribute(); 
    }
}
</script>

<style>
text{
    fill: #fbfbfb;
    text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
}
</style>
