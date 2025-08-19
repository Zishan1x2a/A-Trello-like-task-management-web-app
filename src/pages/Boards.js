import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


import P1 from "../assets/P1.jpg";
import P2 from "../assets/P2.jpg";
import P3 from "../assets/P3.jpg";
import P4 from "../assets/P4.jpg";
import P5 from "../assets/P5.jpg";
import P6 from "../assets/P6.jpg";
import P7 from "../assets/P7.jpg";
import P8 from "../assets/P8.jpg";
import P9 from "../assets/P9.jpg";
import P10 from "../assets/P10.jpg";
import P11 from "../assets/P11.jpg";
import P12 from "../assets/P12.jpg";



const BG_OPTIONS = [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12];

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const [bg, setBg] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

 
  const loadBoards = async () => {
    try {
      const res = await fetch("http://localhost:5000/boards");
      const data = await res.json();
      setBoards(data || []);
    } catch (err) {
      console.error("Failed to fetch boards:", err);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return boards;
    return boards.filter((b) =>
      b.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [boards, search]);

  
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter board name");

    const newBoard = {
      id: String(Date.now()), 
      name: name.trim(),
      background: bg || BG_OPTIONS[0],
      lists: [
        { id: "1", title: "To Do", cards: [] },
        { id: "2", title: "In Progress", cards: [] },
        { id: "3", title: "Done", cards: [] },
      ],
    };

    try {
      const res = await fetch("http://localhost:5000/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBoard),
      });

      if (res.ok) {
        navigate(`/board/${newBoard.id}`);
      } else {
        alert("Failed to create board ❌");
      }
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleCancel = () => {
    setName("");
    setBg("");
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this board?")) return;
    try {
      await fetch(`http://localhost:5000/boards/${id}`, {
        method: "DELETE",
      });
      await loadBoards();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-3xl font-serif text-purple-700">Task Board</h1>

        <div className="flex items-center gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Boards..."
            className="w-[360px] px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
          />
         {/*} <img
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
            src={picture2}
          />*/}
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-[380px_1fr] gap-10">
          {/* Left: Create Board panel */}
          <div className="rounded-xl border shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌀</span>
              <h3 className="text-xl font-semibold">Create Boards</h3>
            </div>

            <label className="block text-gray-700 mb-2">Boards Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Board name"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
            />

            <p className="text-gray-700 mb-2">Background</p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {BG_OPTIONS.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setBg(url)}
                  className={`relative rounded-md overflow-hidden h-16 border-2 ${
                    bg === url ? "border-blue-500" : "border-transparent"
                  }`}
                  title="Select background"
                >
                  <img
                    src={url}
                    alt="bg"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Create Boards
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right: Boards gallery */}
          <div className="min-h-[400px]">
            {filtered.length === 0 ? (
              <div className="text-gray-500 mt-4">
                No boards yet. Create one from the left panel.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filtered.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => navigate(`/board/${b.id}`)}
                    className="group relative h-40 rounded-xl overflow-hidden shadow cursor-pointer"
                    style={{
                      backgroundImage: `url(${b.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition" />
                    <div className="absolute left-3 bottom-3 text-white font-semibold text-lg">
                      {b.name}
                    </div>

                    {/* 🗑️ Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(b.id);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
