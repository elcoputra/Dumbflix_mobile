import {
  // Get movie
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCSESS,
  GET_MOVIES_ERROR,

  // get tv
  GET_TV_REQUEST,
  GET_TV_SUCCSESS,
  GET_TV_ERROR,

  // get detail movie
  GET_DETAIL_MOVIE_SUCCSESS,
  GET_DETAIL_MOVIE_ERROR,
  GET_DETAIL_MOVIE_REQUEST,

  // add episode
  ADD_EPISODE_REQUEST,
  ADD_EPISODE_ERROR,
  ADD_EPISODE_SUCCSESS,

  // add movie
  ADD_MOVIE_SUCCSESS,
  ADD_MOVIE_ERROR,
  ADD_MOVIE_REQUEST,
  CLEAR_ADD_MOVIE_MESSAGE,
  CLEAR_ADD_MOVIE_ERROR,

  // update movie
  UPDATE_DETAIL_MOVIE_REQUEST,
  UPDATE_DETAIL_MOVIE_SUCCESS,
  UPDATE_DETAIL_MOVIE_ERROR,
  CLEAR_UPDATE_DETAIL_MOVIE_MESSAGE,
  CLEAR_UPDATE_DETAIL_MOVIE_ERROR,

  // delete movie
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCSESS,
  DELETE_MOVIE_ERROR,
  CLEAR_DELETE_MOVIE_MESSAGE,
  CLEAR_DELETE_MOVIE_ERROR,
} from '../actionTypes';
import { API } from '../../config/axiosConfig';
import { getDataEpisodes, addDataEpisodes } from '../actions/episode_action';

// add movie
export function addDataMovie(uploadFilm, uploadEpisodes) {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_MOVIE_REQUEST,
        payload: true,
      });
      const response = await API.post('/movie', uploadFilm);
      await dispatch({
        type: ADD_MOVIE_SUCCSESS,
        payload: response.data.message,
      });
      dispatch(addDataEpisodes(response.data.data.id, uploadEpisodes));
    } catch (error) {
      dispatch({
        type: ADD_MOVIE_ERROR,
        payload: error.response.data.error,
      });
    }
  };
}
// add movie snackbar
export function clearMessageAddMovieAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ADD_MOVIE_MESSAGE });
  };
}

export function clearErrorAddMovieAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ADD_MOVIE_ERROR });
  };
}

export function getDataMovie() {
  return function (dispatch) {
    dispatch({
      type: GET_MOVIES_REQUEST,
    });
    API.get('/category/1/movies')
      .then((response) =>
        dispatch({ type: GET_MOVIES_SUCCSESS, payload: response.data.data }),
      )
      .catch((response) =>
        dispatch({
          type: GET_MOVIES_ERROR,
          payload: response.error,
        }),
      );
  };
}

export function getDataTv() {
  return function (dispatch) {
    dispatch({
      type: GET_TV_REQUEST,
    });
    API.get('/category/2/movies')
      .then((response) =>
        dispatch({ type: GET_TV_SUCCSESS, payload: response.data.data }),
      )
      .catch((response) =>
        dispatch({
          type: GET_TV_ERROR,
          payload: response.error,
        }),
      );
  };
}

export function getDetailMovie(idMovie) {
  return function (dispatch) {
    dispatch({
      type: GET_DETAIL_MOVIE_REQUEST,
    });
    API.get('/movie/' + idMovie)
      .then((response) =>
        dispatch({
          type: GET_DETAIL_MOVIE_SUCCSESS,
          payload: response.data.data,
        }),
      )
      .catch((response) =>
        dispatch({
          type: GET_DETAIL_MOVIE_ERROR,
          payload: response.error,
        }),
      );
  };
}

export function addEpisode(movieId, dataEpisode) {
  return function (dispatch) {
    dispatch({
      type: ADD_EPISODE_REQUEST,
    });
    API.post('/episode', dataEpisode)
      .then(() => dispatch({ type: ADD_EPISODE_SUCCSESS, payload: false }))
      .then(() => dispatch(getDataEpisodes(movieId)))
      .catch((response) =>
        dispatch({
          type: ADD_EPISODE_ERROR,
          payload: response.error,
        }),
      );
  };
}

// Update movie async await
export function updateMovieAction(id, data) {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DETAIL_MOVIE_REQUEST,
      });
      const response = await API.patch('/movie/' + id, data);
      dispatch({
        type: UPDATE_DETAIL_MOVIE_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DETAIL_MOVIE_ERROR,
        payload: error.response.data.error,
      });
    }
  };
}

export function clearMessageUpdateMovieAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_UPDATE_DETAIL_MOVIE_MESSAGE });
  };
}

export function clearErrorUpdateMovieAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_UPDATE_DETAIL_MOVIE_ERROR });
  };
}

export function deleteMovieAction(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_MOVIE_REQUEST,
      });
      const response = await API.delete('/movie/' + id);
      dispatch({
        type: DELETE_MOVIE_SUCCSESS,
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MOVIE_ERROR,
        payload: error.response.data.error,
      });
    }
  };
}

export function clearMessageDeleteMovieAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_DELETE_MOVIE_MESSAGE });
  };
}

export function clearErrorDeleteMovieAction() {
  return function (dispatch) {
    dispatch({ type: CLEAR_DELETE_MOVIE_ERROR });
  };
}
