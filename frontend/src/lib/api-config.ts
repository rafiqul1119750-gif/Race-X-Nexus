// Is file mein saari API logic aur endpoints honge
export const API_CONFIG = {
  ELEVEN_LABS: {
    base_url: "https://api.elevenlabs.io/v1",
    key: localStorage.getItem("api_eleven") || "",
  },
  HUGGING_FACE: {
    base_url: "https://api-inference.huggingface.co/models",
    key: localStorage.getItem("api_hugging") || "",
  },
  PIXABAY: {
    base_url: "https://pixabay.com/api/",
    key: localStorage.getItem("api_pixabay") || "",
  },
  PEXELS: {
    base_url: "https://api.pexels.com/v1/",
    key: localStorage.getItem("api_pexels") || "",
  }
};
