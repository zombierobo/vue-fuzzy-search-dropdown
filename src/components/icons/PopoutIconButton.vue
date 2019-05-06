<template>
  <button :title="title" @click="clicked">
    <font-awesome-icon icon="search-plus"/>
  </button>
</template>

<style scoped>
button {
  margin: 0px;
  padding: 0px;
  border: none;
  background: none;
  display: block;
  font-size: 16px;
  color: #9a9a9a;
  transition: color 0.25s ease-in-out;
  cursor: pointer;
}
button:hover,
button:focus {
  color: #000;
}
</style>

<script>
import FontAwesomeIcon from './FontAwesomeIcon';

export default {
  name: 'pop-out-icon-button',
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  props: {
    title: String
  },
  methods: {
    clicked: function(event) {
      this.$emit('click', event);
    }
  }
};
</script>
