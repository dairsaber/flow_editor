<template>
  <div>
    <div class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="less" scoped>
.title {
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}
.content {
  padding: 0.5rem;
}
</style>
