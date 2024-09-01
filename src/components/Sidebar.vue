<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const activeTab = ref('fleets')
    const showTooltip = ref(false)
    const tooltipPosition = ref({ x: 0, y: 0 })

    const navigateToFleets = () => {
      activeTab.value = 'fleets'
      router.push({ name: 'fleets' })
    }
    const navigateToEmptyState = (tab) => {
      activeTab.value = tab
      router.push({ name: 'EmptyState' })
    }

    const navigateToHelp = (tab) => {
      activeTab.value = tab
      router.push({ name: 'HelpPage' })
    }

    const handleMouseOver = (event) => {
      tooltipPosition.value = { x: event.clientX + 10, y: event.clientY + 10 }
      showTooltip.value = true
    }

    const handleMouseOut = () => {
      showTooltip.value = false
    }

    const fleetText = computed(() => {
      const userOverviewMatch = route.path.match(/^\/user-overview\/(\d+)\/(\d{4}-\d{2})$/)
      const costOverviewMatch = route.path.match(/^\/cost-overview\/(\d+)\/\d+\/(\d{4}-\d{2})$/);

      if (userOverviewMatch) {
        return `Fleet ${userOverviewMatch[1]}`
      } else if (costOverviewMatch) {
        return `Fleet ${costOverviewMatch[1]}`
      } else {
        return ''
      }
    })

    return {
      navigateToFleets,
      navigateToEmptyState,
      navigateToHelp,
      activeTab,
      showTooltip,
      tooltipPosition,
      handleMouseOver,
      handleMouseOut,
      fleetText
    }
  }
}
</script>

<template>
  <div class="sidebar-navigation">
    <div class="ATOM-sidebar">
      <div class="EEVEE-logo-wrapper">
        <div @click="navigateToFleets" style="cursor: pointer;" class="EEVEE-logo"></div>
      </div>
      <div class="div">
        <div
          @click="navigateToFleets"
          :class="['ATOM-sidebar-2', { 'active': activeTab === 'fleets' }]"
          style="cursor: pointer;"
        >
          <img class="img-2" src="@/assets/pie-chart.svg" />
          <div class="page-title">Data & insights</div>
        </div>
        <div
          @click="navigateToEmptyState('reimbursement')"
          :class="['ATOM-sidebar-2', { 'active': activeTab === 'reimbursement' }]"
          style="cursor: pointer;"
        >
          <img class="img-2" src="@/assets/arrow-rotate.svg" />
          <div class="page-title">Reimbursement</div>
        </div>
        <div
          @click="navigateToEmptyState('fleetOverview')"
          :class="['ATOM-sidebar-2', { 'active': activeTab === 'fleetOverview' }]"
          style="cursor: pointer;"
        >
          <img class="img-2" src="@/assets/car-side.svg" />
          <div class="page-title">Fleet overview</div>
        </div>
      </div>
    </div>
    <div class="ATOM-sidebar-3">
      <div class="buttons">
        <div
          class="frame-wrapper add-drivers"
          style="cursor: pointer;"
          @mouseover="handleMouseOver"
          @mousemove="handleMouseOver"
          @mouseout="handleMouseOut"
        >
          <div class="frame">
            <img class="img-2" src="@/assets/plus.svg" />
            <div class="add-something">Add drivers</div>
          </div>
        </div>
        <div
          class="frame-wrapper"
          style="cursor: pointer;"
          @mouseover="handleMouseOver"
          @mousemove="handleMouseOver"
          @mouseout="handleMouseOut"
        >
          <div class="frame">
            <img class="img-2" src="@/assets/sliders.svg" />
            <div class="add-something">Settings</div>
          </div>
        </div>
        <button
          class="div-wrapper"
          style="cursor: pointer;"
          @click="navigateToHelp"
        >
          <div class="frame">
            <img class="img-2" src="@/assets/questionmark.svg" />
            <div class="add-something">Help</div>
          </div>
        </button>
        <div @click="navigateToFleets" style="cursor: pointer;" class="main-button-2">
          <div class="frame">
            <img class="img-2" src="@/assets/arrow-rotate-2.svg" />
            <div class="add-something">Switch fleet</div>
          </div>
        </div>
      </div>
      <div class="list-divider">
        <div class="headquarters"></div>
        <div class="text-wrapper"></div>
        <img class="line" src="@/assets/questionmark.svg" />
      </div>
      <div class="text-button"><div class="total-cost">{{ fleetText }}</div></div>
    </div>
    <div v-if="showTooltip" class="tooltip" :style="{ top: `${tooltipPosition.y}px`, left: `${tooltipPosition.x}px` }">
      Not Available: This feature is not part of the master’s thesis and will not be developed.
    </div>
  </div>
