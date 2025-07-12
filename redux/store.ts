import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  applyMiddleware() // Add middleware here if needed
);

export default store;