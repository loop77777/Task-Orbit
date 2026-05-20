import { useEffect, useMemo, useState } from "react";
import { taskApi } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  // Standardize async UI state handling for all task mutations.
  const runTaskAction = async (action) => {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const loadTasks = async () => {
    await runTaskAction(async () => {
      const data = await taskApi.list();
      setTasks(data);
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSaveTask = async (payload) => {
    await runTaskAction(async () => {
      if (editingTask) {
        const updated = await taskApi.update(editingTask.id, payload);
        setTasks((prev) =>
          prev.map((task) => (task.id === updated.id ? updated : task)),
        );
        setEditingTask(null);
      } else {
        const created = await taskApi.create(payload);
        setTasks((prev) => [created, ...prev]);
      }
    });
  };

  const handleToggleComplete = async (task) => {
    await runTaskAction(async () => {
      const updated = await taskApi.update(task.id, {
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
    });
  };

  const handleDeleteTask = async (id) => {
    await runTaskAction(async () => {
      await taskApi.remove(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    });
  };

  return (
    <div className="app-shell">
      <div className="bg-shape bg-shape-a" />
      <div className="bg-shape bg-shape-b" />

      <main className="content-wrap">
        <header className="hero card">
          <h1 className="eyebrow">Task Orbit</h1>
          <p>
            Track daily execution with a clean workflow across create, update,
            complete, and delete actions.
          </p>
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
