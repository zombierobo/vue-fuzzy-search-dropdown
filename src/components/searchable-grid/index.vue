<template>
  <div class="searchable-grid" tabindex="-1" @keydown="componentLevelKeydown">
    <div class="searchable-grid__search-bar">
      <input
        :value="searchText"
        ref="searchInputRef"
        @input="onSearchInputChange"
        :placeholder="placeholder"
      >
    </div>
    <div class="searchable-grid__results" ref="elementListRef">
      <div
        @click="selectOption(element.target)"
        @keydown="onResultElementKeydown($event, element.target)"
        v-for="(element, index) in options"
        :key="index"
        class="searchable-grid__results_element"
        :class="{selected: element.target === selected}"
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
    padding-top: 6px;
    margin-bottom: 30px;
    text-align: center;

    & > input {
      font-size: inherit;
      border-radius: 6px;
      border: 1px solid #ccc;
      padding: 12px;
      width: 330px;
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
      border: 1px solid #eee;
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
import scrollIntoView from 'scroll-into-view-if-needed';

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
    this.focusSearchInput();
  },
  methods: {
    focusSearchInput: function() {
      this.$refs.searchInputRef.focus();
    },
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
    onResultElementKeydown: function(event, option) {
      switch (event.keyCode) {
        case 13:
          this.selectOption(option);
          break;
      }
    },
    componentLevelKeydown: function(event) {
      switch (event.keyCode) {
        case 38:
          this.handleArrowUp();
          break;
        case 40:
          this.handleArrowDown();
          break;
      }
    },
    handleArrowUp: function() {
      const currentFocusedIdx = this.currentFocusedElementIndex();
      if (currentFocusedIdx !== undefined) {
        if (currentFocusedIdx - 1 >= 0) {
          this.focusResultElement(currentFocusedIdx - 1);
        } else {
          this.focusSearchInput();
        }
      } else {
        if (this.options.length > 0) {
          this.focusResultElement(0);
        }
      }
    },
    handleArrowDown: function() {
      const currentFocusedIdx = this.currentFocusedElementIndex();
      if (currentFocusedIdx !== undefined) {
        if (currentFocusedIdx + 1 < this.options.length) {
          this.focusResultElement(currentFocusedIdx + 1);
        } else {
          this.focusSearchInput();
        }
      } else {
        if (this.options.length > 0) {
          this.focusResultElement(0);
        }
      }
    },
    focusResultElement: function(index) {
      if (
        this.$refs.elementListRef &&
        this.$refs.elementListRef.children &&
        this.$refs.elementListRef.children[index]
      ) {
        this.$refs.elementListRef.children[index].focus();
        scrollIntoView(this.$refs.elementListRef.children[index], {
          behavior: 'smooth',
          scrollMode: 'if-needed',
        });
      }
    },
    searchInputInFocus: function() {
      return this.$refs.searchInputRef === document.activeElement;
    },
    currentFocusedElementIndex: function() {
      if (this.$refs.elementListRef && this.$refs.elementListRef.children) {
        const resultElements = [...this.$refs.elementListRef.children]; // convert HTMLCollection to array
        return resultElements.findIndex(c => c === document.activeElement);
      }
    }
  }
};
</script>
