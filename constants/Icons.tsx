import { Ionicons } from "@expo/vector-icons";

export const icon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="home" size={24} color={color} />
    ) : (
      <Ionicons name="home-outline" size={24} color={color} />
    ),
  discover: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="compass" size={25} color={color} />
    ) : (
      <Ionicons name="compass-outline" size={25} color={color} />
    ),
  saved: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="bookmarks" size={22} color={color} />
    ) : (
      <Ionicons name="bookmarks-outline" size={22} color={color} />
    ),
  settings: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="settings" size={24} color={color} />
    ) : (
      <Ionicons name="settings-outline" size={24} color={color} />
    ),
  // Thêm các icon cho màn hình auth/Register và auth/Login
  'auth/Register': ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="person-add" size={24} color={color} />
    ) : (
      <Ionicons name="person-add-outline" size={24} color={color} />
    ),
  'auth/Login': ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="log-in" size={24} color={color} />
    ) : (
      <Ionicons name="log-in-outline" size={24} color={color} />
    ),
} as const; // Thêm "as const" để giữ kiểu cố định
