// src/utils/sendMessage.ts
interface SendMessageData {
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SendMessageResult {
  success: boolean;
  message: string;
}

const API_URL = "https://email-server-puce.vercel.app/api/sendEmailVatola";
const CLIENT_KEY = import.meta.env.VITE_CLIENT_KEY;

/**
 * Sends a message to the API.
 * @param data - Form data to send
 * @param setLoading - Optional callback to update loading state
 * @returns Promise with success status and message
 */
export async function sendMessage(
  data: SendMessageData,
  setLoading?: (loading: boolean) => void
): Promise<SendMessageResult> {
  try {
    setLoading?.(true);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CLIENT_KEY}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return {
      success: res.ok,
      message: result.message || (res.ok ? "Sent successfully" : "Failed to send"),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  } finally {
    setLoading?.(false);
  }
}
