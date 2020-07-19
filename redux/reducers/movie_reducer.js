import {
  // GET Movie
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCSESS,
  GET_MOVIES_ERROR,

  // Get Tv
  GET_TV_REQUEST,
  GET_TV_SUCCSESS,
  GET_TV_ERROR,

  // Detail Movie
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCSESS,
  GET_DETAIL_MOVIE_ERROR,

  // Add Episode
  ADD_EPISODE_REQUEST,
  ADD_EPISODE_ERROR,
  ADD_EPISODE_SUCCSESS,

  // Add Movie
  ADD_MOVIE_SUCCSESS,
  ADD_MOVIE_ERROR,
  ADD_MOVIE_REQUEST,
  CLEAR_ADD_MOVIE_MESSAGE,
  CLEAR_ADD_MOVIE_ERROR,

  // Update Movie
  UPDATE_DETAIL_MOVIE_REQUEST,
  UPDATE_DETAIL_MOVIE_SUCCESS,
  UPDATE_DETAIL_MOVIE_ERROR,
  CLEAR_UPDATE_DETAIL_MOVIE_MESSAGE,
  CLEAR_UPDATE_DETAIL_MOVIE_ERROR,

  // Delete Movie
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCSESS,
  DELETE_MOVIE_ERROR,
  CLEAR_DELETE_MOVIE_MESSAGE,
  CLEAR_DELETE_MOVIE_ERROR,
} from '../actionTypes';

const initialStateAddMovie = {
  dataMovie: {},
  loadingAddMovie: false,

  // snackbar
  // string
  errorAddMovie: '',
  messageAddMovie: '',
  // bool
  errorBoolAddMovie: false,
  messageBoolAddMovie: false,
};

export const addMovieReducer = (state = initialStateAddMovie, action) => {
  switch (action.type) {
    case ADD_MOVIE_REQUEST:
      return {
        ...state,
        loadingAddMovie: true,
      };
    case ADD_MOVIE_SUCCSESS:
      return {
        ...state,
        loadingAddMovie: false,
        messageBoolAddMovie: true,
        messageAddMovie: action.payload,
      };
    case ADD_MOVIE_ERROR:
      return {
        ...state,
        loadingAddMovie: false,
        errorBoolAddMovie: true,
        errorAddMovie: action.payload,
      };
    case CLEAR_ADD_MOVIE_MESSAGE:
      return {
        ...state,
        messageBoolAddMovie: false,
        messageAddMovie: '',
      };
    case CLEAR_ADD_MOVIE_ERROR:
      return {
        ...state,
        errorBoolAddMovie: false,
        errorAddMovie: '',
      };
    default:
      return state;
  }
};

const initialStateAddEpisode = {
  loadingAddEpisode: false,
  errorAddEpisode: '',
};

export const addEpisode = (state = initialStateAddEpisode, action) => {
  switch (action.type) {
    case ADD_EPISODE_REQUEST:
      return {
        ...state,
        loadingAddEpisode: true,
      };
    case ADD_EPISODE_SUCCSESS:
      return {
        ...state,
        loadingAddEpisode: action.playload,
      };
    case ADD_EPISODE_ERROR:
      return {
        ...state,
        loadingAddEpisode: false,
        errorAddEpisode: action.playload,
      };
    default:
      return state;
  }
};

const initialStateMovie = {
  dataMovies: [],
  loading: false,
  error: '',
};
export const movieReducer = (state = initialStateMovie, action) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIES_SUCCSESS:
      return {
        ...state,
        loading: false,
        dataMovies: action.payload,
      };
    case GET_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialStateTV = {
  dataTvSeries: [],
  loadingTV: false,
  errorTV: '',
};

export const tvReducer = (state = initialStateTV, action) => {
  switch (action.type) {
    case GET_TV_REQUEST:
      return {
        ...state,
        loadingTV: true,
      };
    case GET_TV_SUCCSESS:
      return {
        ...state,
        loadingTV: false,
        dataTvSeries: action.payload,
      };
    case GET_TV_ERROR:
      return {
        ...state,
        loadingTV: false,
        errorTV: action.payload,
      };
    default:
      return state;
  }
};

const initialStateDetailMovie = {
  dataDetailMovie: [],
  loadingDetailMovie: false,
  errorDetailMovie: '',
};

export const detailMovieReducer = (state = initialStateDetailMovie, action) => {
  switch (action.type) {
    case GET_DETAIL_MOVIE_REQUEST:
      return {
        ...state,
        loadingDetailMovie: true,
      };
    case GET_DETAIL_MOVIE_SUCCSESS:
      return {
        ...state,
        loadingDetailMovie: false,
        dataDetailMovie: action.payload,
      };
    case GET_DETAIL_MOVIE_ERROR:
      return {
        ...state,
        loadingTV: false,
        errorDetailMovie: action.payload,
      };
    default:
      return state;
  }
};

// Update Movie
const initialUpdateMovie = {
  loadingUpdateMovie: false,
  messageUpdateMovieBool: false,
  errorUpdateMovieBool: false,
  messageUpdateMovie: '',
  errorUpdateMovie: '',
};

export const updateMovieReducer = (state = initialUpdateMovie, action) => {
  switch (action.type) {
    case UPDATE_DETAIL_MOVIE_REQUEST:
      return {
        ...state,
        loadingUpdateMovie: true,
      };
    case UPDATE_DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        loadingUpdateMovie: false,
        messageUpdateMovieBool: true,
        messageUpdateMovie: action.payload,
      };
    case UPDATE_DETAIL_MOVIE_ERROR:
      return {
        ...state,
        errorUpdateMovieBool: true,
        loadingUpdateMovie: false,
        errorUpdateMovie: action.payload,
      };
    case CLEAR_UPDATE_DETAIL_MOVIE_MESSAGE:
      return {
        ...state,
        messageUpdateMovieBool: false,
        messageUpdateMovie: '',
      };
    case CLEAR_UPDATE_DETAIL_MOVIE_ERROR:
      return {
        ...state,
        errorUpdateMovieBool: false,
        errorUpdateMovie: '',
      };
    default:
      return state;
  }
};
// Delete Movie
const initialDeleteMovie = {
  loadingDeleteMovie: false,
  messageDeleteMovieBool: false,
  errorDeleteMovieBool: false,
  messageDeleteMovie: '',
  errorDeleteMovie: '',
};

export const deleteMovieReducer = (state = initialDeleteMovie, action) => {
  switch (action.type) {
    case DELETE_MOVIE_REQUEST:
      return {
        ...state,
        loadingDeleteMovie: true,
      };
    case DELETE_MOVIE_SUCCSESS:
      return {
        ...state,
        loadingDeleteMovie: false,
        messageDeleteMovieBool: true,
        messageDeleteMovie: action.payload,
      };
    case DELETE_MOVIE_ERROR:
      return {
        ...state,
        errorDeleteMovieBool: true,
        loadingDeleteMovie: false,
        errorDeleteMovie: action.payload,
      };
    case CLEAR_DELETE_MOVIE_MESSAGE:
      return {
        ...state,
        messageDeleteMovieBool: false,
        messageDeleteMovie: '',
      };
    case CLEAR_DELETE_MOVIE_ERROR:
      return {
        ...state,
        errorDeleteMovieBool: false,
        errorDeleteMovie: '',
      };
    default:
      return state;
  }
};
