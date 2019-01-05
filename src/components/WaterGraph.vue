<template>
    <div>
        <v-layout v-if="!waterData" justify-center>
            <v-progress-circular
            :size="50"
            color="success"
            indeterminate
            ></v-progress-circular>
        </v-layout> 

        <v-layout v-if="waterData" row wrap>
            <v-flex v-if="waterData.length <= 0" mb-5>
                <v-layout row wrap>
                    <v-flex headline xs12 mb-5>
                        There are no daily watering records yet. If you need assistance setting up the system, please go to the manual section of the site.
                    </v-flex>
                    <v-flex xs2>
                        <v-btn color="success" to="/manual" outline block>Manual</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex v-if="totalWater && waterData.length > 0" display-1 xs12 mb-5>
                {{ totalWater | round }} gallons of water used this year.
            </v-flex>
            
            <v-flex v-if="waterData.length > 0" xs12>
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
                
            <v-flex v-if="waterData.length > 0" xs12>
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
                                <p v-if="waterData.length<3" class="subheading font-weight-bold error--text">There are not enough data points for this month to display the graph.</p>
                            </v-flex>
                        </v-layout>
                    </v-flex>    
                
                    <v-flex md8 sm12 xs12 my-5 v-if="monthSelection">
                        <la-cartesian autoresize :bound="[0]" v-if="monthWaterData.length > 2" :data="monthWaterData">
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
    </div>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase/app'
import 'firebase/auth'

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
            monthWaterData: null,
            pieChartData: null,
            totalWater: null
        }
    },
    methods: {
        populateWaterData(){
            db.collection('sensors').doc(firebase.auth().currentUser.email).get().then(doc => {                
                if(doc.exists){
                    this.waterData = doc.data().waterData;                    
                    this.populatePieChartData();  
                    this.getTotalWaterUsage(); 
                    this.createPercentageAttribute();
                }
                else
                    this.waterData = [];
            })            
        },
        updateMonth(){
            const numericMonthValue = this.months.findIndex(month => month === this.monthSelection) + 1;
            const temp = this.waterData;

            this.monthWaterData = temp.filter(
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
    created() {
        this.populateWaterData();
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
