import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./Components/Navbar";
import CreateNote from "./Components/CreateNote";
import NotesList from "./Components/NotesList";

import Login from "./Components/Login";
import Register from "./Components/Register";

import { auth, db } from "../FireBase";

import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  collection,
} from "firebase/firestore";
import PhoneNo from "./Components/PhoeNo";

function NotesApp({ user }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userNotesCollection = collection(db, "users", user.uid, "notes");

  useEffect(() => {
    const q = query(userNotesCollection, orderBy("order"));
    return onSnapshot(q, (snap) =>
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [user.uid]);

  const filtered = notes.filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-[#f1f3f4]">
      <Navbar
        onSearch={setSearch}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1">
      

        <div className="flex-1 p-6 overflow-auto">
          <CreateNote
            onAdd={(n) =>
              addDoc(userNotesCollection, { ...n, order: notes.length })
            }
          />

          <NotesList
            notes={filtered}
            onDelete={(id) =>
              deleteDoc(doc(db, "users", user.uid, "notes", id))
            }
            onUpdate={(id, d) =>
              updateDoc(doc(db, "users", user.uid, "notes", id), d)
            }
            onReorder={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/"
          element={user ? <NotesApp user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/phone-login"
          element={user ? <Navigate to="/" /> : <PhoneNo />}
        />
      </Routes>
    </BrowserRouter>
  );
}
