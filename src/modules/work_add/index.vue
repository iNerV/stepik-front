<template>
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      <h3>Отправка работы</h3>
      <p class="alert alert-success" v-if="isSubmitted">Работа отправлена, спасибо</p>
      <form @submit.prevent="addWork" v-else>
        <br>
        <p class="form-label">Имя участника</p>
        <AppInput required v-model="username" type="text" placeholder="Имя участника"/>
        <br>
        <p class="form-label">Электропочта</p>
        <AppInput required v-model="email" type="text" placeholder="Электропочта"/>
        <br>
        <p class="form-label">Работы в png</p>
        <input class="form-control block" type="file" ref="files" multiple required @change="handleFileUpload">
        <br>
        <AppBtn use="success" type="submit" :disabled="isSubmitting">Отправить</AppBtn>
      </form>
    </div>
  </div>
</template>

<script>
import AppBtn from '@/app/components/ui/AppBtn.vue';
import AppInput from '@/app/components/ui/AppInput.vue';

import { RepositoryFactory } from '@/api/RepositoryFactory';

const WorksRepository = RepositoryFactory.get('works');

export default {
  name: 'WorkAdd',
  components: {
    AppBtn,
    AppInput,
  },
  data() {
    return {
      email: '',
      username: '',
      files: [],
      isSubmitting: false,
      isSubmitted: false,
      isError: false,
    };
  },
  methods: {
    handleFileUpload() {
      // eslint-disable-next-line
      this.files = this.$refs.files.files;
    },
    async addWork() {
      try {
        this.isSubmitting = true;
        this.isError = false;
        const formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];

          formData.append(`files['${i}']`, file);
        }
        const { username, email } = this;
        formData.append('email', email);
        formData.append('username', username);
        await WorksRepository.addWork(formData);
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
