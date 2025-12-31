import React, { useState } from "react";
import { Trash2, Bookmark, X, Plus } from "lucide-react";

const NoteCard = ({
  id,
  title,
  content,
  pinned,
  color,
  fontStyle,
  tasks = [],
  onDelete,
  onUpdate
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    id,
    title,
    content,
    pinned,
    color,
    fontStyle,
    tasks
  });

  const save = () => {
    onUpdate(data.id, data);
    setOpen(false);
  };

  return (
    <>

      <div
        onClick={() => setOpen(true)}
        className={`${data.color} ${data.fontStyle} w-full sm:w-[220px] md:w-[250px] lg:w-[280px] rounded-2xl shadow-lg p-4 mb-4 cursor-pointer transition hover:scale-105`}
        style={{ minHeight: "80px" }}
      >
        {data.title && (
          <h3 className="font-semibold mb-2 truncate text-md sm:text-lg text-cyan-400">{data.title}</h3>
        )}

        {data.content && (
          <p className="text-sm sm:text-base whitespace-pre-wrap text-cyan-200">
            {data.content}
          </p>
        )}

        {data.tasks.length > 0 && (
          <div className="mt-2 space-y-1">
            {data.tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="w-4 h-4 accent-cyan-400"
                />
                <span className={`text-sm ${task.completed ? "line-through text-gray-500" : "text-cyan-200"}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>


      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-0"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${data.color} ${data.fontStyle} w-full max-w-md sm:max-w-lg rounded-2xl p-6 shadow-xl bg-black text-cyan-400`}
          >

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200"
            >
              <X size={20} />
            </button>

            <input
              className="w-full mb-4 text-lg sm:text-xl font-semibold bg-transparent outline-none border-b border-cyan-400 focus:border-cyan-500 transition pb-1"
              value={data.title}
              placeholder="Title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />

            <textarea
              className="w-full mb-4 text-sm sm:text-base bg-transparent outline-none border border-cyan-700 rounded p-2 focus:border-cyan-400 transition resize-none"
              value={data.content}
              placeholder="Content"
              onChange={(e) => setData({ ...data, content: e.target.value })}
              rows={Math.max(3, data.content.split("\n").length)}
            />

            {data.tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    const newTasks = data.tasks.map((t, idx) =>
                      idx === i ? { ...t, completed: !t.completed } : t
                    );
                    setData({ ...data, tasks: newTasks });
                  }}
                  className="w-4 h-4 accent-cyan-400"
                />
                <input
                  className="flex-1 bg-transparent outline-none border-b border-cyan-700 focus:border-cyan-400 py-1 text-sm sm:text-base text-cyan-400"
                  value={task.text}
                  placeholder="List item"
                  onChange={(e) => {
                    const newTasks = data.tasks.map((t, idx) =>
                      idx === i ? { ...t, text: e.target.value } : t
                    );
                    setData({ ...data, tasks: newTasks });
                  }}
                />
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      tasks: data.tasks.filter((_, idx) => idx !== i)
                    })
                  }
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ))}

            <button
              onClick={() =>
                setData({
                  ...data,
                  tasks: [...data.tasks, { text: "", completed: false }]
                })
              }
              className="flex items-center gap-1 text-sm sm:text-base text-cyan-400 mt-2 hover:text-cyan-200 transition"
            >
              <Plus size={14} /> Add item
            </button>

            <div className="flex justify-between mt-5 items-center">
              <button
                onClick={() => {
                  const updated = { ...data, pinned: !data.pinned };
                  setData(updated);
                  onUpdate(data.id, updated);
                }}
                className="hover:text-cyan-400 transition"
              >
                <Bookmark
                  className={data.pinned ? "text-cyan-400" : "text-gray-500"}
                />
              </button>

              <div className="flex gap-3">
                <button
                  onClick={save}
                  className="bg-cyan-400 px-4 py-1 rounded-lg text-black text-sm sm:text-base hover:bg-cyan-500 transition"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    onDelete(data.id);
                    setOpen(false);
                  }}
                  className="hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