</template>

<style scoped>
.sidebar-navigation {
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  background-color: var(--1-primitives-colour-grey-500);
}

.sidebar-navigation .ATOM-sidebar {
  display: inline-flex;
  align-items: flex-start;
  flex: 0 0 auto;
  flex-direction: column;
  position: relative;
}

.sidebar-navigation .EEVEE-logo-wrapper {
  display: flex;
  width: 170px;
  align-items: flex-start;
  justify-content: center;
  padding: var(--1-primitives-spacing-spacing-spacing-16) var(--1-primitives-spacing-spacing-spacing-20)
  var(--1-primitives-spacing-spacing-spacing-16) var(--1-primitives-spacing-spacing-spacing-20);
  flex: 0 0 auto;
  background-color: var(--1-primitives-colour-grey-500);
  flex-direction: column;
  position: relative;
  gap: var(--1-primitives-spacing-corners-rounded-corners-default);
}

.sidebar-navigation .EEVEE-logo {
  position: relative;
  width: 68.18px;
  height: 24px;
  background-image: url(@/assets/eevee_logo.png);
  background-size: cover;
  background-position: 50% 50%;
}

.sidebar-navigation .div {
  display: flex;
  width: 170px;
  height: 126px;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--1-primitives-colour-grey-500);
  flex-direction: column;
  position: relative;
}

.sidebar-navigation .img {
  position: relative;
  width: 170px;
  height: 42px;
}

.sidebar-navigation .ATOM-sidebar-2 {
  display: flex;
  width: 170px;
  height: 42px;
  align-items: center;
  gap: 9px;
  padding: var(--1-primitives-spacing-spacing-spacing-12) 0px var(--1-primitives-spacing-spacing-spacing-12)
  var(--1-primitives-spacing-spacing-spacing-20);
  position: relative;
}

.sidebar-navigation .ATOM-sidebar-2:hover {
  background: #3B3B3C;
}

.sidebar-navigation .ATOM-sidebar-2.active {
  background: radial-gradient(263.22% 448.86% at -97.59% 42.75%, rgba(77, 61, 143, 0.25) 0%, rgba(223, 103, 237, 0.25) 23.34%, rgba(226, 76, 38, 0.25) 64.86%, rgba(241, 136, 35, 0.25) 84.33%, rgba(58, 166, 194, 0.25) 100%);
}

.sidebar-navigation .data-insights {

}

.sidebar-navigation .img-2 {
  position: relative;
  width: 16px;
  height: 16px;
}

.sidebar-navigation .page-title {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: var(--web-body-14-regular-font-family);
  font-weight: var(--web-body-14-regular-font-weight);
  color: var(--1-primitives-colour-grey-150);
  font-size: var(--web-body-14-regular-font-size);
  letter-spacing: var(--web-body-14-regular-letter-spacing);
  line-height: var(--web-body-14-regular-line-height);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: var(--web-body-14-regular-font-style);
}

.sidebar-navigation .active-title {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: var(--web-body-14-regular-font-family);

  font-size: var(--web-body-14-regular-font-size);
  letter-spacing: var(--web-body-14-regular-letter-spacing);
  line-height: var(--web-body-14-regular-line-height);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: var(--web-body-14-regular-font-style);
}

.sidebar-navigation .ATOM-sidebar-3 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--1-primitives-spacing-spacing-spacing-10);
  padding: var(--1-primitives-spacing-spacing-spacing-32) var(--1-primitives-spacing-spacing-spacing-20)
  var(--1-primitives-spacing-spacing-spacing-20) var(--1-primitives-spacing-spacing-spacing-20);
  flex: 0 0 auto;
  background-color: var(--1-primitives-colour-grey-500);
  flex-direction: column;
  position: relative;
}

.sidebar-navigation .buttons {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--1-primitives-spacing-spacing-spacing-8);
  position: relative;
  flex: 0 0 auto;
}

.sidebar-navigation .main-button {
  position: relative;
  width: 130px;
  flex: 0 0 auto;
}

