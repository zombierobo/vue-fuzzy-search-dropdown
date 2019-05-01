<template>
  <div id="app">
    <div class="quick-select-wrapper">
      <QuickSelect/>
    </div>
  </div>
</template>

<script>
import QuickSelect from './components/quick-select';

export default {
  name: 'app',
  components: {
    QuickSelect
  }
};
</script>

<style>

.quick-select-wrapper {
  margin: auto;
  width: 400px;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
