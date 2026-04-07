import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 🎨 Race-X Tailwind Merger
 * Neon aur Glassmorphism effects ko bina kisi conflict ke combine karne ke liye.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 💎 Diamond & Gem Formatter
 * 1500 Diamonds ko "1.5K" aur 1000000 ko "1M" dikhane ke liye.
 */
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

/**
 * ⏳ Time Ago Logic (For Reels & Chats)
 * "2 hours ago", "Just now" etc.
 */
export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}
