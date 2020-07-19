import {
  // get episode
  GET_EPISODE_BY_MOVIE_ERROR,
  GET_EPISODE_BY_MOVIE_SUCCSESS,
  GET_EPISODE_BY_MOVIE_REQUEST,

  // add episode
  ADD_EPISODES_ERROR,
  ADD_EPISODES_REQUEST,
  ADD_EPISODES_SUCCSESS,
  CLEAR_ADD_EPISODES_MESSAGE,
  CLEAR_ADD_EPISODES_ERROR,

  // delete episode
  DELETE_EPISODE_BY_MOVIE_REQUEST,
  DELETE_EPISODE_BY_MOVIE_SUCCESS,
  DELETE_EPISODE_BY_MOVIE_ERROR,
  CLEAR_UPDATE_DETAIL_MOVIE_MESSAGE,
  CLEAR_UPDATE_DETAIL_MOVIE_ERROR,

  // update episode
  UPDATE_EPISODE_REQUEST,
  UPDATE_EPISODE_SUCCESS,
  UPDATE_EPISODE_ERROR,
  CLEAR_UPDATE_EPISODE_MESSAGE,
  CLEAR_UPDATE_EPISODE_ERROR,
} from '../actionTypes';
import { API } from '../../config/axiosConfig';

export function addDataEpisodes(movieId, bulkEpisodes) {
  return function (dispatch) {
    var result = bulkEpisodes.map(function (o) {
      o.movieId = movieId;
      return o;
    });
    dispatch({
      type: ADD_EPISODES_REQUEST,
      payload: true,
    });
    API.post('/episodes', result)
      .then((response) =>
        dispatch({
          type: ADD_EPISODES_SUCCSESS,
          payload: response.data,
          message: response.data.message,
        }),
      )
      .catch((response) =>
        dispatch({
          type: ADD_EPISODES_ERROR,
          payload: response.response.data.error,
        }),
      );
  };
}
export function clearMessageAddEpisodeAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ADD_EPISODES_MESSAGE });
  };
}

export function clearErrorAddEpisodeAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ADD_EPISODES_ERROR });
  };
}

export function getDataEpisodes(movieId) {
  return function (dispatch) {
    dispatch({
      type: GET_EPISODE_BY_MOVIE_REQUEST,
      payload: true,
    });
    API.get('/movie/' + movieId + '/episodes')
      .then((response) =>
        dispatch({
          type: GET_EPISODE_BY_MOVIE_SUCCSESS,
          payload: response.data.data,
        }),
      )
      .catch((response) =>
        dispatch({
          type: GET_EPISODE_BY_MOVIE_ERROR,
          payload: response.error,
        }),
      );
  };
}

// Delete episode async await
export function deleteEpisodeAction(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_EPISODE_BY_MOVIE_REQUEST,
      });
      const response = await API.delete('/episode/' + id);
      dispatch({
        type: DELETE_EPISODE_BY_MOVIE_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_EPISODE_BY_MOVIE_ERROR,
        payload: error.response.data.error,
      });
    }
  };
}

export function clearMessageDeleteEpisodeAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_UPDATE_DETAIL_MOVIE_MESSAGE });
  };
}

export function clearErrorDeleteEpisodeAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_UPDATE_DETAIL_MOVIE_ERROR });
  };
}
// update episode async await
export function updateEpisodeAction(id, data) {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EPISODE_REQUEST,
      });
      const response = await API.patch('/episode/' + id, data);
      dispatch({
        type: UPDATE_EPISODE_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EPISODE_ERROR,
        payload: error.response.data.error,
      });
    }
  };
}

export function clearMessageUpdateEpisodeAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_UPDATE_EPISODE_MESSAGE });
  };
}

export function clearErrorUpdateEpisodeAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_UPDATE_EPISODE_ERROR });
  };
}
