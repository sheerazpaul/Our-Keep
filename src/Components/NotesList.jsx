import React from "react";
import NoteCard from "./NoteCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const NotesList = ({ notes, onDelete, onUpdate, onReorder }) => {
  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-16 text-xl">
        <span className="text-3xl mr-2 animate-bounce">😔</span>
        Oops! Looks like your search didn’t find anything....
      </p>
    );
  }

  return (
    <DragDropContext
      onDragEnd={(result) =>
        result.destination &&
        onReorder(result.source.index, result.destination.index)
      }
    >
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-wrap gap-4 p-4"
          >
            {notes.map((note, i) => (
              <Draggable key={note.id} draggableId={note.id} index={i}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-full sm:w-[260px] md:w-[280px]"
                  >
                    <NoteCard
                      {...note}
                      index={i}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NotesList;
