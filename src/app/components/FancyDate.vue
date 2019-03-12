<template>
  <time v-if="showDate" :datetime="date">{{ getText }}</time>
  <em v-else-if="showEmptyDateNotification">Дата не указана</em>
</template>

<script>
import moment from 'moment';

import { dateIsYesterday, dateIsToday, dateIsTomorrow } from '@/app/utils/date';

moment.locale('ru');

export default {
  props: {
    date: { type: String, required: true },
    renderTime: { type: Boolean, default: false },
    showEmptyDateNotification: { type: Boolean, default: true },
  },
  computed: {
    showDate() {
      return ![undefined, null].includes(this.date);
    },
    ddate() {
      return moment(this.date, 'YYYY-MM-DD');
    },
    text() {
      if (this.ddate.isSame(dateIsYesterday, 'days')) {
        return 'вчера';
      }
      if (this.ddate.isSame(dateIsToday, 'days')) {
        return 'сегодня';
      }
      if (this.ddate.isSame(dateIsTomorrow, 'days')) {
        return 'завтра';
      }
      return this.ddate.format('D MMMM');
    },
    time() {
      return moment(this.date).format('HH:mm');
    },
    getText() {
      return this.renderTime ? `${this.text}, ${this.time}` : this.text;
    },
  },
};
</script>
