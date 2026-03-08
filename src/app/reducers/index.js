import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '../reducers/auth';

// Config
const sagaMiddleware = createSagaMiddleware();
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

// Only persist auth.data (token/user). Do not persist isLoading/isError/errorMessage
// so buttons only show loading when a request is actually in progress.
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['data'],
  stateReconciler: autoMergeLevel1,
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

  let persistor = persistStore(store);

  const runSaga = sagaMiddleware.run;

  return { store, persistor, runSaga };
};
