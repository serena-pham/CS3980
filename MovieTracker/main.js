// Define API endpoint
const API = 'http://127.0.0.1:8000/movies';
let data = [];
let editingId = null;

// Open form to add a new movie
function openForm() {
    document.getElementById('form-card').style.display = 'block';
    document.getElementById('add-movie-btn').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close the form and reset to add mode
function closeForm() {
    document.getElementById('form-card').style.display = 'none';
    document.getElementById('add-movie-btn').style.display = 'inline-block';
}

// Handle form submission for adding or editing a movie
function submitMovie() {
  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value.trim();
  const rating = parseFloat(document.getElementById('rating').value);
  const review = document.getElementById('review').value.trim();

  // Makes sure all fields are filled in
  if (!title || !date || !review || isNaN(rating)) {
    return alert('Please fill in all fields.');
}

  // Makes sure rating is between 1-5 and in 0.5 increments
  if (rating < 1 || rating > 5 || rating % 0.5 !== 0) {
    return alert('Rating must be between 1-5 and be in 0.5 increments.');
  }

  // Prepares data
  const body = JSON.stringify({ title, date, rating, review });

  // If editingId is set, a movie is updated, else - a new movie is added
  if (editingId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status === 200) {
        const updated = JSON.parse(xhr.response);
        const movie = data.find(m => m.id === editingId);
        movie.title = updated.title;
        movie.date = updated.date;
        movie.rating = updated.rating;
        movie.review = updated.review;
        editingId = null;
        clearForm();
        closeForm();
        renderMovies();
      }
    };

    // PUT request to update a movie that already exists
    xhr.open('PUT', API + '/' + editingId, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(body);
  } else {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status === 201) {
        const newMovie = JSON.parse(xhr.response);
        data.push(newMovie);
        clearForm();
        closeForm();
        renderMovies();
      }
    };

    // POST request to add a new movie
    xhr.open('POST', API, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(body);
  }
}

// DELETE request to delete a movie by id
function deleteMovie(id) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      data = data.filter(m => m.id !== id);
      renderMovies();
    }
  };
  xhr.open('DELETE', API + '/' + id, true);
  xhr.send();
}

function startEdit(id) {
  const movie = data.find(m => m.id === id);
  document.getElementById('title').value = movie.title;
  document.getElementById('date').value = movie.date;
  document.getElementById('rating').value = movie.rating;
  document.getElementById('review').value = movie.review;
  document.getElementById('form-title').textContent = 'Edit Movie';
  editingId = id;
  openForm();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingId = null;
  clearForm();
  closeForm();
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('date').value = '';
  document.getElementById('rating').value = '';
  document.getElementById('review').value = '';
  document.getElementById('form-title').textContent = 'Add a New Movie';
}

function renderMovies() {
  const list = document.getElementById('movie-list');
  const empty = document.getElementById('no-movies');
  list.innerHTML = '';

  if (data.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  data.sort((a, b) => b.id - a.id).forEach(m => {
    list.innerHTML += `
      <div id="movie-${m.id}" class="movie-card">
        <h3>${m.title}</h3>
        <div class="field-label">Date Watched</div><div class="field-value">${new Date(m.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div class="field-label">Rating</div><div class="field-value">${m.rating}</div>
        <div class="field-label">Review</div><div class="field-value">${m.review}</div>
        <div class="card-actions">
          <button class="btn btn-edit" onclick="startEdit(${m.id})">Edit</button>
          <button class="btn btn-delete" onclick="deleteMovie(${m.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

// GET request to retrieve all movies
function getAllMovies() {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.response);
      renderMovies();
    }
  };
  xhr.open('GET', API, true);
  xhr.send();
}

(() => { getAllMovies(); })();