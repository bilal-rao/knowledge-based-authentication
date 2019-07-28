import {
  FETCH_ALL_FIELDS,
  FETCH_ALL_FIELD_SET,
  FETCH_INDIVIDUAL_FIELD_SET,
  FETCH_INDIVIDUAL_FIELD_SET_SUCCESS,
  FETCH_ALL_FIELD_SET_SUCCESS,
  FETCH_ALL_FIELDS_SUCCESS,
  SHOW_BUILDER_MESSAGE,
  ON_SHOW_BUILDER_LOADER,
  SCORE_CARD_FIELD
} from "../constants/ActionTypes";

export const fetchAllFields = () => {
  return {
    type: FETCH_ALL_FIELDS,
  };
};

export const fetchAllFieldsSuccess = fields => {
  return {
    type: FETCH_ALL_FIELDS_SUCCESS,
    payload: fields
  };
};

export const showBuilderMessage = message => {
  return {
    type: SHOW_BUILDER_MESSAGE,
    payload: message
  }
}


export const showBuilderLoader = () => {
  return {
    type: ON_SHOW_BUILDER_LOADER,
  };
};



export const fetchAllFieldSet = () => {
  return {
    type: FETCH_ALL_FIELD_SET,
  };
};

export const fetchAllFieldSetSuccess = fieldSet => {
  return {
    type: FETCH_ALL_FIELD_SET_SUCCESS,
    payload: fieldSet
  };
};

export const fetchIndividualFieldSet = data => {
  return {
    type: FETCH_INDIVIDUAL_FIELD_SET,
    payload: data
  };
};

export const fetchIndividualFieldSetSuccess = fieldSet => {
  return {
    type: FETCH_INDIVIDUAL_FIELD_SET_SUCCESS,
    payload: fieldSet
  };
};

export const scoreCardField = scoreFields => {
  return {
    type: SCORE_CARD_FIELD,
    payload: scoreFields
  };
};