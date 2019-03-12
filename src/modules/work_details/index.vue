<template>
  <div class="col-sm-8 col-sm-offset-2" v-if="work">
    <h3>Проверка работы</h3>
    <p class="alert alert-success" v-if="isSubmitted">Изменения сохранены</p>
    <AppImage :image="work.images[0].image"/>
    <p class="form-label">Имя участника</p>
    <AppInput :value="work.username" type="text" placeholder="username"/>
    <br>
    <p class="form-label">Электропочта</p>
    <AppInput :value="work.email" type="text" placeholder="Email"/>
    <br>
    <form @submit.prevent="addReview">
      <div class="row">
        <div class="col-xs-4">
          <p>Первая оценка</p>
          <AppInput v-model="_firstScore" type="text" placeholder="Первая оценка"/>
        </div>
        <div class="col-xs-4">
          <p>Вторая оценка</p>
          <AppInput v-model="_secondScore" type="text" placeholder="Вторая оценка"/>
        </div>
        <div class="col-xs-4">
          <p>Третья оценка</p>
          <AppInput v-model="_thirdScore" type="text" placeholder="Третья оценка"/>
        </div>
      </div>
      <br>
      <AppBtn use="success" type="submit" :disabled="isSubmitting || isSubmitted">Оценить</AppBtn>
    </form>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppBtn from '@/app/components/ui/AppBtn.vue';
import AppInput from '@/app/components/ui/AppInput.vue';
import AppImage from '@/app/components/AppImage.vue';

import { RepositoryFactory } from '@/api/RepositoryFactory';

import store from './_store';

const WorksRepository = RepositoryFactory.get('works');

const STORE_KEY = '$_work-details';

export default {
  name: 'WorkDetails',
  components: {
    AppBtn,
    AppInput,
    AppImage,
  },
  data() {
    return {
      firstScore: 0,
      secondScore: 0,
      thirdScore: 0,
      isSubmitting: false,
      isSubmitted: false,
      isError: false,
    };
  },
  computed: {
    ...mapGetters({
      work: `${STORE_KEY}/work`,
    }),
    _firstScore: {
      get() {
        return this.work.reviews ? this.work.reviews.first_score : 0;
      },
      set(score) {
        this.firstScore = score;
      },
    },
    _secondScore: {
      get() {
        return this.work.reviews ? this.work.reviews.second_score : 0;
      },
      set(score) {
        this.secondScore = score;
      },
    },
    _thirdScore: {
      get() {
        return this.work.reviews ? this.work.reviews.third_score : 0;
      },
      set(score) {
        this.thirdScore = score;
      },
    },
  },
  created() {
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  async mounted() {
    const workId = this.$route.params.id;
    await this.$store.dispatch(`${STORE_KEY}/getWorkDetails`, { workId });
  },
  methods: {
    addReview() {
      try {
        this.isSubmitting = true;
        this.isError = false;
        const { firstScore, secondScore, thirdScore } = this;
        const work = this.$route.params.id;
        WorksRepository.addReview({ first_score: firstScore, second_score: secondScore, third_score: thirdScore, work });
        this.isSubmitted = true;
      } catch (e) {
        this.isError = true;
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
