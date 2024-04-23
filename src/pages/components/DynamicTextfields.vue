<script setup lang="ts">
const props = defineProps(['inputs'])
const emit = defineEmits(['update:modelValue'])
const inputs = ref<Array<string>>(['Popup xpath'])

const changeHandler = (value, id) => {
  inputs.value[id] = value
  const filtered = inputs.value.filter((el) => el)
  emit('update:modelValue', filtered)
}

const clearHandler = (id) => {
  inputs.value.splice(id, 1)
  const filtered = inputs.value.filter((el) => el)
  emit('update:modelValue', filtered)
}

const clickHandler = () => {
  inputs.value.push('New popup xpath')
}

inputs.value = props.inputs || []
</script>

<template>
  <div>
    <div v-for="(input, id) in inputs" class="mb-2">
      <VTextField
        clearable
        :model-value="input"
        @update:modelValue="changeHandler($event, id)"
        @click:clear="clearHandler(id)"
      />
    </div>
    <VBtn
      @click="clickHandler"
      variant="text"
      size="small"
      class="mb-4"
    >
      New input
    </VBtn>
  </div>
</template>
