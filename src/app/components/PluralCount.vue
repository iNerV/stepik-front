<template>
  <span class="plural-count">
    <template v-if="countTag.length"><component :is="countTag">{{ count }} </component>{{ variant }}</template>
    <template v-else>{{ count }} {{ variant }}</template>
  </span>
</template>

<script>
import noun from 'plural-ru';

export default {
  name: 'PluralCount',
  props: {
    count: { type: Number, required: true },
    pluralVariants: { type: Array, required: true },
    countTag: { type: String, default: '' },
  },
  computed: {
    variant() {
      return noun(this.count, ...this.pluralVariants);
    },
  },
};
</script>
