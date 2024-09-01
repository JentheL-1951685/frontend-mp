<script>
export default {
  data() {
    return {
      currentDate: new Date(2024, 0, 1), // Initialize with January 2024
    };
  },
  computed: {
    formattedDate() {
      const options = { year: 'numeric', month: 'long' };
      return this.currentDate.toLocaleDateString('nl-NL', options);
    },
    isOnUserOverview() {
      return this.$route.path.startsWith('/user-overview/');
    },
  },
  methods: {
    updateRoute() {
      const year = this.currentDate.getFullYear();
      const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
      const fleetId = this.$route.params.fleet_id;
      this.$router.push(`/user-overview/${fleetId}/${year}-${month}`)
        .then(() => {
          window.location.reload(); // Reload the page after the route is updated
        });
    },
    goToPreviousMonth() {
      if (this.isOnUserOverview) {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.currentDate = new Date(this.currentDate); // To trigger reactivity
        this.updateRoute();
      }
    },
    goToNextMonth() {
      if (this.isOnUserOverview) {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.currentDate = new Date(this.currentDate); // To trigger reactivity
        this.updateRoute();
      }
    },
  },
  watch: {
    '$route.params.month'(newDate) {
      if (newDate) {
        const [year, month] = newDate.split('-');
        if (year && month) {
          this.currentDate = new Date(year, month - 1);
        }
      }
    },
  },
  created() {
    if (this.isOnUserOverview) {
      const [year, month] = this.$route.params.month ? this.$route.params.month.split('-') : [2024, 0];
      this.currentDate = new Date(year, month - 1);
    }
  }
};
</script>

<template>
  <div class="filter-bar-header">
    <div class="frame">
      <div class="month">
        <div class="overlap-group">
          <img
            class="img"
            src="../assets/chevron-left.svg"
            :class="{ 'disabled': !isOnUserOverview }"
            @click="goToPreviousMonth"
          />
          <div class="this-year">{{ formattedDate }}</div>
          <img
            class="chevron"
            src="../assets/chevron-right.svg"
            :class="{ 'disabled': !isOnUserOverview }"
            @click="goToNextMonth"
          />
        </div>
      </div>
      <div class="filter">
        <div class="div">
          <img class="img-2" src="@/assets/filter.svg" />
          <div class="charging">All entities</div>
        </div>
        <img class="img-2" src="../assets/chevron-down.svg" />
      </div>
    </div>
    <div class="frame">
      <div class="cost-kwh-filter">
        <div class="cost"><div class="label">€</div></div>
        <div class="k-wh"><div class="text-wrapper">kWh</div></div>
      </div>
      <button class="download-button">
        <div class="dropdown-item">
          <div class="frame-2">
            <img class="img-2" src="@/assets/download.svg" />
            <div class="charging-2">Download</div>
          </div>
          <img class="chevron-2" src="../assets/chevron-down.svg" />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar-header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.filter-bar-header .frame {
  display: inline-flex;
  align-items: flex-start;
  gap: 15px;
  position: relative;
  flex: 0 0 auto;
}

.filter-bar-header .month {
  position: relative;
  width: 190px;
  height: 35px;
}

.filter-bar-header .overlap-group {
  position: relative;
  height: 37px;
  top: -1px;
  left: -1px;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: 2.81px;
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.filter-bar-header .chevron {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 10px;
  left: 163px;
}

.filter-bar-header .img {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 10px;
  left: 10px;
}

.filter-bar-header .this-year {
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

.filter-bar-header .filter {
  display: flex;
  width: 217px;
  height: 37px;
  align-items: center;
  justify-content: space-between;
  padding: 0px var(--1-primitives-spacing-spacing-spacing-16) 0px var(--1-primitives-spacing-spacing-spacing-16);
  position: relative;
  margin-top: -1px;
  margin-bottom: -1px;
  margin-right: -1px;
  background-color: var(--1-primitives-colour-grey-500);
  border-radius: var(--1-primitives-spacing-spacing-spacing-4);
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.filter-bar-header .div {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  flex: 1;
  flex-grow: 1;
}

.filter-bar-header .img-2 {
  position: relative;
  width: 17px;
  height: 16.51px;
}

.filter-bar-header .charging {
  position: relative;
  width: fit-content;
  margin-top: -0.74px;
  font-family: var(--web-body-13-regular-font-family);
  font-weight: var(--web-body-13-regular-font-weight);
  color: var(--1-primitives-colour-grey-150);
  font-size: var(--web-body-13-regular-font-size);
  letter-spacing: var(--web-body-13-regular-letter-spacing);
  line-height: var(--web-body-13-regular-line-height);
  font-style: var(--web-body-13-regular-font-style);
}

.filter-bar-header .cost-kwh-filter {
  display: flex;
  width: 120px;
  height: 37px;
  align-items: center;
  justify-content: center;
  padding: 2px;
  position: relative;
  margin-top: -1px;
  margin-bottom: -1px;
  margin-left: -1px;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.filter-bar-header .cost {
  display: flex;
  align-items: center;
  padding: 3px 10px;
  position: relative;
  flex: 1;
  align-self: stretch;
  flex-grow: 1;
  background-color: var(--1-primitives-colour-grey-400);
  border-radius: 3px;
}

.filter-bar-header .label {
  position: relative;
  flex: 1;
  height: 18px;
  font-family: var(--web-body-13-semibold-font-family);
  font-weight: var(--web-body-13-semibold-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-semibold-font-size);
  text-align: center;
  letter-spacing: var(--web-body-13-semibold-letter-spacing);
  line-height: var(--web-body-13-semibold-line-height);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: var(--web-body-13-semibold-font-style);
}

.filter-bar-header .k-wh {
  display: flex;
  align-items: center;
  padding: 3px 10px;
  position: relative;
  flex: 1;
  align-self: stretch;
  flex-grow: 1;
}

.filter-bar-header .text-wrapper {
  position: relative;
  flex: 1;
  height: 18px;
  font-family: var(--web-body-13-regular-font-family);
  font-weight: var(--web-body-13-regular-font-weight);
  color: var(--1-primitives-colour-grey-white);
  font-size: var(--web-body-13-regular-font-size);
  text-align: center;
  letter-spacing: var(--web-body-13-regular-letter-spacing);
  line-height: var(--web-body-13-regular-line-height);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-style: var(--web-body-13-regular-font-style);
}

.filter-bar-header .download-button {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex: 0 0 auto;
}

.filter-bar-header .dropdown-item {
  display: flex;
  width: 132px;
  height: 35px;
  align-items: center;
  gap: var(--1-primitives-spacing-spacing-spacing-8);
  padding: 0px var(--1-primitives-spacing-spacing-spacing-16) 0px var(--1-primitives-spacing-spacing-spacing-16);
  position: relative;
  background-color: var(--1-primitives-colour-grey-550);
  border-radius: var(--1-primitives-spacing-corners-rounded-corners);
  border: 1px solid;
  border-color: var(--1-primitives-colour-grey-400);
}

.filter-bar-header .frame-2 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  flex: 0 0 auto;
}

.filter-bar-header .charging-2 {
  position: relative;
  width: fit-content;
  margin-top: -0.74px;
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

.filter-bar-header .chevron-2 {
  position: relative;
  width: 17px;
  height: 16.51px;
  margin-right: -7px;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>