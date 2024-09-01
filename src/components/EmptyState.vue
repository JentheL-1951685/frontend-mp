<script>
export default {
  name: 'EmptyState'
}
</script>

<template>
  <div class="empty-state">
    <div class="div">
      <div class="info">
        <div class="empty-state-title">
          <img class="error_image" src="../assets/red_exclamation.svg">Page Not Available
        </div>
        <p class="empty-state-text">
          This section of the web application is not part of the master’s thesis of Jenthe Lowist.<br>
          Please navigate to other sections for relevant content and information.
        </p>
      </div>
      <img class="filler-image" src="@/assets/empty-state.svg">
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(44, 44, 45, 1);
  border-radius: 4px;
}

.empty-state .div {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.empty-state .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  width: 100%;
  height: 500px;
  margin-left: 100px;
}

.empty-state .empty-state-title {
  width: 100%;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 600;
  color: #FFFFFF;
  font-size: 24px;
  text-align: left;
}

.empty-state .error_image {
  height: 20px;
  padding-right: 10px;
}

.empty-state .empty-state-text {
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: #FFFFFF;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  width: 100%;
}

.empty-state .filler-image {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>