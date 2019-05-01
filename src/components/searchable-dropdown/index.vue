<template>
  <div
    v-click-outside="clickedOutsideDropdown"
    class="searchable-dropdown"
    :class="{'expanded': dropdownOpen}"
    @keydown="onKeydown"
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
          ref="searchInputRef"
          :placeholder="!selected ? placeholder: ''"
        >
      </div>
      <div class="search-bar__actions">
        <CloseIconButton v-if="selected" @click="clearSelection" title="clear selection"/>
        <AngleDownIcon :reverseWithAnimation="dropdownOpen"/>
      </div>
    </div>
    <div v-if="dropdownOpen" class="searchable-dropdown__dropdown-content">
      <div class="searchable-dropdown_list" ref="elementListRef">
        <div
          @click="selectOption(element.target)"
          v-for="(element, index) in options"
          :key="index"
          class="searchable-dropdown_list_element"
          :class="{highlight: index === focusedElementIndex, selected: element.target === selected}"
          tabindex="-1"
          @blur="onResultElementBlur"
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
    font-size: 1rem;
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

    & > .searchable-dropdown_list {
      & > .searchable-dropdown_list_element {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 12px;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;

        &.highlight,
        &:hover {
          box-shadow: 0px 0px 3px 2px #eee;
        }
        &.selected {
          border: 1px solid #769eb4;
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
      inputFieldInFocus: false,
      focusedElementIndex: undefined
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
    clearFocusedElementIndex: function() {
      this.focusedElementIndex = undefined;
    },
    openDropdown: function() {
      this.dropdownOpen = true;
    },
    closeDropdown: function() {
      this.dropdownOpen = false;
      this.clearFocusedElementIndex();
    },
    clearSelection: function() {
      this.selectOption(undefined);
    },
    selectOption: function(option) {
      this.$emit('selection-change', option);
      this.updateSearchText('');
      this.closeDropdown();
      this.$refs.searchInputRef.blur();
    },
    updateSearchText: function(searchText) {
      this.$emit('searchText-change', searchText);
    },
    onSearchInputFocus: function() {
      this.inputFieldInFocus = true;
      this.openDropdown();
    },
    onSearchInputChange: function(event) {
      this.updateSearchText(event.target.value);
      this.openDropdown();
      this.clearFocusedElementIndex();
    },
    onSearchInputBlur: function() {
      this.inputFieldInFocus = false;
      /* concurrency issues with a list item selection and blur event triggered at the same time */
      setTimeout(() => {
        this.checkIfDropdownShouldClose();
      }, 200);
    },
    onResultElementBlur: function() {
      setTimeout(() => {
        if (!this.inputFieldInFocus) {
          this.checkIfDropdownShouldClose();
        }
      }, 200);
    },
    checkIfDropdownShouldClose: function() {
      if (!this.anyDropdownElementInFocus()) {
        this.updateSearchText('');
        this.closeDropdown();
      }
    },
    anyDropdownElementInFocus: function() {
      if (this.$refs.elementListRef && this.$refs.elementListRef.children) {
        const resultElements = [...this.$refs.elementListRef.children]; // convert HTMLCollection to array
        return resultElements.some(c => c === document.activeElement);
      }
    },
    onSearchInputClick: function(event) {
      event.preventDefault();
      if (!this.dropdownOpen) {
        this.$refs.searchInputRef.focus();
        this.openDropdown();
      } else {
        this.$refs.searchInputRef.blur();
        this.closeDropdown();
      }
    },
    focusActiveListItem: function(focusedElementIndex) {
      this.$refs.elementListRef.children[focusedElementIndex].focus();
    },
    onKeydown: function(event) {
      switch (event.keyCode) {
        case 38:
          if (this.focusedElementIndex === undefined) {
            this.focusedElementIndex = 0;
          } else if (this.focusedElementIndex > 0) {
            this.focusedElementIndex--;
          }
          this.focusActiveListItem(this.focusedElementIndex);
          break;
        case 40:
          if (this.inputFieldInFocus && !this.dropdownOpen) {
            this.openDropdown();
          }
          if (this.focusedElementIndex === undefined) {
            this.focusedElementIndex = 0;
          } else if (this.focusedElementIndex < this.options.length - 1) {
            this.focusedElementIndex++;
          }
          this.focusActiveListItem(this.focusedElementIndex);
          break;
        case 13:
          if (
            this.focusedElementIndex !== undefined &&
            this.focusedElementIndex < this.options.length
          ) {
            this.selectOption(this.options[this.focusedElementIndex].target);
          }
          break;
      }
    },
    clickedOutsideDropdown: function() {
      if (this.dropdownOpen) {
        this.closeDropdown();
      }
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
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
