import { useEffect, useState, type FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Activity, ArrowRight, CheckCircle2, Clapperboard, Gauge, LockKeyhole, LogOut, Wrench } from "lucide-react";
import { auth, db, firebaseReady } from "./lib/firebase";

type AuthMode = "signin" | "signup";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth || !db) return;

    setBusy(true);
    setError("");
    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await setDoc(doc(db, "users", credential.user.uid), {
          email: credential.user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          profile: { displayName: credential.user.email?.split("@")[0] ?? "Rider" },
        });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Authentication failed.";
      setError(message.replace("Firebase: ", ""));
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    if (auth) await signOut(auth);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Torque and Truth Studio home">
          <span className="brand-mark"><Gauge size={22} strokeWidth={2.4} /></span>
          <span className="brand-name">TORQUE <b>&</b> TRUTH</span>
        </a>
        <span className="topbar-tag">CREATOR WORKSPACE <i /></span>
      </header>

      {!firebaseReady ? (
        <section className="setup-screen">
          <div className="eyebrow"><span className="eyebrow-line" /> INITIAL SETUP</div>
          <h1>Connect the<br /><em>machine.</em></h1>
          <p className="lead">The studio shell is ready. Add your Firebase Web configuration locally to activate secure sign-in and cloud sync.</p>
          <div className="setup-card">
            <div className="setup-icon"><LockKeyhole size={21} /></div>
            <div>
              <strong>Firebase configuration required</strong>
              <p>Copy <code>.env.example</code> to <code>.env.local</code> and fill in the Web App values from Firebase Console.</p>
            </div>
          </div>
          <div className="setup-foot"><CheckCircle2 size={16} /> Firebase project registered <span /> <CheckCircle2 size={16} /> Firestore initialized</div>
        </section>
      ) : user ? (
        <section className="dashboard">
          <div className="eyebrow"><span className="eyebrow-line" /> CONTROL ROOM</div>
          <div className="dashboard-head">
            <div>
              <h1>Welcome to<br /><em>the studio.</em></h1>
              <p className="lead">Signed in as {user.email}</p>
            </div>
            <button className="icon-button" onClick={handleSignOut} aria-label="Sign out"><LogOut size={18} /></button>
          </div>
          <div className="module-grid">
            <article className="module-card featured">
              <span className="module-number">01 / RESEARCH</span>
              <Activity size={24} />
              <h2>Topic Finder</h2>
              <p>Find the engineering question worth answering.</p>
              <span className="module-status">FOUNDATION READY</span>
            </article>
            <article className="module-card">
              <span className="module-number">02 / WRITING</span>
              <Clapperboard size={23} />
              <h2>Script Engine</h2>
              <p>Build episodes around evidence, not hype.</p>
              <span className="module-status muted">COMING NEXT</span>
            </article>
            <article className="module-card">
              <span className="module-number">03 / WORKFLOW</span>
              <Wrench size={23} />
              <h2>Production Desk</h2>
              <p>Track footage, edits and approval gates.</p>
              <span className="module-status muted">COMING NEXT</span>
            </article>
          </div>
          <div className="principle"><span>THE RULE</span> No video goes live without human approval.</div>
        </section>
      ) : (
        <section className="auth-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> ENGINEERING CONTENT SYSTEM</div>
            <h1>Measure.<br /><em>Diagnose.</em><br />Understand.</h1>
            <p className="lead">A production workspace for people who want to know what is happening inside the machine — and prove it.</p>
            <div className="hero-meta"><span><Activity size={15} /> ENGINEERING FIRST</span><span><CheckCircle2 size={15} /> HUMAN APPROVAL</span></div>
          </div>
          <div className="auth-card">
            <div className="card-kicker">STUDIO ACCESS <span>01 — AUTH</span></div>
            <h2>{mode === "signin" ? "Sign in." : "Create access."}</h2>
            <p className="card-intro">{mode === "signin" ? "Pick up where the diagnosis left off." : "Create your private studio account."}</p>
            <form onSubmit={handleAuth}>
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <label htmlFor="password">PASSWORD</label>
              <input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder="At least 6 characters" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
              {error && <p className="error-message" role="alert">{error}</p>}
              <button className="primary-button" type="submit" disabled={busy}>{busy ? "WORKING..." : mode === "signin" ? "ENTER THE STUDIO" : "CREATE ACCOUNT"} <ArrowRight size={17} /></button>
            </form>
            <div className="auth-switch">
              {mode === "signin" ? "New to the studio?" : "Already have access?"}
              <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}>
                {mode === "signin" ? "Create account" : "Sign in"}
              </button>
            </div>
            <div className="secure-note"><LockKeyhole size={14} /> PRIVATE WORKSPACE · FIREBASE AUTH</div>
          </div>
        </section>
      )}

      <footer className="footer">
        <span>TORQUE & TRUTH STUDIO <b>© 2026</b></span>
        <span>MEASURE. DIAGNOSE. UNDERSTAND.</span>
      </footer>
    </main>
  );
}
