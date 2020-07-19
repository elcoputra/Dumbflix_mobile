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
  CLEAR_DELETE_EPISODE_BY_MOVIE_MESSAGE,
  CLEAR_DELETE_EPISODE_BY_MOVIE_ERROR,

  // update episode
  UPDATE_EPISODE_REQUEST,
  UPDATE_EPISODE_SUCCESS,
  UPDATE_EPISODE_ERROR,
  CLEAR_UPDATE_EPISODE_MESSAGE,
  CLEAR_UPDATE_EPISODE_ERROR,
} from '../actionTypes';

// add episode
const initialStateAddEpisode = {
  dataEpisode: [],
  loadingEpisode: false,

  messageBoolEpisodes: false,
  messageEpisodes: '',

  errorBoolEpisodes: false,
  errorEpisodes: '',
};

export const episodeAddReducer = (state = initialStateAddEpisode, action) => {
  switch (action.type) {
    case ADD_EPISODES_REQUEST:
      return {
        ...state,
        messageBoolEpisodes: false,
        errorBoolEpisodes: false,
        loadingEpisode: true,
      };
    case ADD_EPISODES_SUCCSESS:
      return {
        ...state,
        messageBoolEpisodes: true,
        errorBoolEpisodes: false,
        messageEpisodes: action.message,
        loadingEpisode: false,
        dataEpisode: action.payload,
      };
    case ADD_EPISODES_ERROR:
      return {
        ...state,
        messageBoolEpisodes: false,
        errorBoolEpisodes: true,
        loadingEpisode: false,
        errorEpisodes: action.payload,
      };
    case CLEAR_ADD_EPISODES_MESSAGE:
      return {
        ...state,
        messageBoolEpisodes: false,
      };
    case CLEAR_ADD_EPISODES_ERROR:
      return {
        ...state,
        errorBoolEpisodes: false,
      };
    default:
      return state;
  }
};

// get episode
const initialStateEpisode = {
  dataEpisode: [],
  loadingEpisode: false,
  errorEpisode: '',
};

export const episodeReducer = (state = initialStateEpisode, action) => {
  switch (action.type) {
    case GET_EPISODE_BY_MOVIE_REQUEST:
      return {
        ...state,
        loadingEpisode: true,
      };
    case GET_EPISODE_BY_MOVIE_SUCCSESS:
      return {
        ...state,
        loadingEpisode: false,
        dataEpisode: action.payload,
      };
    case GET_EPISODE_BY_MOVIE_ERROR:
      return {
        ...state,
        loadingEpisode: false,
        errorEpisode: action.payload,
      };
    default:
      return state;
  }
};

// Delete episode
const initialDeleteEpisode = {
  loadingDeleteEpisode: false,
  messageDeleteEpisodeBool: false,
  errorDeleteEpisodeBool: false,
  messageDeleteEpisode: '',
  errorDeleteEpisode: '',
};

export const deleteEpisodeReducer = (state = initialDeleteEpisode, action) => {
  switch (action.type) {
    case DELETE_EPISODE_BY_MOVIE_REQUEST:
      return {
        ...state,
        loadingDeleteEpisode: true,
      };
    case DELETE_EPISODE_BY_MOVIE_SUCCESS:
      return {
        ...state,
        loadingDeleteEpisode: false,
        messageDeleteEpisodeBool: true,
        messageDeleteEpisode: action.payload,
      };
    case DELETE_EPISODE_BY_MOVIE_ERROR:
      return {
        ...state,
        errorDeleteEpisodeBool: true,
        loadingDeleteEpisode: false,
        errorDeleteEpisode: action.payload,
      };
    case CLEAR_DELETE_EPISODE_BY_MOVIE_MESSAGE:
      return {
        ...state,
        messageDeleteEpisodeBool: false,
        messageDeleteEpisode: '',
      };
    case CLEAR_DELETE_EPISODE_BY_MOVIE_ERROR:
      return {
        ...state,
        errorDeleteEpisodeBool: false,
        errorDeleteEpisode: '',
      };
    default:
      return state;
  }
};

// Update episode
const initialDataUpdateEpisode = {
  loadingUpdateEpisode: false,
  messageUpdateEpisodeBool: false,
  errorUpdateEpisodeBool: false,
  messageUpdateEpisode: '',
  errorUpdateEpisode: '',
};
export const updateEpisodeReducer = (state = initialDataUpdateEpisode, action) => {
  switch (action.type) {
    case UPDATE_EPISODE_REQUEST:
      return {
        ...state,
        loadingUpdateEpisode: true,
      };
    case UPDATE_EPISODE_SUCCESS:
      return {
        ...state,
        loadingUpdateEpisode: false,
        messageUpdateEpisodeBool: true,
        messageUpdateEpisode: action.payload,
      };
    case UPDATE_EPISODE_ERROR:
      return {
        ...state,
        errorUpdateEpisodeBool: true,
        loadingUpdateEpisode: false,
        errorUpdateEpisode: action.payload,
      };
    case CLEAR_UPDATE_EPISODE_MESSAGE:
      return {
        ...state,
        messageUpdateEpisodeBool: false,
        messageUpdateEpisode: '',
      };
    case CLEAR_UPDATE_EPISODE_ERROR:
      return {
        ...state,
        errorUpdateEpisodeBool: false,
        errorUpdateEpisode: '',
      };
    default:
      return state;
  }
};
