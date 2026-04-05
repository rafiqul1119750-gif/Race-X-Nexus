import React, { useEffect, useState } from "react";

/* =========================
   TYPES
========================= */
type Page =
  | "splash"
  | "signin"
  | "signup"
  | "terms"
  | "hub"
  | "social"
  | "explore"
  | "create"
  | "activity"
  | "profile"
  | "chat"
  | "studio"
  | "music"
  | "shop"
  | "magic";

/* =========================
   MAIN APP
========================= */
export default function Home() {
  const [page, setPage] = useState<Page>("splash");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    setTimeout(() => setPage("signin"), 1500);
  }, []);

  return <div>{renderPage(page, setPage, agreed, setAgreed)}</div>;
}

/* =========================
   ROUTER
========================= */
function renderPage(
  page: Page,
  setPage: any,
  agreed: boolean,
  setAgreed: any
) {
  switch (page) {
    case "splash":
      return <Splash />;
    case "signin":
      return <SignIn setPage={setPage} />;
    case "signup":
      return <SignUp setPage={setPage} />;
    case "terms":
      return (
        <Terms agreed={agreed} setAgreed={setAgreed} setPage={setPage} />
      );
    case "hub":
      return <Hub setPage={setPage} />;
    case "social":
      return <Social setPage={setPage} />;
    case "chat":
      return <Chat setPage={setPage} />;
    case "studio":
      return <Studio setPage={setPage} />;
    case "music":
      return <Music setPage={setPage} />;
    case "shop":
      return <Shop setPage={setPage} />;
    case "magic":
      return <Magic setPage={setPage} />;
    default:
      return null;
  }
}

/* =========================
   SPLASH
========================= */
const Splash = () => <Center><h1>RX</h1></Center>;

/* =========================
   AUTH
========================= */
const SignIn = ({ setPage }: any) => (
  <Center>
    <h2>Sign In</h2>
    <input placeholder="Email" />
    <input placeholder="Password" type="password" />
    <button onClick={() => setPage("hub")}>Login</button>
    <p onClick={() => setPage("signup")}>Sign Up</p>
  </Center>
);

const SignUp = ({ setPage }: any) => (
  <Center>
    <h2>Sign Up</h2>
    <input placeholder="Name" />
    <input placeholder="Username" />
    <input placeholder="Email" />
    <input placeholder="Password" />
    <button onClick={() => setPage("terms")}>Continue</button>
  </Center>
);

const Terms = ({ agreed, setAgreed, setPage }: any) => (
  <Center>
    <h2>Terms</h2>
    <div style={{ height: 100, overflow: "auto" }}>
      Rules & Policies...
    </div>
    <input
      type="checkbox"
      checked={agreed}
      onChange={() => setAgreed(!agreed)}
    />
    <button disabled={!agreed} onClick={() => setPage("hub")}>
      Agree
    </button>
  </Center>
);

/* =========================
   HUB
========================= */
const Hub = ({ setPage }: any) => (
  <Center>
    <h2>RX HUB</h2>
    <Grid>
      <Btn onClick={() => setPage("social")}>Social</Btn>
      <Btn onClick={() => setPage("chat")}>Chat</Btn>
      <Btn onClick={() => setPage("studio")}>Studio</Btn>
      <Btn onClick={() => setPage("music")}>Music</Btn>
      <Btn onClick={() => setPage("shop")}>Shop</Btn>
      <Btn onClick={() => setPage("magic")}>Magic</Btn>
    </Grid>
  </Center>
);

/* =========================
   SOCIAL (FULL STRUCTURE)
========================= */
const Social = ({ setPage }: any) => {
  const [tab, setTab] = useState("home");

  return (
    <div>
      <Top setPage={setPage} />
      {tab === "home" && <Reels />}
      {tab === "explore" && <Explore />}
      {tab === "create" && <Create />}
      {tab === "activity" && <Activity />}
      {tab === "profile" && <Profile />}
      <Bottom setTab={setTab} />
    </div>
  );
};

/* =========================
   REELS ENGINE
========================= */
const Reels = () => {
  const videos = ["video1.mp4", "video2.mp4"];

  return (
    <div>
      {videos.map((v, i) => (
        <div key={i}>
          <video src={v} controls autoPlay loop />
          <div>
            <button>❤️</button>
            <button>💬</button>
            <button>🔄</button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* =========================
   EXPLORE
========================= */
const Explore = () => (
  <div>
    <input placeholder="Search..." />
    <p>Trending Grid</p>
  </div>
);

/* =========================
   CREATE
========================= */
const Create = () => (
  <div>
    <input type="file" />
    <button>Upload</button>
  </div>
);

/* =========================
   ACTIVITY
========================= */
const Activity = () => <p>Notifications</p>;

/* =========================
   PROFILE
========================= */
const Profile = () => <p>User Profile</p>;

/* =========================
   CHAT
========================= */
const Chat = ({ setPage }: any) => (
  <div>
    <Top setPage={setPage} />
    <input placeholder="Message..." />
  </div>
);

/* =========================
   STUDIO
========================= */
const Studio = ({ setPage }: any) => (
  <div>
    <Top setPage={setPage} />
    <button>Create</button>
    <button>Analytics</button>
  </div>
);

/* =========================
   MUSIC
========================= */
const Music = ({ setPage }: any) => (
  <div>
    <Top setPage={setPage} />
    <button>Play Music</button>
  </div>
);

/* =========================
   SHOP
========================= */
const Shop = ({ setPage }: any) => (
  <div>
    <Top setPage={setPage} />
    <button>Products</button>
  </div>
);

/* =========================
   MAGIC (AI)
========================= */
const Magic = ({ setPage }: any) => (
  <div>
    <Top setPage={setPage} />
    <input placeholder="Ask AI..." />
  </div>
);

/* =========================
   UI
========================= */
const Top = ({ setPage }: any) => (
  <div>
    <button onClick={() => setPage("hub")}>🏠</button>
    <button>🔍</button>
    <button onClick={() => setPage("chat")}>💬</button>
    <button>🔔</button>
  </div>
);

const Bottom = ({ setTab }: any) => (
  <div>
    <button onClick={() => setTab("home")}>🏠</button>
    <button onClick={() => setTab("explore")}>🔍</button>
    <button onClick={() => setTab("create")}>➕</button>
    <button onClick={() => setTab("activity")}>❤️</button>
    <button onClick={() => setTab("profile")}>👤</button>
  </div>
);

const Center = ({ children }: any) => (
  <div style={{ textAlign: "center", marginTop: 50 }}>{children}</div>
);

const Grid = ({ children }: any) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
    {children}
  </div>
);

const Btn = ({ children, onClick }: any) => (
  <button onClick={onClick} style={{ margin: 10 }}>
    {children}
  </button>
);
