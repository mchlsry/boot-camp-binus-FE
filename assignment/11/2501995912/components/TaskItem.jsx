import React from 'react';
import formatDate from '../utils/date';

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  return (
    <div className="task-item card" data-testid="task-item">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input type="checkbox" checked={!!task.completed} onChange={() => onToggle(task)} />
        <div>
          <div className="task-title">{task.title}</div>
          <div className="task-meta">{task.notes || <small>—</small>} • {formatDate(task.createdAt)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="secondary" onClick={() => onUpdate(task)}>Edit</button>
        <button onClick={() => onDelete(task)}>Hapus</button>
      </div>
    </div>
  );
}
