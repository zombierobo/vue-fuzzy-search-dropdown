<template>
  <div class="tag-filter">
    <div
      v-for="(tag, index) in tags"
      :class="{ 'tag-filter_item': true,  'tag-filter_item--selected': tag.selected}"
      :key="index"
      @click="tagClick(tag)"
    >{{tag.displayText}}</div>
  </div>
</template>

<style scoped>
.tag-filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.tag-filter > .tag-filter_item:not(:last-child) {
  margin-right: 6px;
}

.tag-filter_item {
  border: 1px solid transparent;
  border-radius: 18px;
  background-color: #f7f7f7;
  padding: 6px 15px;
  margin-bottom: 7px;
  font-size: 0.8rem;
  cursor: pointer;
}

.tag-filter_item--selected {
  background-color: #eee;
}
</style>

<script>
export default {
  props: {
    tags: Array
  },
  methods: {
    tagClick: function(tag) {
      this.$emit('tag-click', tag);
    }
  }
};
</script>

