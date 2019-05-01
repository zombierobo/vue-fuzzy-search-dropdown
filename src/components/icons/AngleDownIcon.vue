<template>
  <div class="icon-wrapper" :class="{reverse: reverseWithAnimation}">
    <font-awesome-icon icon="angle-down"/>
  </div>
</template>

<style scoped>

.icon-wrapper {
  transform: rotate(0deg);
  transition: transform 0.25s ease-in-out;
  display: flex;
  font-size: 21px;
  color: #9a9a9a;
}

.icon-wrapper.reverse {
  transform: rotate(180deg);
}

</style>

<script>
import FontAwesomeIcon from './FontAwesomeIcon';

export default {
  name: 'angle-down-icon',
  props: {
    reverseWithAnimation: Boolean
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  }
};
</script>
