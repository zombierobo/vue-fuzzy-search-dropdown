<template>
  <div class="quick-select">
    <div class="search-dropdown-container">
      <SearchableDropdown
        :selected="selected"
        :options="optionsAfterSortAndFilter"
        :searchActive="searchActive"
        :searchText="filter.searchText"
        :placeholder="placeholder"
        @selection-change="updateSelection($event)"
        @searchText-change="updateSearchText($event)"
      />
    </div>
    <PopoutIconButton @click="openModal" title="Select in modal"/>
    <Modal v-if="showModal" @close="closeModal">
      <div slot="body">
        <SearchableGrid
          :selected="selected"
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
import Modal from '../modal';
import mockOptions from '../../mock/mock-options';
import { fuzzySort, highlightResult } from './utils/fuzzy-sort';

export default {
  name: 'quick-select',
  components: {
    SearchableDropdown,
    PopoutIconButton,
    Modal,
    SearchableGrid
  },
  data: function() {
    return {
      options: mockOptions,
      selected: undefined,
      showModal: false,
      placeholder: 'Type here to search and select',
      filter: {
        searchText: ''
      }
    };
  },
  computed: {
    searchActive: function() {
      return this.filter.searchText.length > 0;
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
        : this.options.map(o => ({
            target: o
          }));
    }
  },
  methods: {
    updateSelection: function(option) {
      this.selected = option;
    },
    openModal: function() {
      this.showModal = true;
    },
    closeModal: function() {
      this.showModal = false;
    },
    updateSelectionFromGrid: function(option) {
      this.updateSelection(option);
      this.closeModal();
    },
    updateSearchText: function(searchText) {
      this.filter.searchText = searchText;
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