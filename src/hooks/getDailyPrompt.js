import { useQuery } from "@tanstack/react-query";

// export async function getPixabayImage(query) {
//   try {
//     const res = await fetch(
//       `https://pixabay.com/api/?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
//     );
//     const data = await res.json();
//     return data.hits[0]?.largeImageURL || null;
//   } catch (error) {
//     console.error("Pixabay API Error:", error);
//     return null;
//   }
// }

export function useDailyPrompt() {
  return useQuery({
    queryKey: ["dailyPrompt"],
    queryFn: async () => {
      try {
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();
        return data.slip.advice;
      } catch {
        return "What's on your mind today?";
      }
    },
    staleTime: 1000 * 60 * 60 * 12,
  });
}

// Optional: Function to force revalidate the cache
export async function revalidateDailyPrompt() {
  revalidateTag("daily-prompt");
}
