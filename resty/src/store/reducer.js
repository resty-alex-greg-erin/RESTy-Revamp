let initialState = {
  header: {},
  body: {},
  history: {
    swapi: { method: "GET", host: "swapi.co", path: "/api/planets/1/" }
  },
  headersVisible: false,
  host: "",
  method: "get",
  password: "",
  path: "",
  requestBody: "",
  token: "",
  url: "this is initialState url",
  username: ""
  ////////////ORIGINAL//////////////
  // url: "",
  // method: "get",
  // requestBody: "",
  // username: "",
  // password: "",
  // token: "",
  // header: {},
  // body: {},
  // history: {},
  // headersVisible: false
};

export default (state = initialState, action) => {
  let { type, payload = {} } = action;

  switch (type) {
    case "GET":
      return state;

    case "RESETFORM":
      return (state = payload);

    default:
      return state;
  }
};
