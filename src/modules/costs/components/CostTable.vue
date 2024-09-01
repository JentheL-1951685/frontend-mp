<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Cost } from '@/modules/costs/models/cost.model'
import redAnomalyImage from '@/assets/red_exclamation.svg'
import orangeAnomalyImage from '@/assets/orange_exclamation.svg'
import yellowAnomalyImage from '@/assets/yellow_exclamation.svg'

const props = withDefaults(defineProps<{
  costs: Cost[]
  isLoading: boolean
}>(),{
  costs: [], // provide a default empty array for users
})

const router = useRouter()
const closePanel = () => {
  router.back()
}
const showTooltip = ref(false)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipText = ref('') // New state to hold the tooltip text

function extractDay(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const day = date.getDate();
  return day.toString().padStart(2, '0'); // Ensures the day is always two digits
}

function extractHourMinute(dateTimeString: string): string {
  const [datePart, timePart] = dateTimeString.split('T');
  const [hour, minute, second] = timePart.split(':');
  return `${hour}:${minute}`;
}

function formatSecondsToHoursMinutes(secondsString: string): string {
  const totalSeconds = parseFloat(secondsString);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  return `${paddedHours}h${paddedMinutes}m`;
}

const firstUserId = computed(() => {
  return props.costs.length > 0 ? props.costs[0].user_id : 'N/A';
});

const totalCost = computed(() => {
  const sum = props.costs.reduce((acc, cost) => acc + cost.price, 0);
  return Math.floor(sum); // Ensure no numbers after the comma
});

const totalCharge = computed(() => {
  const sum = props.costs.reduce((acc, cost) => acc + cost.charge_added, 0);
  return Math.floor(sum); // Ensure no numbers after the comma
});

const currentDate = ref(new Date(2024, 0, 1)); // Initialize with January 2024

const formattedDate = computed(() => {
  const options = { year: 'numeric', month: 'long' };
  return currentDate.value.toLocaleDateString('nl-NL', options);
});

const route = useRoute();

const isOnCostOverview = computed(() => {
  return route.path.startsWith('/cost-overview/');
});

const updateRoute = () => {
  const year = currentDate.value.getFullYear();
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0');
  const fleetId = route.params.fleet_id;
  const userId = route.params.user_id;
  router.push(`/cost-overview/${fleetId}/${userId}/${year}-${month}`)
    .then(() => {
      window.location.reload(); // Reload the page after the route is updated
    });
};

const goToPreviousMonth = () => {
  if (isOnCostOverview.value) {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1);
    currentDate.value = new Date(currentDate.value); // To trigger reactivity
    updateRoute();
  }
};

const goToNextMonth = () => {
  if (isOnCostOverview.value) {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1);
    currentDate.value = new Date(currentDate.value); // To trigger reactivity
    updateRoute();
  }
};

const getAnomalyImage = (anomalyScore : number) => {
  if (anomalyScore < -0.3 && anomalyScore >= -0.5) {
    return redAnomalyImage;
  } else if (anomalyScore < -0.1 && anomalyScore >= -0.3) {
    return orangeAnomalyImage;
  } else if (anomalyScore < 0 && anomalyScore >= -0.1) {
    return yellowAnomalyImage;
  } else {
    return ''; // Default image or no image
  }
};

const handleMouseOver = (event, anomalyScore) => {
  tooltipPosition.value = { x: event.clientX + 10, y: event.clientY + 10 }
  showTooltip.value = true

  // Set the tooltip text based on the anomaly score
  if (anomalyScore < -0.3 && anomalyScore >= -0.5) {
    tooltipText.value = "Red: Severe anomaly, score between -0.3 and -0.5. For a more detailed explanation, press the 'help' button on the bottom left."
  } else if (anomalyScore < -0.1 && anomalyScore >= -0.3) {
    tooltipText.value = "Orange: Moderate anomaly, score between -0.3 and -0.1. For a more detailed explanation, press the 'help' button on the bottom left."
  } else if (anomalyScore < 0 && anomalyScore >= -0.1) {
    tooltipText.value = "Yellow: Minor anomaly, score between -0.1 and 0. For a more detailed explanation, press the 'help' button on the bottom left."
  }
};

const handleMouseOut = () => {
  showTooltip.value = false
};

