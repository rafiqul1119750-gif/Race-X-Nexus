import { QueryClient } from "@tanstack/react-query";

/**
 * 🚀 RACE-X REALTIME ENGINE (Query Client)
 * Ye file aapke API calls ko cache karti hai taaki Reels 
 * aur AI images instant load honge (Zero Lag).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ⏱️ 5 Minutes tak data fresh rahega
      staleTime: 1000 * 60 * 5, 
      // 🔄 Background mein data update hota rahega
      refetchOnWindowFocus: true,
      // 🛡️ Error hone par 3 baar retry karega
      retry: 3,
    },
  },
});

// Exporting for global use in main.tsx
export default queryClient;
