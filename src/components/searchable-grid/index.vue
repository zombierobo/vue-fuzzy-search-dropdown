<template>
  <div class="searchable-grid">
    <div class="searchable-grid__search-bar">
      <input
        :value="searchText"
        ref="searchInputRef"
        @input="onSearchInputChange"
        :placeholder="placeholder"
      >
    </div>
    <div class="searchable-grid__results">
      <div
        @click="selectOption(element.target)"
        @keydown="onKeydown($event, element.target)"
        v-for="(element, index) in options"
        :key="index"
        class="searchable-grid__results_element"
        tabindex="0"
      >
        <span class="searchable-grid__results_element_image-wrapper">
          <img v-if="element.target.previewUrl" :src="element.target.previewUrl">
        </span>
        <span
          v-if="searchActive"
          v-html="element.textWithMarkup"
          class="searchable-grid__results_element_title"
        ></span>
        <span v-else class="searchable-grid__results_element_title">{{element.target.displayText}}</span>
      </div>
      <div v-if="options.length === 0">No results found for the search</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchable-grid {
  & > .searchable-grid__search-bar {
    margin: 30px 0px;
    text-align: center;

    & > input {
      border-radius: 6px;
      border: 1px solid #CCC;
      padding: 12px;
      width: 330px;
      font-size: 1rem;
    }
  }

  & > .searchable-grid__results {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    & > .searchable-grid__results_element {
      display: flex;
      align-items: center;
      flex-direction: column;
      border: 1px solid #EEE;
      padding: 21px;
      margin-bottom: 21px;
      margin-right: 21px;
      border-radius: 3px;
      cursor: pointer;

      &:hover,
      &:focus {
        box-shadow: 0px 0px 3px 2px #eee;
      }
      &.selected {
        border: 1px solid #769eb4;
      }
      & > .searchable-grid__results_element_image-wrapper {
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
      }
      & > .searchable-grid__results_element_image-wrapper > img {
        max-width: 100%;
        max-height: 100%;
      }
      & > .searchable-grid__results_element_title {
        max-width: calc(300px - 42px);
        word-break: break-word;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'searchable-grid',
  props: {
    options: Array,
    selected: Object,
    searchText: String,
    searchActive: Boolean,
    placeholder: String
  },
  mounted: function() {
    this.$refs.searchInputRef.focus();
  },
  methods: {
    updateSearchText: function(searchText) {
      this.$emit('searchText-change', searchText);
    },
    onSearchInputChange: function(event) {
      this.updateSearchText(event.target.value);
    },
    selectOption: function(option) {
      this.$emit('selection-change', option);
      this.updateSearchText('');
    },
    onKeydown: function(event, option) {
      switch (event.keyCode) {
        case 13:
          this.selectOption(option);
          break;
      }
    }
  }
};
</script>

