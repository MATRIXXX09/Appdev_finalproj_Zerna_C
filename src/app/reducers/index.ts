import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from './auth';
import bookings from './bookings';
import { RootState } from '../../types';

const sagaMiddleware = createSagaMiddleware();
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['data'],
  stateReconciler: autoMergeLevel1,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth as any),
  bookings,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer as any);

interface StoreConfig {
  store: Store<RootState>;
  persistor: Persistor;
  runSaga: any;
}

export default (): StoreConfig => {
  const store = createStore(persistedReducer as any, applyMiddleware(sagaMiddleware)) as Store<RootState>;
  const persistor = persistStore(store);
  const runSaga = sagaMiddleware.run;

  return { store, persistor, runSaga };
};
