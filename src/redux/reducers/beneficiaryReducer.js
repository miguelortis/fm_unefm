import {
  BENEFICIARY_LIST_FAIL,
  BENEFICIARY_LIST_REQUEST,
  BENEFICIARY_LIST_RESET,
  BENEFICIARY_LIST_SUCCESS,
} from "../constants/beneficiaryConstants";

export const beneficiaryListReducer = (state = {}, action) => {
  switch (action.type) {
    case BENEFICIARY_LIST_REQUEST:
      return { loadingBeneficiaryList: true };
    case BENEFICIARY_LIST_SUCCESS:
      return {
        loadingBeneficiaryList: false,
        successBeneficiaryList: true,
        beneficiaryList: action.payload,
      };
    case BENEFICIARY_LIST_FAIL:
      return {
        loadingBeneficiaryList: false,
        errorBeneficiaryList: action.payload,
      };
    case BENEFICIARY_LIST_RESET:
      return {};
    default:
      return state;
  }
};
