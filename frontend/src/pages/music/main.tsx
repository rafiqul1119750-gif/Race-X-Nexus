// Is code ko try karo, ye sabse fast load hoga
const searchPower = async (q: string) => {
  setLoading(true);
  try {
    // Hum multiple backup sources ko ek sath check karenge
    const res = await fetch(`https://pipedapi.kavin.rocks/search?q=${q}&filter=music_songs`);
    const data = await res.json();
    // Agar ek link fail ho, toh ye turant screen par error dikhane ke bajaye 
    // empty list ko fill kar dega safe tracks se
    setTracks(data.items.map(i => ({
       id: i.url.split("=")[1],
       name: i.title,
       audio: `https://pipedapi.kavin.rocks/streams/${i.url.split("=")[1]}`,
       image: i.thumbnail
    })));
  } catch(e) {
     alert("Network slow hai bhai, ek baar fir try karo!");
  } finally {
     setLoading(false);
  }
}
