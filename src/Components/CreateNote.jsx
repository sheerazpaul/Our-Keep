import React, { useState } from "react";
import { Plus, Bookmark, Palette, CheckSquare } from "lucide-react";
import { AiOutlineFontColors } from "react-icons/ai";

const colors = [
  { bg: "bg-black", text: "text-cyan-400" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-cyan-200", text: "text-cyan-800" },
  { bg: "bg-cyan-300", text: "text-cyan-900" },
  { bg: "bg-cyan-400", text: "text-black" },
  { bg: "bg-cyan-500", text: "text-black" }
];

const fontStyles = [
  { name: "Normal", class: "font-normal not-italic" },
  { name: "Bold", class: "font-bold not-italic" },
  { name: "Italic", class: "italic font-normal" },
  { name: "Bold Italic", class: "italic font-bold" },
  { name: "Mono", class: "font-mono" },
  { name: "Extra Bold", class: "font-extrabold not-italic" },
  { name: "Light", class: "font-light not-italic" },
  { name: "Underline", class: "underline font-normal" },
  { name: "Line Through", class: "line-through font-normal" },
  { name: "Italic Bold Underline", class: "italic font-bold underline" },
  { name: "Small Caps", class: "uppercase tracking-wide font-normal" },
  { name: "Serif", class: "font-serif" },
  { name: "Sans-Serif", class: "font-sans" }
];

const CreateNote = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showFonts, setShowFonts] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    pinned: false,
    color: "bg-white",
    textColor: "text-cyan-400",
    fontStyle: "font-normal not-italic",
    isChecklist: false,
    tasks: []
  });

  const enableChecklist = (e) => {
    e.stopPropagation();
    setNote({
      ...note,
      isChecklist: true,
      content: "",
      tasks: note.tasks.length
        ? note.tasks
        : [{ text: "", completed: false }]
    });
  };

  const updateTask = (index, value) => {
    const tasks = [...note.tasks];
    tasks[index].text = value;
    if (index === tasks.length - 1 && value.trim() !== "") {
      tasks.push({ text: "", completed: false });
    }
    setNote({ ...note, tasks });
  };

  const toggleTask = (index) => {
    const tasks = [...note.tasks];
    tasks[index].completed = !tasks[index].completed;
    setNote({ ...note, tasks });
  };

  const submit = () => {
    const cleanTasks = note.tasks.filter(t => t.text.trim() !== "");
    if (!note.title && !note.content && cleanTasks.length === 0) return;

    onAdd({ ...note, tasks: cleanTasks });

    setNote({
      title: "",
      content: "",
      pinned: false,
      color: "bg-black",
      textColor: "text-cyan-400",
      fontStyle: "font-normal not-italic",
      isChecklist: false,
      tasks: []
    });

    setOpen(false);
    setShowColors(false);
    setShowFonts(false);
  };

  return (
    <div className="flex justify-center mt-6">
      <div
        onClick={() => setOpen(true)}
        className={`w-full max-w-xl p-4 rounded-xl shadow-md cursor-text transition ${note.color}`}
      >
        {open && (
          <input
            className={`w-full mb-2 outline-none bg-transparent ${note.fontStyle} ${note.textColor} text-xl tracking-wide`}
            placeholder={`Title (${fontStyles.find(f => f.class === note.fontStyle)?.name})`}
            value={note.title}
            onChange={e => setNote({ ...note, title: e.target.value })}
            onClick={e => e.stopPropagation()}
          />
        )}

        {!note.isChecklist && (
          <textarea
            rows={open ? 3 : 1}
            className={`w-full resize-none outline-none bg-transparent ${note.fontStyle} ${note.textColor} text-xl tracking-wide`}
            placeholder={`Take a note... (${fontStyles.find(f => f.class === note.fontStyle)?.name})`}
            value={note.content}
            onChange={e => setNote({ ...note, content: e.target.value })}
          />
        )}

        {note.isChecklist && (
          <div className="space-y-2">
            {note.tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(i)}
                />
                <input
                  type="text"
                  className={`flex-1 outline-none bg-transparent ${note.fontStyle} ${note.textColor} text-xl tracking-wide`}
                  placeholder="List item"
                  value={task.text}
                  onChange={(e) => updateTask(i, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {open && (
          <div className="flex justify-between items-center mt-3 relative">
            <div className="flex gap-3 text-cyan-400">
              <button onClick={enableChecklist}>
                <CheckSquare size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNote({ ...note, pinned: !note.pinned });
                }}
              >
                <Bookmark
                  size={18}
                  className={note.pinned ? "text-cyan-500" : ""}
                />
              </button>

  
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFonts(!showFonts);
                }}
              >
                <AiOutlineFontColors size={18} />
              </button>

              {showFonts && (
                <div className="absolute top-10 left-20 bg-black shadow p-2 rounded flex flex-col gap-1 z-10 max-h-48 overflow-y-auto">
                  {fontStyles.map((f, i) => (
                    <button
                      key={i}
                      className={`px-2 py-1 text-left ${f.class} text-lg flex justify-between items-center text-cyan-400`}
                      onClick={() => {
                        setNote({ ...note, fontStyle: f.class });
                        setShowFonts(false);
                      }}
                    >
                      {f.name} <span className={`${f.class} text-sm`}>Aa</span>
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColors(!showColors);
                }}
              >
                <Palette size={18} />
              </button>

              {showColors && (
                <div className="absolute top-10 left-40 bg-black shadow p-2 rounded flex gap-1 z-10">
                  {colors.map((c, i) => (
                    <button
                      key={i}
                      className={`w-6 h-6 rounded-full ${c.bg}`}
                      onClick={() => {
                        setNote({
                          ...note,
                          color: c.bg,
                          textColor: c.text
                        });
                        setShowColors(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                submit();
              }}
              className="bg-cyan-400 p-2 rounded-full text-black"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
