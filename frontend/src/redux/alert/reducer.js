import AlertActionTypes from "./action-types";

const initialState = {
  msg: {
    status: false,
    title: "",
    type: "",
    text: "",
  },
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case AlertActionTypes.ADD_MSG:
      return {
        ...state,
        msg: action.payload,
      };

    default:
      return state;
  }
};

export default alertReducer;
