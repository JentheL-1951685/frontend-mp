<template>
  <div class="summary-cards">
    <div class="insights-card">
      <div class="element">€ 1.639</div>
      <div class="text-wrapper">AVG € 320/driver</div>
      <div class="ATOM-location">
        <div class="div">Home</div>
        <img class="img" src="@/assets/home.svg" />
      </div>
    </div>
    <div class="insights-card-2">
      <div class="element">€ 2.038</div>
      <div class="text-wrapper">AVG € 502/driver</div>
      <div class="ATOM-location">
        <div class="work">Public</div>
        <img class="img" src="@/assets/credit-card.svg" />
      </div>
    </div>
    <div class="insights-card-3">
      <div class="element">~ € 1.234</div>
      <div class="text-wrapper">AVG € 201/driver</div>
      <div class="ATOM-location">
        <div class="div">Work</div>
        <img class="img" src="@/assets/work.svg" />
      </div>
    </div>
    <div class="insights-card-4">
      <div class="insights-content">
        <div class="div">All locations</div>
        <div class="element">€ 4.965</div>
        <div class="text-wrapper">AVG 294 kWh/driver</div>
      </div>
      <div class="circle-graph"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryCards'
}
</script>

<style scoped>
.summary-cards {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 116px;
}

.summary-cards .insights-card {
  position: absolute;
  width: 206px;
  height: 116px;
  top: 0;
  left: 317px;
  background-color: #232323;
  border-radius: 4px;
  display: flex;
  flex: 1;
}

.summary-cards .element {
  position: absolute;
  color: var(--1-primitives-colour-grey-white);
  white-space: nowrap;
  width: 145.21px;
  height: 17.91px;
  top: 57.26px;
  left: 30.74px;
  font-family: var(--FontFamilyDesktop);
  font-size: var(--FontSize18);
  font-weight: 700;
  line-height: 22.63px;
  text-align: left;

}

.summary-cards .text-wrapper {
  position: absolute;
  color: var(--1-primitives-colour-grey-150);
  letter-spacing: var(--web-label-specials-11-regular-letter-spacing);
  white-space: nowrap;
  font-style: var(--web-label-specials-11-regular-font-style);
  width: 169.03px;
  height: 16px;
  top: 83.59px;
  left: 31.92px;
  font-family: var(--FontFamilyDesktop);
  font-size: var(--FontSize13);
  font-weight: 400;
  line-height: 16.34px;
  text-align: left;
}

.summary-cards .ATOM-location {
  position: absolute;
  width: 68px;
  height: 21px;
  top: 21px;
  left: 18px;
}

.summary-cards .div {
  position: absolute;
  width: 41px;
  top: 3px;
  left: 34px;
  opacity: 0.6;
  font-family: var(--web-body-13-regular-font-family);
  font-weight: var(--web-body-13-regular-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-regular-font-size);
  letter-spacing: var(--web-body-13-regular-letter-spacing);
  line-height: var(--web-body-13-regular-line-height);
  white-space: nowrap;
  font-style: var(--web-body-13-regular-font-style);
}

.summary-cards .img {
  position: absolute;
  width: 21px;
  height: 21px;
  top: 0;
  left: 0;
}

.summary-cards .insights-card-2 {
  width: 206px;
  left: 536px;
  background-color: #232323;
  border-radius: 4px;
  position: absolute;
  height: 116px;
  top: 0;
  flex: 1;
}

.summary-cards .work {
  position: absolute;
  width: 41px;
  top: 1px;
  left: 34px;
  opacity: 0.6;
  font-family: var(--web-body-13-regular-font-family);
  font-weight: var(--web-body-13-regular-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-regular-font-size);
  letter-spacing: var(--web-body-13-regular-letter-spacing);
  line-height: var(--web-body-13-regular-line-height);
  white-space: nowrap;
  font-style: var(--web-body-13-regular-font-style);
}

.summary-cards .insights-card-3 {
  width: 206px;
  left: 754px;
  background-color: #232323;
  border-radius: 4px;
  position: absolute;
  height: 116px;
  top: 0;
  flex: 1;
}

.summary-cards .insights-card-4 {
  width: 304px;
  left: 0;
  background: radial-gradient(263.22% 448.86% at -97.59% 42.75%, rgba(77, 61, 143, 0.25) 0%, rgba(223, 103, 237, 0.25) 23.34%, rgba(226, 76, 38, 0.25) 64.86%, rgba(241, 136, 35, 0.25) 84.33%, rgba(58, 166, 194, 0.25) 100%);
  border-radius: 4px;
  position: absolute;
  height: 116px;
  top: 0;
  flex: 1;
}

.summary-cards .insights-card-4 .div {
  width: 100.74px;
  height: 21px;
  top: 21px;
  left: 26.69px;
  padding: 4px 0.35px 1px 4.01px;
}

.summary-cards .circle-graph {
  position: absolute;
  background: url('@/assets/group.svg') no-repeat center center;
  width: 66.87px;
  height: 66px;
  top: 25px;
  left: 202.63px;
}
</style>