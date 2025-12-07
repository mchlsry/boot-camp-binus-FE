import React, { useEffect, useState } from 'react';
import { db, tasksCollection } from '../lib/firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { SettingsProvider, useSettings } from '../context/SettingsContext';

function AppInner() {
  const { sortOrder, setSortOrder } = useSettings();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTasks(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function handleAdd(task) {
    await addDoc(collection(db, 'tasks'), {
      title: task.title,
      notes: task.notes || '',
      completed: false,
      createdAt: task.createdAt || Date.now()
    });
  }

  async function handleToggle(task) {
    const ref = doc(db, 'tasks', task.id);
    await updateDoc(ref, { completed: !task.completed });
  }

  async function handleDelete(task) {
    const ref = doc(db, 'tasks', task.id);
    await deleteDoc(ref);
  }

  async function handleUpdate(task) {
    const newTitle = prompt('Edit judul', task.title);
    if (newTitle === null) return;
    const ref = doc(db, 'tasks', task.id);
    await updateDoc(ref, { title: newTitle });
  }

  const sorted = [...tasks];
  if (sortOrder === 'created_asc') {
    sorted.sort((a,b) => (a.createdAt || 0) - (b.createdAt || 0));
  } else {
    sorted.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <div className="controls">
          <label>
            <small>Sort:</small>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="created_desc">Terbaru</option>
              <option value="created_asc">Terlama</option>
            </select>
          </label>
        </div>
      </div>

      <TaskForm onAdd={handleAdd} />

      <div className="task-list">
        {loading && <div className="card">Loading...</div>}
        {!loading && sorted.length === 0 && <div className="card">Belum ada tugas.</div>}
        {sorted.map(t => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <SettingsProvider>
      <AppInner />
    </SettingsProvider>
  );
}
