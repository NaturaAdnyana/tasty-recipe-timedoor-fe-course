<template>
  <div :class="{ 'input-wrapper': type == 'file' }">
    <label :for="identity" class="fw-semibold">
      {{ label }} <span style="color: #cb3a31">*</span>
      <slot></slot>
    </label>
    <input
      :class="[{ 'file-input': type == 'file' }, 'form-control']"
      :type="type"
      :id="identity"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readonly === '1'"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="$emit('keyInput', $event.target.value)"
      @focus="$emit('totalTimeFocus', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
  identity: { type: String, required: true },
  placeholder: { type: String, required: false },
  readonly: { type: String, required: true, default: "0" },
  isImage: { type: Boolean, required: true, default: false },
  modelValue: { type: [String, Number] },
});
</script>

<style>
.input-wrapper {
  padding: 0.375rem 0.75rem;
  width: 200px;
  text-align: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px solid #ced4da;
  background-color: #ced4da;
  border-radius: 0.375rem;
  margin-bottom: 10px;
  transition: all ls ease;
}

.input-wrapper:hover {
  background-color: #b9bec3;
}

.file-input {
  cursor: pointer;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  font-size: 50px;
  opacity: 0;
}
</style>
