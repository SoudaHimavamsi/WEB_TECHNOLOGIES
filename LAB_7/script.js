const apiUrl = 'http://localhost:3000/notes';
const noteForm = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');
const formTitle = document.getElementById('formTitle');

// Fetch and display notes on load
document.addEventListener('DOMContentLoaded', fetchNotes);

async function fetchNotes() {
    try {
        const response = await fetch(apiUrl);
        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

function renderNotes(notes) {
    notesGrid.innerHTML = '';
    
    if(notes.length === 0) {
        notesGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #6b7280; margin-top: 3rem;">
            <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <p>No notes found. Create your first note on the left!</p>
        </div>`;
        return;
    }

    notes.forEach(note => {
        const date = new Date(note.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <div>
                <div class="note-header">
                    <div class="note-title">${note.title}</div>
                    <div class="note-subject">${note.subject}</div>
                </div>
                <div class="note-date"><i class="fa-regular fa-calendar"></i> ${date}</div>
                <div class="note-description">${note.description}</div>
            </div>
            <div class="note-actions">
                <button class="btn-edit" onclick="editNote('${note._id}', '${note.title.replace(/'/g, "\\'")}', '${note.subject.replace(/'/g, "\\'")}', '${note.description.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-pen"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteNote('${note._id}')">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        `;
        notesGrid.appendChild(noteCard);
    });
}

// Handle Add / Update Note Form Submission
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('noteId').value;
    const title = document.getElementById('title').value; // Student enters Title [cite: 10, 11]
    const subject = document.getElementById('subject').value; // Student enters Subject [cite: 10, 12]
    const description = document.getElementById('description').value; // Student enters Description [cite: 10, 13]

    const noteData = { title, subject, description };

    try {
        if (id) {
            // Update Existing Note [cite: 27]
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }) // Can modify title or description [cite: 28]
            });
            resetForm();
        } else {
            // Create New Note [cite: 4]
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteData)
            });
        }
        fetchNotes();
        noteForm.reset();
    } catch (error) {
        console.error('Error saving note:', error);
    }
});

// Populate form for editing
window.editNote = (id, title, subject, description) => {
    document.getElementById('noteId').value = id;
    document.getElementById('title').value = title;
    document.getElementById('subject').value = subject;
    document.getElementById('subject').disabled = true; 
    document.getElementById('description').value = description;
    
    formTitle.innerText = 'Edit Note';
    document.getElementById('submitBtn').innerHTML = '<i class="fa-solid fa-check"></i> Update Note';
    document.getElementById('cancelEdit').style.display = 'flex';
};

// Reset form out of edit mode
document.getElementById('cancelEdit').addEventListener('click', resetForm);

function resetForm() {
    noteForm.reset();
    document.getElementById('noteId').value = '';
    document.getElementById('subject').disabled = false;
    formTitle.innerText = 'Create New Note';
    document.getElementById('submitBtn').innerHTML = '<i class="fa-solid fa-plus"></i> Save Note';
    document.getElementById('cancelEdit').style.display = 'none';
}

// Delete a Note [cite: 33]
window.deleteNote = async (id) => {
    if(confirm('Are you sure you want to delete this note?')) {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' }); // DELETE /notes/{id} [cite: 35]
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }
};