import { configureStore } from '@reduxjs/toolkit';
import likeStore from './like';

export const store = configureStore({
  reducer: {
    fav: likeStore
  },
});
