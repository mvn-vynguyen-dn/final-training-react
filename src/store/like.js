import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: JSON.parse(localStorage.getItem('liked')) || [],
};


export const likeStore = createSlice({ 
  name: 'favourite',
  initialState,
  reducers: {
    toggle: (state, value) => {
      const idx = state.value.indexOf(value.payload);
      if (idx !== -1) {
        const newList = state.value.filter(i => i !== value.payload)
        localStorage.setItem('liked', JSON.stringify(newList))
        state.value = newList;
      } else {
        state.value.push(value.payload);
        localStorage.setItem('liked', JSON.stringify(state.value))
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = likeStore.actions;

export default likeStore.reducer;
