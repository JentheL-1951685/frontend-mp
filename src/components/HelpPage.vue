<script>
export default {
  name: 'HelpPage'
}
</script>

<template>
  <div class="help-page">
    <div class="content-container">
      <div class="info">
        <div class="help-page-title">
          Help Page
        </div>
        <p class="help-page-text">
          The anomaly scores are calculated by an underlying machine learning algorithm.
          To help you quickly identify and assess potential issues, the application uses color-coded exclamation symbols next to charging costs based on their anomaly scores:

          <span class="exclamation-title"><img class="exclamation-image" src="@/assets/yellow_exclamation.svg"> Yellow Exclamation:</span>
          <span class="explanation">Anomaly Score: Between -0.1 and 0</span>
          A yellow symbol indicates a <span class="minor-anomaly">minor anomaly</span>.
          The corresponding charging cost is slightly unusual but not necessarily a cause for concern.
          It’s worth reviewing, but it might be within an acceptable variance.

          <span class="exclamation-title"><img class="exclamation-image" src="@/assets/orange_exclamation.svg"> Orange Exclamation:</span>
          <span class="explanation">Anomaly Score: Between -0.3 and -0.1</span>
          An orange symbol signifies a <span class="moderate-anomaly">moderate anomaly</span>.
          The cost is more unusual and might indicate a potential issue that should be investigated.
          This could be an warning sign of something abnormal.

          <span class="exclamation-title"><img class="exclamation-image" src="@/assets/red_exclamation.svg"> Red Exclamation:</span>
          <span class="explanation">Anomaly Score: Between -0.3 and -0.5</span>
          A red symbol represents a <span class="severe-anomaly">severe anomaly</span>.
          The corresponding charging cost is significantly different from what’s expected and likely indicates a problem that requires immediate attention.
          This is the highest level of alert.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-page {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(44, 44, 45, 1);
  border-radius: 4px;
}

.help-page .content-container {
  position: relative;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.help-page .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  gap: 20px;
}

.help-page .help-page-title {
  width: 100%;
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 600;
  color: #FFFFFF;
  font-size: 28px;
  display: flex;
  align-items: center;
}

.help-page .help-page-text {
  font-family: "Source Sans Pro", Helvetica;
  font-weight: 400;
  color: #DDDDDD;
  font-size: 18px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.help-page .help-page-text .exclamation-title {
  display: block;
  font-weight: 600;
  margin-top: 10px;
}

.help-page .help-page-text .explanation {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.help-page .help-page-text .minor-anomaly {
  font-weight: 600;
  color: #FFE444;
}

.help-page .help-page-text .moderate-anomaly {
  font-weight: 600;
  color: #FF653C;
}

.help-page .help-page-text .severe-anomaly {
  font-weight: 600;
  color: #F2324F;
}

@media (max-width: 768px) {
  .help-page .content-container {
    padding: 15px;
  }

  .help-page .help-page-title {
    font-size: 24px;
  }

  .help-page .help-page-text {
    font-size: 16px;
  }
}
</style>