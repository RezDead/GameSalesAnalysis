let currentPage = 1;
const PAGE_SIZE = 25; // Number of games per page

async function loadGames(page = 1) {
  currentPage = page;
  const listContainer = document.getElementById('games_list');
  const controlsContainer = document.getElementById('pagination-controls');

  listContainer.innerHTML = '<p>Loading games...</p>';

  try {
    const response = await fetch(`/api/games?page=${currentPage}&limit=${PAGE_SIZE}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    const { games, pagination } = data;

    //Render the current page's games
    listContainer.innerHTML = `<ul>${games
      .map(
        (game) =>
          `<li><a href="game/gameinfo.html?id=${game.game_id}">${game.name}</a></li>`
      )
      .join('')}</ul>`;

    //Render pagination controls
    renderPagination(pagination, controlsContainer);
  } catch (err) {
    console.error('Error fetching games:', err);
    listContainer.innerHTML = '<p>Failed to load games.</p>';
  }
}

function renderPagination({ currentPage, totalPages, totalGames }, container) {
  container.innerHTML = `
    <div class="pagination">
      <button id="first-btn" ${currentPage <= 1 ? 'disabled' : ''}>&laquo; First</button>
      <button id="prev-btn" ${currentPage <= 1 ? 'disabled' : ''}>&lsaquo; Prev</button>

      <span>
        Page <strong>${currentPage.toLocaleString()}</strong> of 
        <strong>${totalPages.toLocaleString()}</strong> 
        (${totalGames.toLocaleString()} games)
      </span>

      <button id="next-btn" ${currentPage >= totalPages ? 'disabled' : ''}>Next &rsaquo;</button>
      <button id="last-btn" ${currentPage >= totalPages ? 'disabled' : ''}>Last &raquo;</button>

      <form id="jump-form" style="display: inline-block; margin-left: 12px;">
        <input 
          type="number" 
          id="jump-input" 
          min="1" 
          max="${totalPages}" 
          placeholder="Page #" 
          style="width: 80px;"
        />
        <button type="submit">Go</button>
      </form>
    </div>
  `;

  // Attach button click events
  document.getElementById('first-btn').onclick = () => loadGames(1);
  document.getElementById('prev-btn').onclick = () => loadGames(currentPage - 1);
  document.getElementById('next-btn').onclick = () => loadGames(currentPage + 1);
  document.getElementById('last-btn').onclick = () => loadGames(totalPages);

  // Allow jumping straight to a specific page number
  document.getElementById('jump-form').onsubmit = (e) => {
    e.preventDefault();
    const targetPage = parseInt(document.getElementById('jump-input').value, 10);
    if (targetPage >= 1 && targetPage <= totalPages) {
      loadGames(targetPage);
    }
  };
}

// Load page 1 initially
loadGames(1);