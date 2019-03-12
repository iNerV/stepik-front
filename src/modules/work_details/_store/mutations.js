const SET_WORK = (state, work) => {
  state.work = work;
};

const RESET_WORK = (state) => {
  state.work = null;
};

export default {
  SET_WORK,
  RESET_WORK,
};
