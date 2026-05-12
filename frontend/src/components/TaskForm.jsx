import { useEffect, useState } from "react";

const initialState = { title: "", description: "" };

export default function TaskForm({ onSubmit, editingTask, onCancelEdit, busy }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setForm({ title: editingTask.title, description: editingTask.description || "" });
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Update task" : "Create a task"}</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={form.title}
        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        placeholder="Plan weekly sprint review"
        minLength={2}
        maxLength={120}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={form.description}
        onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        placeholder="Add notes, owners, and due context..."
        maxLength={400}
      />

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
        {editingTask ? (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit} disabled={busy}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
