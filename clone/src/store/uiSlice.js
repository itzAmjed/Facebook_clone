import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isChatboxVisible: false,
    isMinimized: false,
      selectedFriend: null

  },
  reducers: {
    openChatBox: (state) => {
      state.isChatboxVisible = true;
      state.isMinimized = false;
    },
    minimizeChatBox: (state) => {
      state.isChatboxVisible = false;
      state.isMinimized = true;
    },
    closeChatBox: (state) => {
      state.isChatboxVisible = false;
      state.isMinimized = false;
    },
    selectFriend: (state, action) => {
      state.selectedFriend = action.payload;
    },
    clearFriend: (state) => {
  state.selectedFriend = null;
}

  }
});
export const { openChatBox, minimizeChatBox, closeChatBox, selectFriend, clearFriend } = uiSlice.actions;
export default uiSlice.reducer;