// Watch for changes in the route parameters to update the date
watch(() => route.params.month, (newDate) => {
  if (newDate) {
    const [year, month] = newDate.split('-');
    if (year && month) {
      currentDate.value = new Date(Number(year), Number(month) - 1);
    }
  }
});

// Set the initial date based on route parameters
onMounted(() => {
  if (isOnCostOverview.value) {
    const [year, month] = route.params.month ? route.params.month.split('-') : [2024, 1];
    currentDate.value = new Date(Number(year), Number(month) - 1);
  }
});
</script>

<template>
  <div class="data-insights">
    <div class="frame">
      <div class="sidepanel-header">
        <div class="ATOM-title">
          <div class="div-wrapper"><div class="text-wrapper">Cost overview</div></div>
          <button @click="closePanel" class="close-button"><img class="cross" src="@/assets/cross.svg" /></button>
        </div>
        <div class="ATOM-icon-with-text">
          <div class="headquarters">For user {{firstUserId}}</div>
          <img class="chevron" src="@/assets/chevron-right.svg" />
        </div>
      </div>
      <div class="div">
        <div class="month">
          <div class="overlap-group">
            <img class="chevron-month-left" src="@/assets/chevron-left.svg" :class="{ 'disabled': !isOnCostOverview }" @click="goToPreviousMonth" />
            <div class="this-year">{{ formattedDate }}</div>
            <img class="chevron-month-right" src="@/assets/chevron-right.svg" :class="{ 'disabled': !isOnCostOverview }" @click="goToNextMonth" />
          </div>
        </div>
        <div class="div-2">
          <div class="div-2">
            <div class="total">
              <div class="ALL">TOTAL</div>
              <div class="element">€ {{ totalCost }}</div>
              <div class="element-kwh">for {{ totalCharge }} kWh</div>
            </div>
            <div class="pie-chart"><img class="series" src="@/assets/pie-chart-side.svg" /></div>
          </div>
        </div>
        <div class="buttons">
          <div class="frame-2">
            <div class="filter-side-panel">
              <div class="frame-3">
                <div class="charging">Newest first</div>
                <img class="icon-fill-chevron" src="@/assets/chevron-down.svg" />
              </div>
            </div>
            <div class="cost-kwh">
              <div class="cost"><div class="label">€</div></div>
              <div class="k-wh"><div class="label-2">kWh</div></div>
            </div>
          </div>
        </div>
        <div class="car-activity" v-if="props.costs.length > 0">
          <div class="item-car-activity" v-for="cost in props.costs" :key="cost.id">
            <div class="group-2">
              <div class="overlap-group-2">
                <div class="element-2">{{extractDay(cost.started_charging_at)}}</div>
                <div class="text-wrapper-2">Jan</div>
              </div>
            </div>
            <img class="vector" src="@/assets/vector-5.svg" />
            <div class="frame-4">
              <div class="frame-5">
                <img class="locations" src="@/assets/home-2.svg" />
                <div class="appwise-HQ">Home of user {{cost.user_id}}</div>
              </div>
              <div class="element-wrapper"><p class="p">{{extractHourMinute(cost.started_charging_at)}} - {{extractHourMinute(cost.finished_charging_at)}} | {{formatSecondsToHoursMinutes(cost.charging_time)}}</p></div>
            </div>
            <div class="frame-6"><div class="element-3"><img @mouseover="handleMouseOver($event, cost.anomaly_scores)"
                                                             @mousemove="handleMouseOver($event, cost.anomaly_scores)"
                                                             @mouseout="handleMouseOut"
                                                             v-if="cost.anomaly === -1" :src="getAnomalyImage(cost.anomaly_scores)" alt="Anomaly Image" class="anomaly-image" /> € {{cost.price}}</div></div>
          </div>
          <div v-if="showTooltip" class="tooltip" :style="{ top: `${tooltipPosition.y}px`, left: `${tooltipPosition.x}px` }">
            {{ tooltipText }}
          </div>
        </div>
        <p v-else>No costs found</p>
        <p v-if="props.isLoading">Loading...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-insights {
  position: absolute;
  width: 400px;
  height: 100%;
  background-color: rgb(59, 59, 60, 1);
  overflow: hidden;
  box-shadow: -4px 0px 16px 4px rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
}

.data-insights .frame {
  display: inline-flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  position: absolute;
}