.sidebar-navigation .frame-wrapper {
  display: flex;
  width: 130px;
  align-items: center;
  gap: var(--1-primitives-spacing-spacing-spacing-10);
  padding: var(--1-primitives-spacing-spacing-spacing-8) var(--1-primitives-spacing-spacing-spacing-12)
  var(--1-primitives-spacing-spacing-spacing-8) var(--1-primitives-spacing-spacing-spacing-12);
  position: relative;
  flex: 0 0 auto;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: var(--1-primitives-spacing-corners-rounded-corners);
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.sidebar-navigation .frame {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  position: relative;
  flex: 0 0 auto;
  margin-right: -4px;
}

.add-drivers {
  background: linear-gradient(134.06deg, rgba(77, 61, 143, 0.25) -14.24%, rgba(223, 103, 237, 0.25) 14.74%, rgba(226, 76, 38, 0.25) 66.3%, rgba(241, 136, 35, 0.25) 90.47%, rgba(58, 166, 194, 0.25) 109.92%);
  border: 1px solid;
  border-image-source: linear-gradient(134.06deg, #4D3D8F -14.24%, #DF67ED 14.74%, #E24C26 66.3%, #F18823 90.47%, #3AA6C2 109.92%);
}

.sidebar-navigation .add-something {
  position: relative;
  width: 85px;
  height: 16px;
  margin-top: -1px;
  font-family: var(--web-body-13-semibold-font-family);
  font-weight: var(--web-body-13-semibold-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-semibold-font-size);
  letter-spacing: var(--web-body-13-semibold-letter-spacing);
  line-height: var(--web-body-13-semibold-line-height);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: var(--web-body-13-semibold-font-style);
}

.sidebar-navigation .div-wrapper {
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 130px;
  align-items: center;
  gap: var(--1-primitives-spacing-spacing-spacing-10);
  padding: var(--1-primitives-spacing-spacing-spacing-8) var(--1-primitives-spacing-spacing-spacing-12)
  var(--1-primitives-spacing-spacing-spacing-8) var(--1-primitives-spacing-spacing-spacing-12);
  position: relative;
  flex: 0 0 auto;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: var(--1-primitives-spacing-corners-rounded-corners);
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.sidebar-navigation .main-button-2 {
  display: flex;
  width: 130px;
  align-items: center;
  gap: var(--1-primitives-spacing-spacing-spacing-10);
  padding: var(--1-primitives-spacing-spacing-spacing-8) 12px var(--1-primitives-spacing-spacing-spacing-8)
  var(--1-primitives-spacing-spacing-spacing-12);
  position: relative;
  flex: 0 0 auto;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: var(--1-primitives-spacing-corners-rounded-corners);
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.sidebar-navigation .list-divider {
  display: flex;
  flex-wrap: wrap;
  height: 20px;
  align-items: center;
  justify-content: center;
  gap: 0px 0px;
  padding: var(--1-primitives-spacing-spacing-spacing-10) var(--1-primitives-spacing-corners-rounded-corners-default)
  var(--1-primitives-spacing-spacing-spacing-10) var(--1-primitives-spacing-corners-rounded-corners-default);
  position: relative;
  align-self: stretch;
  width: 100%;
}

.sidebar-navigation .headquarters {
  position: relative;
  width: 1px;
  height: 16.84px;
  margin-top: -9.42px;
  margin-bottom: -7.42px;
  font-family: var(--web-body-13-regular-font-family);
  font-weight: var(--web-body-13-regular-font-weight);
  color: var(--1-primitives-colour-grey-150);
  font-size: var(--web-body-13-regular-font-size);
  letter-spacing: var(--web-body-13-regular-letter-spacing);
  line-height: var(--web-body-13-regular-line-height);
  font-style: var(--web-body-13-regular-font-style);
}

.sidebar-navigation .text-wrapper {
  position: relative;
  width: 1px;
  height: 20px;
  margin-top: -11px;
  margin-bottom: -9px;
  font-family: var(--web-label-specials-15-regular-font-family);
  font-weight: var(--web-label-specials-15-regular-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-label-specials-15-regular-font-size);
  letter-spacing: var(--web-label-specials-15-regular-letter-spacing);
  line-height: var(--web-label-specials-15-regular-line-height);
  font-style: var(--web-label-specials-15-regular-font-style);
}

.sidebar-navigation .line {
  position: relative;
  flex: 1;
  flex-grow: 1;
  height: 1px;
  margin-bottom: -8410px;
  margin-right: -28311px;
}

.sidebar-navigation .text-button {
  display: flex;
  max-width: 130px;
  align-items: center;
  justify-content: center;
  gap: var(--1-primitives-spacing-spacing-spacing-8);
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
}

.sidebar-navigation .total-cost {
  position: relative;
  flex: 1;
  margin-top: -1px;
  font-family: var(--web-body-13-bold-font-family);
  font-weight: var(--web-body-13-bold-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-bold-font-size);
  text-align: center;
  letter-spacing: var(--web-body-13-bold-letter-spacing);
  line-height: var(--web-body-13-bold-line-height);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: var(--web-body-13-bold-font-style);
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