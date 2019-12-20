export const addSession = (state, value) => {
  state.sessions.push(value);
};

export const removeSession = (state, value) => {
  console.log(state, value);
};
