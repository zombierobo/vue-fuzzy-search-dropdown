<template>
  <div class="quick-select">
    <div class="search-dropdown-container">
      <SearchableDropdown
        :selected="selectedOptionAsObject"
        :options="optionsAfterSortAndFilter"
        :searchActive="searchActive"
        :searchText="filter.searchText"
        :placeholder="placeholder"
        @selection-change="updateSelection($event)"
        @searchText-change="updateSearchText($event)"
        @selection-active="updateDropdownSelectionActive"
        ref="searchableDropdownCompRef"
      />
    </div>
    <PopoutIconButton @click="openModal" title="Select in modal" :disableTabActivation="true"/>
    <Modal v-if="showModal" @close="closeModal">
      <div slot="body">
        <SearchableGrid
          :selected="selectedOptionAsObject"
          :options="optionsAfterSortAndFilter"
          :searchActive="searchActive"
          :searchText="filter.searchText"
          :placeholder="placeholder"
          @selection-change="updateSelectionFromGrid($event)"
          @searchText-change="updateSearchText($event)"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import SearchableDropdown from '../searchable-dropdown';
import SearchableGrid from '../searchable-grid';
import PopoutIconButton from '../icons/PopoutIconButton';
import { fuzzySort, highlightResult } from './utils/fuzzy-sort';
import Modal from '../modal';

export default {
  name: 'quick-select',
  components: {
    SearchableDropdown,
    PopoutIconButton,
    Modal,
    SearchableGrid
  },
  props: {
    options: Array,
    selected: String,
    placeholder: String
  },
  data: function() {
    return {
      showModal: false,
      filter: {
        searchText: ''
      }
    };
  },
  computed: {
    searchActive: function() {
      return this.filter.searchText.length > 0;
    },
    selectedOptionAsObject: function() {
      if (this.options && this.selected) {
        return this.options.find(o => o.id === this.selected);
      } else {
        return undefined;
      }
    },
    optionsAfterSortAndFilter: function() {
      const { searchText } = this.filter;
      return searchText
        ? fuzzySort(searchText, this.options, { key: 'displayText' }).map(
            sortedElement => ({
              target: sortedElement.obj,
              textWithMarkup: highlightResult(sortedElement)
            })
          )
        : this.options.map(o => ({ target: o }));
    }
  },
  methods: {
    updateSelection: function(option) {
      this.$emit('selection-change', option);
    },
    openModal: function() {
      this.showModal = true;
      this.$emit('selection-active', true);
    },
    closeModal: function() {
      this.showModal = false;
      this.$emit('selection-active', false);
    },
    updateDropdownSelectionActive: function(flag) {
      this.$emit('selection-active', flag);
    },
    updateSelectionFromGrid: function(option) {
      this.updateSelection(option);
      this.closeModal();
    },
    updateSearchText: function(searchText) {
      this.filter.searchText = searchText;
    },
    /**
     * exposed method for parent component to instruct this component to take focus.
     */
    takeFocus: function() {
      this.$refs.searchableDropdownCompRef.takeFocus();
    }
  }
};
</script>

<style scoped>
.quick-select {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-dropdown-container {
  width: calc(100% - 36px);
  margin-right: 12px;
}
</style>
