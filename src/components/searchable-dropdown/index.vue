<template>
  <div
    v-click-outside="clickedOutsideDropdown"
    class="searchable-dropdown"
    :class="{'expanded': dropdownOpen}"
    tabindex="-1"
  >
    <div class="searchable-dropdown__search-bar">
      <div
        @mousedown="onSearchInputClick"
        class="search-bar__input-area"
        :class="searchBarClassObject"
      >
        <span
          v-if="selected && !searchText"
          class="input-area__preview-text"
          :title="selected.displayText"
        >{{ selected.displayText }}</span>
        <input
          :value="searchText"
          @input="onSearchInputChange"
          @focus="onSearchInputFocus"
          @blur="onSearchInputBlur"
          @keydown="onInputElementKeydown"
          ref="searchInputRef"
          :placeholder="!selected ? placeholder: ''"
        >
      </div>
      <div class="search-bar__actions">
        <CloseIconButton v-if="selected" @click="clearSelection" title="clear selection"/>
        <AngleDownIcon :reverseWithAnimation="dropdownOpen"/>
      </div>
    </div>
    <div v-if="dropdownOpen" class="searchable-dropdown__dropdown-content" @mousedown.prevent>
      <div class="searchable-dropdown_list" ref="elementListRef">
        <div
          @click="selectOption(element.target)"
          v-for="(element, index) in options"
          :key="`item-${index}-${element.target.displayText}`"
          class="searchable-dropdown_list_element"
          :class="{selected: element.target === selected}"
        >
          <span class="searchable-dropdown_list_element_image-wrapper">
            <img v-if="element.target.previewUrl" :src="element.target.previewUrl">
          </span>
          <span
            v-if="searchActive"
            v-html="element.textWithMarkup"
            class="searchable-dropdown_list_element_title"
          ></span>
          <span v-else class="searchable-dropdown_list_element_title">{{element.target.displayText}}</span>
        </div>
        <div v-if="options.length === 0">No results found for the search</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchable-dropdown {
  position: relative;

  &.expanded {
    & > .searchable-dropdown__search-bar {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom-color: transparent;
    }
  }
  & > .searchable-dropdown__search-bar {
    display: flex;
    border: 1px solid #ccc;
    align-items: center;

    & > .search-bar__input-area {
      position: relative;
      flex-grow: 1;
      display: flex;
      align-items: center;
      & > input {
        flex-grow: 1;
        border: none;
        padding: 12px;
        &:focus {
          outline: none;
        }
      }
      & > .input-area__preview-text {
        position: absolute;
        left: 0px;
        padding: 12px;
        width: calc(100% - 24px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #737373;
        transition: color 0.25s ease-in-out;
      }
      &.selected {
        & > .input-area__preview-text {
          color: #000;
        }
      }
      &.in-focus {
        & > .input-area__preview-text {
          color: #737373;
        }
      }
    }

    & > .search-bar__actions {
      display: flex;
      margin: 0px 6px;
      align-items: center;

      & > *:not(:last-child) {
        margin-right: 12px;
      }
    }
  }

  .searchable-dropdown__search-bar,
  .search-bar__input-area > input {
    font-size: inherit;
  }
  .searchable-dropdown__search-bar,
  .searchable-dropdown__search-bar > .search-bar__input-area,
  .searchable-dropdown__search-bar > .search-bar__input-area > input {
    border-radius: 6px;
  }

  & > .searchable-dropdown__dropdown-content {
    position: absolute;
    left: 0;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 0px 0px 6px 6px;
    border-top: none;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    z-index: 101;
    background-color: #fff;
    max-height: 50vh;

    & > .searchable-dropdown_list {
      & > .searchable-dropdown_list_element {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 12px;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
          box-shadow: 0px 0px 3px 2px #eee;
        }
        &.selected {
          border: 1px solid #769eb4;
        }
        &.highlight {
          box-shadow: 0px 0px 3px 2px #D9E4EA;
        }
        & > .searchable-dropdown_list_element_image-wrapper {
          width: 135px;
          height: 135px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        & > .searchable-dropdown_list_element_image-wrapper > img {
          max-width: 100%;
          max-height: 100%;
        }
        & > .searchable-dropdown_list_element_title {
          word-break: break-all;
          max-width: calc(100% - 147px);
        }
      }
      & > .searchable-dropdown_list_element:not(:last-child) {
        margin-bottom: 9px;
      }
    }
  }
}
</style>

<script>
import CloseIconButton from '../icons/CloseIconButton';
import AngleDownIcon from '../icons/AngleDownIcon';
import scrollIntoView from 'scroll-into-view-if-needed';

export default {
  name: 'searchable-dropdown',
  components: {
    CloseIconButton,
    AngleDownIcon
  },
  props: {
    options: Array,
    selected: Object,
    searchText: String,
    searchActive: Boolean,
    placeholder: String
  },
  data: function() {
    return {
      dropdownOpen: false,
      inputFieldInFocus: false
    };
  },
  computed: {
    searchBarClassObject: function() {
      return {
        'in-focus': this.inputFieldInFocus,
        selected: this.selected
      };
    }
  },
  methods: {
    currentHighlightedElementIndex: function() {
      return this.$refs.elementListRef && this.$refs.elementListRef.children
        ? [...this.$refs.elementListRef.children] // convert HTMLCollection to array
            .findIndex(c => c.classList.contains('highlight'))
        : undefined;
    },
    focusSearchInput: function() {
      this.$refs.searchInputRef.focus();
    },
    blurSearchInput: function() {
      this.$refs.searchInputRef.blur();
    },
    openDropdown: function() {
      this.dropdownOpen = true;
    },
    closeDropdown: function() {
      this.dropdownOpen = false;
    },
    clearSelection: function() {
      this.selectOption(undefined);
    },
    selectOption: function(option) {
      this.$emit('selection-change', option);
      this.updateSearchText('');
      this.closeDropdown();
    },
    updateSearchText: function(searchText) {
      this.$emit('searchText-change', searchText);
    },
    onSearchInputFocus: function() {
      this.inputFieldInFocus = true;
      this.emitSelectionActiveState();
    },
    onSearchInputChange: function(event) {
      this.updateSearchText(event.target.value);
      this.openDropdown();
    },
    onSearchInputBlur: function() {
      this.inputFieldInFocus = false;
      this.closeDropdown()
      this.emitSelectionActiveState();
    },
    emitSelectionActiveState: function() {
      if (this.dropdownOpen || this.searchInputHasFocus()) {
        this.$emit('selection-active', true);
      } else {
        this.$emit('selection-active', false);
      }
    },
    searchInputHasFocus: function() {
      return this.$refs.searchInputRef === document.activeElement;
    },
    onSearchInputClick: function(event) {
      event.preventDefault();
      if (!this.dropdownOpen) {
        this.focusSearchInput();
        this.openDropdown();
      } else {
        this.blurSearchInput();
        this.closeDropdown();
      }
    },
    highlightResultElement: function(index) {
      if (this.$refs.elementListRef && this.$refs.elementListRef.children) {
        [...this.$refs.elementListRef.children].forEach(c =>
          c.classList.remove('highlight')
        );
        if (this.$refs.elementListRef.children[index]) {
          this.$refs.elementListRef.children[index].classList.add('highlight');
          scrollIntoView(this.$refs.elementListRef.children[index], {
            scrollMode: 'if-needed',
          });
        }
      }
    },
    onInputElementKeydown: function(event) {
      switch (event.keyCode) {
        case 38:
          event.preventDefault()
          this.handleArrowUp();
          break;
        case 40:
          event.preventDefault()
          this.openDropdown();
          this.handleArrowDown();
          break;
        case 13:
          const highlightedElementIdx = this.currentHighlightedElementIndex();
          if (
            this.dropdownOpen &&
            highlightedElementIdx > -1 &&
            highlightedElementIdx < this.options.length
          ) {
            this.selectOption(this.options[highlightedElementIdx].target);
          }
          break;
      }
    },
    handleArrowUp: function() {
      const highlightedElementIdx = this.currentHighlightedElementIndex();
      if (highlightedElementIdx !== undefined && highlightedElementIdx !== -1) {
        if (highlightedElementIdx - 1 >= 0) {
          this.highlightResultElement(highlightedElementIdx - 1);
        }
      } else {
        if (this.options.length > 0) {
          this.highlightResultElement(0);
        }
      }
    },
    handleArrowDown: function() {
      const highlightedElementIdx = this.currentHighlightedElementIndex();
      if (highlightedElementIdx !== undefined && highlightedElementIdx !== -1) {
        if (highlightedElementIdx + 1 < this.options.length) {
          this.highlightResultElement(highlightedElementIdx + 1);
        }
      } else {
        if (this.options.length > 0) {
          this.highlightResultElement(0);
        }
      }
    },
    clickedOutsideDropdown: function() {
      if (this.dropdownOpen) {
        this.closeDropdown();
      }
    },
    /**
     * exposed method for parent component to instruct this component to take focus.
     */
    takeFocus: function() {
      this.focusSearchInput();
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  }
};
</script>
