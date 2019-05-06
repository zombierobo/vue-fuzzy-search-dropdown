<template>
  <transition name="modal">
    <div class="modal-mask" @keydown="onKeydown" tabindex="0">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content-wrapper">
            <slot name="header"></slot>
          </div>
          <span>
            <CloseIconButton @click="closeModal" title="close"/>
          </span>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 70%;
  height: calc(100% - 120px);
  margin: 60px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header-content-wrapper {
  flex-grow: 1;
}

.modal-body {
  margin-bottom: 15px;
  overflow: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<script>
import CloseIconButton from '../icons/CloseIconButton';

export default {
  name: 'modal',
  components: {
    CloseIconButton
  },
  methods: {
    onKeydown: function(event) {
      if (event.keyCode === 27) {
        this.closeModal();
      }
    },
    closeModal: function() {
      this.$emit('close');
    }
  }
};
</script>
