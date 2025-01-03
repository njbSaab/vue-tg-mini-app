<template>
  <div class="container tw-flex tw-flex-col">
    <h1>tg app</h1>
    <HomeVue />
  </div>

</template>

<script setup>
import HomeVue from '@/pages/HomeVue.vue';

</script>
<style>
.container{
  padding: 50px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
