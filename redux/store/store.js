import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  modalRegisterReducer,
  modalLoginReducer,
  modalAddEpisodeReducer,
  modalUpdateEpisodeReducer,
} from '../reducers/modal_reducer';
import {
  movieReducer,
  tvReducer,
  addMovieReducer,
  detailMovieReducer,
  addEpisode,
  updateMovieReducer,
  deleteMovieReducer,
} from '../reducers/movie_reducer';
import {
  episodeReducer,
  episodeAddReducer,
  deleteEpisodeReducer,
  updateEpisodeReducer,
} from '../reducers/episode_reducer';
import {userReducer} from '../reducers/account_reducer';
import {authReducer} from '../reducers/auth_reducer';
import {upgradeReducer} from '../reducers/upgrade_reducer';
import {
  transactionsReducer,
  transactionByIdReducer,
} from '../reducers/transactions_reducer';
import {categoriesReducer} from '../reducers/categories_reducer';
// global reducer combine
const reducers = combineReducers({
  // User
  userReducer,
  authReducer,
  upgradeReducer,
  transactionsReducer,
  transactionByIdReducer,

  // Modal
  modalRegisterReducer,
  modalLoginReducer,
  modalAddEpisodeReducer,
  modalUpdateEpisodeReducer,

  // Movie
  movieReducer,
  updateMovieReducer,
  tvReducer,
  detailMovieReducer,
  addMovieReducer,
  deleteMovieReducer,

  // Episode
  addEpisode,
  episodeReducer,
  episodeAddReducer,
  deleteEpisodeReducer,
  updateEpisodeReducer,

  // Category
  categoriesReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
