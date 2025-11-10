import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust import if needed

interface UnreadContextType {
  msgUnreadCount: number;
  roomUnreadCount: number;
  refreshCounts: () => Promise<void>;
}

const UnreadContext = createContext<UnreadContextType | undefined>(undefined);

export const UnreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [msgUnreadCount, setMsgUnreadCount] = useState(0);
  const [roomUnreadCount, setRoomUnreadCount] = useState(0);

  const fetchMsgUnreadCount = async () => {
    const { count, error } = await supabase
      .from("contacts")
      .select("id", { count: "exact", head: true })
      .eq("read", false);

    if (!error) setMsgUnreadCount(count ?? 0);
  };

  const fetchRoomUnreadCount = async () => {
    const { count, error } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending");

    if (!error) setRoomUnreadCount(count ?? 0);
  };

  const refreshCounts = async () => {
    await Promise.all([fetchMsgUnreadCount(), fetchRoomUnreadCount()]);
  };

  useEffect(() => {
    refreshCounts();
  }, []);

  return (
    <UnreadContext.Provider value={{ msgUnreadCount, roomUnreadCount, refreshCounts }}>
      {children}
    </UnreadContext.Provider>
  );
};

export const useUnread = () => {
  const context = useContext(UnreadContext);
  if (!context) throw new Error("useUnread must be used inside UnreadProvider");
  return context;
};
