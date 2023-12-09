import AlertActionTypes from "./action-types";

export const addMensage = (payload) => ({
  type: AlertActionTypes.ADD_MSG,
  payload,
});
