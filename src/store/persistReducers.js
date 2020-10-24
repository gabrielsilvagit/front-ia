import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'wz2/crm',
      storage,
      whitelist: ['auth', 'user', 'app'],
    },
    reducers
  );

  return persistedReducer;
};
