<template>
  <div class="home">
    <hero-header></hero-header>
    <app-feature></app-feature>
    <app-plans></app-plans>
    <contact-us></contact-us>
  </div>
</template>

<script>
import HeroHeader from '@/components/HeroHeader.vue';
import AppFeature from '@/components/AppFeature.vue';
import AppPlans from '@/components/AppPlans.vue';
import ContactUs from '@/components/ContactUs.vue';

export default {
  name: 'Home',
  components: {
    HeroHeader,
    AppFeature,
    AppPlans,
    ContactUs,
  }
}
</script>
