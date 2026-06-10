import { create } from "zustand";
 
interface UIState {
  isCreatePostOpen: boolean;
  isNotificationsOpen: boolean;
  unreadCount: number;
 
  openCreatePost: () => void;
  closeCreatePost: () => void;
  openNotifications: () => void;
  closeNotifications: () => void;
  setUnreadCount: (count: number) => void;
  decrementUnread: () => void;
}
 
const useUIStore = create<UIState>((set) => ({
  isCreatePostOpen: false,
  isNotificationsOpen: false,
  unreadCount: 0,
 
  openCreatePost: () => set({ isCreatePostOpen: true }),
  closeCreatePost: () => set({ isCreatePostOpen: false }),
  openNotifications: () => set({ isNotificationsOpen: true }),
  closeNotifications: () => set({ isNotificationsOpen: false }),
  setUnreadCount: (count) => set({ unreadCount: count }),
  decrementUnread: () =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
}));
 
export default useUIStore;
