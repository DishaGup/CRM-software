<template>
    <div
      class="show modal fade fadeIn"
      id="view modal"
      tabindex="-1"
      aria-hidden="true"
      :style="[{ display: 'block' }]"
    >
      <!--begin::Modal dialog-->
      <div
        class="modal-dialog modal-dialog-centered"
        :style="{
          maxWidth: width,
          minWidth: `min(90vw,${minWidth})`,
          ...otherStyles,
        }"
      >
        <!--begin::Modal content-->
        <div class="modal-content m-rounded">
          <!--begin::Modal header-->
          <div
            class="m-header d-flex justify-content-between align-items-center"
            id="edit-modal-header"
          >
            <div class="d-flex m-text align-items-center">
              <div>
                <span>{{ $props.headerName }}</span>
              </div>
            </div>
            <div class="d-flex align-items-center" @click.stop>
              <div
                class="cross-btn cursor-pointer c-ml-12"
                @click="handleClickEvent('close')"
              >
                <span class="">
                 X
                </span>
              </div>
            </div>
          </div>
          <!--end::Modal header-->
  
          <!--begin::Modal body-->
  
          <div :class="{ 'scroll-y m-body': !hideOverflow }">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[
        'modal-backdrop fade show',
       
      ]"
    
    ></div>
  </template>
  
  <script lang="ts" setup>
 
  const emit = defineEmits(["close"]);
 
  </script>
  <style lang="scss" scoped>
  .m-rounded {
    // border-radius: 12px;
  }
  
  .m-header {
    height: 80px;
    width: 100%;
    border-radius: inherit;
    padding: 24px 24px;
    // font-family:'Manrope';
    background: #f7fafc;
    font-weight: 600;
    font-size: 1.26rem;
    line-height: 24px;
    color: #333333;
  }
  
  .cross-btn {
    height: 40px;
    width: 40px;
  }
  .c-ml-12 {
    margin-left: 12px;
  }
  .modal-content {
    overflow: hidden;
    max-height: 88%;
  }
  .modal-dialog {
    height: 100%;
  }
  .ov-hidden {
    overflow: hidden;
  }
  .m-body {
    border-radius: inherit;
    padding: 24px;
    background: #ffffff;
    .m-body-content {
      min-height: 200px;
    }
    .b-audit {
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .create-user {
      color: #3e92cc;
      font-weight: 600;
    }
  }
  .side-background {
    background: rgba(0, 0, 0, 0.5) !important;
    z-index: 100;
    opacity: 1 !important;
    width: 100%;
  }
  </style>
  