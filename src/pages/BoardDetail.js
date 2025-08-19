import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [newCard, setNewCard] = useState({});
  const [editCard, setEditCard] = useState(null);

  
  useEffect(() => {
    fetch(`http://localhost:5000/boards/${id}`)
      .then((res) => res.json())
      .then((data) => setBoard(data));
  }, [id]);

  if (!board) return <h2 className="p-6">Loading...</h2>;

  
  const saveBoard = async (updatedBoard) => {
    await fetch(`http://localhost:5000/boards/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBoard),
    });
    setBoard(updatedBoard);
  };

  
  const handleAddCard = async (listId) => {
    if (!newCard[listId] || !newCard[listId].title?.trim()) return;

    const updatedBoard = {
      ...board,
      lists: board.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: String(Date.now()),
                  title: newCard[listId].title,
                  dueDate: newCard[listId].dueDate || "",
                  priority: newCard[listId].priority || "Low",
                  tags: newCard[listId].tags
                    ? newCard[listId].tags.split(",")
                    : [],
                },
              ],
            }
          : list
      ),
    };

    await saveBoard(updatedBoard);
    setNewCard({ ...newCard, [listId]: {} });
  };

  
  const handleEditCard = async (listId, cardId) => {
    const updatedBoard = {
      ...board,
      lists: board.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((c) =>
                c.id === cardId ? { ...editCard } : c
              ),
            }
          : list
      ),
    };

    await saveBoard(updatedBoard);
    setEditCard(null);
  };

  
  const handleDeleteCard = async (listId, cardId) => {
    const updatedBoard = {
      ...board,
      lists: board.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.filter((c) => c.id !== cardId),
            }
          : list
      ),
    };

    await saveBoard(updatedBoard);
  };

  
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedBoard = { ...board };

    const sourceList = updatedBoard.lists.find(
      (list) => list.id === source.droppableId
    );
    const destList = updatedBoard.lists.find(
      (list) => list.id === destination.droppableId
    );

    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destList.cards.splice(destination.index, 0, movedCard);

    await saveBoard(updatedBoard);
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${board.background})` }}
    >
     
      <div className="bg-gray-900/80 text-white p-4 rounded-xl">
        <h1 className="text-2xl font-bold">{board.name}</h1>
      </div>

      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 mt-6 overflow-x-auto pb-4">
          {board.lists.map((list) => (
            <div key={list.id} className="column">
              <h2 className="font-semibold text-lg mb-3">{list.title}</h2>

              
              <Droppable droppableId={list.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 min-h-[50px]"
                  >
                    {list.cards.map((card, index) => (
                      <Draggable
                        key={card.id}
                        draggableId={String(card.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`card ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            {editCard?.id === card.id ? (
                              <div>
                                <input
                                  value={editCard.title}
                                  onChange={(e) =>
                                    setEditCard({
                                      ...editCard,
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full border px-2 py-1 rounded mb-2"
                                />
                                <input
                                  type="date"
                                  value={editCard.dueDate}
                                  onChange={(e) =>
                                    setEditCard({
                                      ...editCard,
                                      dueDate: e.target.value,
                                    })
                                  }
                                  className="w-full border px-2 py-1 rounded mb-2"
                                />
                                <select
                                  value={editCard.priority}
                                  onChange={(e) =>
                                    setEditCard({
                                      ...editCard,
                                      priority: e.target.value,
                                    })
                                  }
                                  className="w-full border px-2 py-1 rounded mb-2"
                                >
                                  <option>Low</option>
                                  <option>Medium</option>
                                  <option>High</option>
                                </select>
                                <input
                                  placeholder="tags (comma separated)"
                                  value={editCard.tags.join(",")}
                                  onChange={(e) =>
                                    setEditCard({
                                      ...editCard,
                                      tags: e.target.value.split(","),
                                    })
                                  }
                                  className="w-full border px-2 py-1 rounded mb-2"
                                />
                                <button
                                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                  onClick={() =>
                                    handleEditCard(list.id, card.id)
                                  }
                                >
                                  Save
                                </button>
                                <button
                                  className="bg-gray-400 text-white px-3 py-1 rounded"
                                  onClick={() => setEditCard(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium">{card.title}</p>
                                {card.dueDate && (
                                  <p className="text-sm text-gray-600">
                                    📅 {card.dueDate}
                                  </p>
                                )}
                                {card.priority && (
                                  <span
                                    className={`priority ${card.priority
                                      .toLowerCase()
                                      .trim()}`}
                                  >
                                    {card.priority}
                                  </span>
                                )}
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {card.tags?.map((tag, i) => (
                                    <span key={i} className="tag">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <button
                                    className="text-blue-600 text-sm"
                                    onClick={() => setEditCard(card)}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    className="text-red-600 text-sm"
                                    onClick={() =>
                                      handleDeleteCard(list.id, card.id)
                                    }
                                  >
                                    🗑 Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Add card */}
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  placeholder="New card..."
                  value={newCard[list.id]?.title || ""}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      [list.id]: {
                        ...newCard[list.id],
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-2 py-1 rounded"
                />
                <input
                  type="date"
                  value={newCard[list.id]?.dueDate || ""}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      [list.id]: {
                        ...newCard[list.id],
                        dueDate: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-2 py-1 rounded"
                />
                <select
                  value={newCard[list.id]?.priority || "Low"}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      [list.id]: {
                        ...newCard[list.id],
                        priority: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-2 py-1 rounded"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={newCard[list.id]?.tags || ""}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      [list.id]: {
                        ...newCard[list.id],
                        tags: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleAddCard(list.id)}
                  className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                >
                  ➕ Add Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default BoardDetail;
