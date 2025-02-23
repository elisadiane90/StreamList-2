import React, { useState } from "react";
import "./StreamList.css";
import { Trash2, Pencil, Eye, EyeOff } from "lucide-react";

interface Stream {
  id: number;
  text: string;
  completed: boolean;
}

interface StreamListProps {
  streams: Stream[];
  addStream: (text: string) => void;
  deleteStream: (id: number) => void;
  toggleStreamCompletion: (id: number) => void;
  editStream: (id: number, newText: string) => void;
}

export const StreamList: React.FC<StreamListProps> = ({
  streams,
  addStream,
  deleteStream,
  toggleStreamCompletion,
  editStream,
}) => {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() !== "") {
      addStream(input);
      setInput("");
    }
  };

  const handleEditSubmit = (id: number) => {
    if (editInput.trim() !== "") {
      editStream(id, editInput);
      setEditingId(null);
      setEditInput("");
    }
  };

  return (
    <div className="stream-list">
      <h2>Stream List</h2>
      <form onSubmit={handleSubmit} className="stream-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter stream name..."
        />
        <button type="submit">Add Stream</button>
      </form>

      <ul>
        {streams.map((stream) => (
          <li key={stream.id} className={stream.completed ? "watched" : ""}>
            {editingId === stream.id ? (
              <div className="stream-item-content">
                <div className="button-group">
                  <button onClick={() => handleEditSubmit(stream.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
              </div>
            ) : (
              <div className="stream-item-content">
                <div className="button-group">
                  <button
                    className="icon-btn"
                    onClick={() => toggleStreamCompletion(stream.id)}
                    title={stream.completed ? "Mark as Unwatched" : "Mark as Watched"}
                  >
                    {stream.completed ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => {
                      setEditingId(stream.id);
                      setEditInput(stream.text);
                    }}
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => deleteStream(stream.id)}
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <span>{stream.text}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
