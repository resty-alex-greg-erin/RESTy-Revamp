export const get = () => {
  return {
    type: "GET",

  };
};

export const resetForm = (payload) => {
  return {
    type: "RESETFORM",
    payload: payload,
  };
};
