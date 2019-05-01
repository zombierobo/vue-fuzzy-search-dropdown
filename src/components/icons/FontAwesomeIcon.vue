<template>
    <actual-font-awesome-icon :icon="icon" />
</template>

<script>
/**
 * Font aweseome library integration setup
 * https://github.com/FortAwesome/vue-fontawesome
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faAngleDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faTimes,
  faAngleDown,
  faArrowUp
);

export default {
  name: 'font-awesome-icon',
  props: {
    icon: String
  },
  components: {
    'actual-font-awesome-icon': FontAwesomeIcon
  }
};
</script>
