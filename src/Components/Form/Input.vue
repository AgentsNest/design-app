<template>
  <input
    class="
      w-full
      my-3
      p-3
      rounded-xl
      focus:outline-none focus:border-indigo-500
      border
      bg-gray-100
      text-sm
    "
    required
    :class="{ 'border-red-500': !!error }"
    :type="type"
    @input="updateValue($event.target.value)"
    :value="value"
    :placeholder="placeholder"
  />
  <div class="text-xs text-red-400 mb-2 pl-4" v-if="!!error">{{ error }}</div>
</template>

<script>
export default {
  name: "Input",
  props: ["error", "label", "type", "value", "placeholder"],
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style></style>
