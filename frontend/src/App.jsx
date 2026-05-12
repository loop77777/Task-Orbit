import { useEffect, useMemo, useState } from "react";
import { taskApi } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);

  const loadTasks = async () => {
    setError("");
    try {
      const data = await taskApi.list();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSaveTask = async (payload) => {
    setBusy(true);
    setError("");
    try {
      if (editingTask) {
        const updated = await taskApi.update(editingTask.id, payload);
        setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
        setEditingTask(null);
      } else {
        const created = await taskApi.create(payload);
        setTasks((prev) => [created, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleToggleComplete = async (task) => {
    setBusy(true);
    setError("");
    try {
      const updated = await taskApi.update(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setBusy(true);
    setError("");
    try {
      await taskApi.remove(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="bg-shape bg-shape-a" />
      <div className="bg-shape bg-shape-b" />

      <main className="content-wrap">
        <header className="hero card">
          <p className="eyebrow">AP Mobility Assignment</p>
          <h1>Task Orbit</h1>
          <p>Track daily execution with a clean workflow across create, update, complete, and delete actions.</p>
          <div className="stats">
            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </header>

        <section className="grid-layout">
          <TaskForm
            onSubmit={handleSaveTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
            busy={busy}
          />

          <div>
            {error ? <p className="error-banner">{error}</p> : null}
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
              busy={busy}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
