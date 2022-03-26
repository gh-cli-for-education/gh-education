<template>
      <progress-bar
        :diameter="1000"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
      >
        <template v-slot:header></template>
        <template v-slot:footer></template>
        <template v-slot:tip> {{ `Week ${completedSteps} of ${totalSteps} ${Math.round((completedSteps/totalSteps)*100, 2)}`}}%</template>
      </progress-bar>
</template>
 
<script>
  import currentWeekNumber from "current-week-number";
  import ProgressBar from "vue2-progress-bar";
 
  export default {
    data() {
      return {
        start: currentWeekNumber('February 14, 2022'),
        end: currentWeekNumber('May 27, 2022'),  
        currentWeek: currentWeekNumber(),
      };
    },
    computed: {
        completedSteps() {
           return 1 + currentWeekNumber() - this.start
        },
        totalSteps() {
            return (this.end - this.start)+1;
        }
    },
    components: {
      ProgressBar
    }
  };
</script> 

<style>
 </style>