<template>
  <div class="container">
    <transition :name="transitionName" mode="out-in">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'DefaultLayout',
  components: {
  },
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    next();
  },
};
</script>

<style lang="scss">
.child-view {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide {
  &-left-enter,
  &-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
  }

  &-left-leave-active,
  &-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }
}
</style>
