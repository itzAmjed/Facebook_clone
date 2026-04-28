
import { useSelector, useDispatch } from 'react-redux';
import { openChatBox, minimizeChatBox, closeChatBox , selectFriend , clearFriend} from '../store/uiSlice';

export function useUI() {
  const isChatboxVisible = useSelector(state => state.ui.isChatboxVisible);
  const isMinimized = useSelector(state => state.ui.isMinimized);
  const selectedFriend = useSelector(state => state.ui.selectedFriend);
  const dispatch = useDispatch();

  return {
    isChatboxVisible,
    isMinimized,
    selectedFriend,
    openChatBox: () => dispatch(openChatBox()),
    minimizeChatBox: () => dispatch(minimizeChatBox()),
    closeChatBox: () => dispatch(closeChatBox()),
    selectFriend: (friend) => dispatch(selectFriend(friend)),
    clearFriend: () => dispatch(clearFriend()),
  };
}