.data-insights .sidepanel-header {
  display: inline-flex;
  flex-direction: column;
  max-width: 400px;
  align-items: flex-start;
  padding: 32px 32px 24px 32px;
  position: relative;
  flex: 0 0 auto;
  gap: 0;
}

.data-insights .ATOM-title {
  display: flex;
  width: 344px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 8px 0;
  position: relative;
  flex: 0 0 auto;
  margin-right: -8px;
}

.data-insights .div-wrapper {
  display: flex;
  max-width: 300px;
  width: 223.93px;
  align-items: center;
  gap: 16px;
  position: relative;
}

.data-insights .text-wrapper {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .cross {
  position: relative;
  width: 24px;
  height: 24px;
}

.data-insights .ATOM-icon-with-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0 4px 0;
  position: relative;
  flex: 0 0 auto;
}

.data-insights .headquarters {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(157, 156, 158, 1);
  font-size: 13px;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .chevron {
  position: relative;
  width: 13px;
  height: 13px;
}

.data-insights .div {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  gap: 16px;
  position: relative;
  margin-bottom: -9px;
  overflow-y: scroll;
}

.data-insights .month {
  position: relative;
  width: 190px;
  height: 35px;
}

.data-insights .overlap {
  position: relative;
  height: 31px;
}

.data-insights .oval {
  position: absolute;
  width: 324px;
  height: 31px;
  top: 0;
  left: 16px;
  background-color: rgba(28, 28, 28, 1);
  border-radius: 4px;
}

.data-insights .group {
  position: absolute;
  width: 26px;
  height: 31px;
  top: 0;
  left: 0;
  background-color: rgba(28, 28, 28, 1);
  border-radius: 4px;
}

.data-insights .fill {
  position: absolute;
  width: 26px;
  height: 31px;
  left: 12px;
}

.data-insights .fill-wrapper {
  position: absolute;
  width: 26px;
  height: 31px;
  top: 0;
  left: 314px;
  background-color: rgba(28, 28, 28, 1);
  border-radius: 4px;
  transform: rotate(-180deg);
}

.data-insights .chevron-month-left {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 10px;
  left: 10px;
}

.data-insights .chevron-month-right {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 10px;
  left: 163px;
}

.data-insights .this-year {
  position: absolute;
  height: 16px;
  top: 9px;
  left: 57px;
  font-family: var(--web-body-13-regular-font-family);
  font-weight: var(--web-body-13-regular-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-regular-font-size);
  text-align: center;
  letter-spacing: var(--web-body-13-regular-letter-spacing);
  line-height: var(--web-body-13-regular-line-height);
  font-style: var(--web-body-13-regular-font-style);
}

.data-insights .overlap-group-wrapper {
  position: absolute;
  width: 78px;
  height: 31px;
  top: 0;
  left: 172px;
}

.data-insights .overlap-group {
  position: relative;
  height: 37px;
  top: -1px;
  left: -1px;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: 2.81px;
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.data-insights .feb {
  position: absolute;
  width: 52px;
  top: 7px;
  left: 12px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.07800000160932541px;
  line-height: 18px;
  font-style: normal;
}

.data-insights .jan {
  position: absolute;
  width: 29px;
  top: 7px;
  left: 39px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .jan-2 {
  width: 31px;
  left: 110px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 7px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  font-size: 13px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .jan-3 {
  width: 29px;
  left: 266px;
  color: rgba(204, 204, 204, 1);
  position: absolute;
  top: 7px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  font-size: 13px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .div-2 {
  position: relative;
  width: 195px;
  height: 195px;
}

.data-insights .total {
  position: absolute;
  width: 69.5px;
  height: 63.5px;
  top: 64px;
  left: 70px;
}

.data-insights .ALL {
  position: absolute;
  top: 0;
  left: 13px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  font-size: 11px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .element {
  position: absolute;
  top: 19px;
  left: 0;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
  width: 65px;
  height: 30px;
}

.data-insights .element-kwh {
  position: absolute;
  top: 54px;
  left: 1px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  font-size: 11px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .pie-chart {
  position: absolute;
  width: 195px;
  height: 195px;
  top: 0;
  left: 0;
  background-image: url("@/assets/pie-chart-side.svg");
  background-size: cover;
  background-position: 50% 50%;
}

.data-insights .series {
  position: absolute;
  width: 195px;
  height: 195px;
  top: 0;
  left: 0;
  object-fit: cover;
}

.data-insights .buttons {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  flex: 0 0 auto;
}

.data-insights .frame-2 {
  display: inline-flex;
  align-items: center;
  gap: 52px;
  position: relative;
  flex: 0 0 auto;
}

.data-insights .filter-side-panel {
  display: flex;
  flex-direction: column;
  max-width: 170px;
  width: 172px;
  height: 37px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  margin-top: -1px;
  margin-bottom: -1px;
  margin-left: -1px;
  background-color: rgba(32, 32, 32, 1);
  border-radius: 2.76px;
  overflow: hidden;
  border: 1px solid;
  border-color: rgba(59, 59, 60, 1);
}

.data-insights .frame-3 {
  position: relative;
  width: 131px;
  height: 16.51px;
}

.data-insights .charging {
  position: absolute;
  height: 16px;
  top: -1px;
  left: -6px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .icon-fill-chevron {
  position: absolute;
  width: 17px;
  height: 17px;
  top: 0;
  left: 124px;
}

.data-insights .cost-kwh {
  display: flex;
  width: 120px;
  height: 37px;
  align-items: center;
  justify-content: center;
  padding: 2px;
  position: relative;
  margin-top: -1px;
  margin-bottom: -1px;
  margin-right: -1px;
  background-color: rgba(32, 32, 32, 1);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid;
  border-color: rgba(59, 59, 60, 1);
}

.data-insights .cost {
  display: flex;
  align-items: center;
  padding: 3px 10px;
  position: relative;
  flex: 1;
  align-self: stretch;
  flex-grow: 1;
  background-color: rgba(59, 59, 60, 1);
  border-radius: 3px;
}

.data-insights .label {
  position: relative;
  flex: 1;
  height: 18px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: normal;
}

.data-insights .k-wh {
  display: flex;
  align-items: center;
  padding: 3px 10px;
  position: relative;
  flex: 1;
  align-self: stretch;
  flex-grow: 1;
}

.data-insights .label-2 {
  position: relative;
  flex: 1;
  height: 18px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: normal;
}

.data-insights .car-activity {
  display: inline-flex;
  flex-direction: column;
  height: 337px;
  align-items: flex-start;
  gap: 8px;
  position: relative;
}

.data-insights .item-car-activity {
  display: flex;
  width: 340px;
  height: 60px;
  align-items: center;
  gap: 8px;
  padding: 0 8px 0 8px;
  position: relative;
  background-color: rgba(44, 44, 45, 1);
  border-radius: 4px;
}

.data-insights .group-2 {
  position: relative;
  width: 23.22px;
  height: 32px;
}

.data-insights .overlap-group-2 {
  position: relative;
  width: 19px;
  height: 32px;
}

.data-insights .element-2 {
  position: absolute;
  width: 19px;
  top: 12px;
  left: 0;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  text-align: center;
  letter-spacing: 0px;
  line-height: normal;
  font-style: normal;
}

.data-insights .text-wrapper-2 {
  position: absolute;
  top: 0;
  left: 1px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(157, 156, 158, 1);
  font-size: 10px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .vector {
  position: relative;
  width: 1px;
  height: 50px;
}

.data-insights .frame-4 {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  position: relative;
  flex: 0 0 auto;
}

.data-insights .frame-5 {
  display: inline-flex;
  align-items: flex-start;
  gap: 4px;
  position: relative;
  flex: 0 0 auto;
}

.data-insights .locations {
  position: relative;
  width: 16px;
  height: 16px;
}

.data-insights .appwise-HQ {
  position: relative;
  width: 185.26px;
  margin-top: -1px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  letter-spacing: 0;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: normal;
}

.data-insights .element-wrapper {
  position: relative;
  width: 133.51px;
  height: 16px;
}

.data-insights .p {
  position: absolute;
  width: 142px;
  top: 0;
  left: 0;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  font-size: 13px;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.data-insights .frame-6 {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  flex: 0 0 auto;
}

.data-insights .element-3 {
  position: relative;
  width: 73.46px;
  margin-top: -1px;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: right;
  letter-spacing: 0;
  line-height: normal;
  font-style: normal;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
  font-size: 12px;
}
</style>