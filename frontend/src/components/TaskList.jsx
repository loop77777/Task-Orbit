export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete, busy }) {
  if (!tasks.length) {
    return (
      <section className="card empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task to start tracking work.</p>
      </section>
    );
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <article className={`card task-item ${task.completed ? "is-complete" : ""}`} key={task.id}>
          <div className="task-top-row">
            <h3>{task.title}</h3>
            <span className={`pill ${task.completed ? "done" : "pending"}`}>
              {task.completed ? "Completed" : "In Progress"}
            </span>
          </div>
          {task.description ? <p>{task.description}</p> : <p className="muted">No description</p>}
          <div className="task-actions">
            <button className="btn btn-tertiary" onClick={() => onToggleComplete(task)} disabled={busy}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button className="btn btn-secondary" onClick={() => onEdit(task)} disabled={busy}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(task.id)} disabled={busy}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
