<template>
  <div id="app">
    <div class="quick-select-wrapper">
      <QuickSelect
        ref="quickSelectRef"
        :options="options"
        :selected="selected ? selected.id: undefined"
        @selection-change="selected = $event"
        :placeholder="'Type here to search and select'"
      />
    </div>
  </div>
</template>

<script>
import QuickSelect from './components/quick-select';
import mockOptions from './mock/mock-options';

export default {
  name: 'app',
  mounted: function() {
    this.$refs.quickSelectRef.takeFocus();
  },
  data: function() {
    return {
      options: mockOptions,
      selected: undefined
    };
  },
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
  font-size: 1rem;
}
</style>
