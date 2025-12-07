import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), notes: notes.trim(), completed: false, createdAt: Date.now() });
    setTitle('');
    setNotes('');
  }

  return (
    <form className="card" onSubmit={submit}>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Judul tugas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e6eef8' }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <textarea
          placeholder="Catatan (opsional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e6eef8', minHeight: 70 }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">Tambah</button>
        <button type="button" className="secondary" onClick={() => { setTitle(''); setNotes(''); }}>Reset</button>
      </div>
    </form>
  );
}
