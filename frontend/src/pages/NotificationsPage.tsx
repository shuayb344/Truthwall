import { useNotifications, useMarkAsRead, useMarkAllAsRead } from "@/hooks/useNotifications";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import NotificationItem from "@/components/notifications/NotificationItem";
import NotificationEmpty from "@/components/notifications/NotificationEmpty";
import NotificationSkeleton from "@/components/notifications/NotificationSkeleton";

export default function NotificationsPage() {
  const { data, isLoading, isError } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <>
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={() => markAllAsRead.mutate()}
        isMarkingAll={markAllAsRead.isPending}
      />

      <div>
        {/* Loading state */}
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <NotificationSkeleton key={i} />
            ))}
          </>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-[#999999] mb-2">Something went wrong loading notifications.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-[#E03030] hover:text-[#C42020] font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && notifications.length === 0 && (
          <NotificationEmpty />
        )}

        {/* Notification list */}
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
            onMarkRead={(id) => markAsRead.mutate(id)}
          />
        ))}
      </div>
    </>
  );
}