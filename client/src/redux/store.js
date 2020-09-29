import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '../redux/sagas';
import rootReducer from '../redux/reducers';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [ 
      'registration',
      'users',
      'product',
      'alert',
      'productDialog'
    ]
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(/*middleware,*/ sagaMiddleware, thunk),
  );

  // TODO: Verify if initial state is not messing up persisted state
  const store = createStore(
    persistedReducer,
    // rootReducer,
    enhancer
  );
  const persistor = persistStore(store)
  sagaMiddleware.run(sagas);
  
  return { store, persistor };
}
