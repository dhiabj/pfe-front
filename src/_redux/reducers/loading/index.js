const initialState = {
  loadingProcesses: 0,
  loading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  let { loadingProcesses, loading } = state;
  const { type } = action;
  switch (type) {
    case "LOADING_START":
      loadingProcesses += 1;
      loading = true;
      return { loadingProcesses, loading };
    case "LOADING_FINISHED":
      loadingProcesses -= 1;
      if (loadingProcesses === 0 || loadingProcesses <= 0) {
        loading = false;
        loadingProcesses = 0;
      }
      return { loadingProcesses, loading };
    default:
      return state;
  }
};
