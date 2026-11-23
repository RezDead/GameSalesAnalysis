async function loadGameDetails() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('id');
  const container = document.getElementById('content-container');

  if (!gameId) {
    container.innerHTML = '<p>No game selected.</p>';
    return;
  }

  try {
    const response = await fetch(`/api/games/${gameId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const game = await response.json();

    // Helper to format multivalued arrays cleanly
    const formatList = (arr) => (arr && arr.length > 0 ? arr.join(', ') : 'N/A');

    // Helper to safely format nullable numbers/strings
    const formatVal = (val, suffix = '') => (val !== null && val !== undefined ? `${val}${suffix}` : 'N/A');

    // Format release_date (strips ISO timestamp if Postgres returns a full timestamp)
    const releaseDate = game.release_date
      ? new Date(game.release_date).toLocaleDateString()
      : 'TBA';

    container.innerHTML = `
      <article class="game-details">
        <header>
          <h1>${game.name}</h1>
          <p>
            <strong>Release Date:</strong> ${releaseDate} |
            <strong>ESRB Rating:</strong> ${formatVal(game.esrb_rating)}
          </p>
        </header>

        <section class="game-description">
          <h2>About</h2>
          <p>${formatVal(game.description)}</p>
        </section>

        <section class="game-metadata">
          <h2>Credits &amp; Classification</h2>
          <ul>
            <li><strong>Developers:</strong> ${formatList(game.developers)}</li>
            <li><strong>Publishers:</strong> ${formatList(game.publishers)}</li>
            <li><strong>Platforms:</strong> ${formatList(game.platforms)}</li>
            <li><strong>Genres:</strong> ${formatList(game.genres)}</li>
          </ul>
        </section>

        <section class="game-ratings">
          <h2>Ratings &amp; Playtime</h2>
          <ul>
            <li><strong>Metacritic Score:</strong> ${formatVal(game.metacritic_score)}</li>
            <li><strong>RAWG Rating:</strong> ${formatVal(game.rawg_rating)}</li>
            <li><strong>Average Playtime:</strong> ${formatVal(game.playtime, ' hrs')}</li>
          </ul>
        </section>

        <section class="game-sales">
          <h2>Regional &amp; Global Sales (in Millions)</h2>
          <table>
            <thead>
              <tr>
                <th>Global</th>
                <th>North America</th>
                <th>Europe</th>
                <th>Japan</th>
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${formatVal(game.global_sales)}</td>
                <td>${formatVal(game.na_sales)}</td>
                <td>${formatVal(game.eu_sales)}</td>
                <td>${formatVal(game.jp_sales)}</td>
                <td>${formatVal(game.other_sales)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="steam-metrics">
          <h2>Steam Listing Data</h2>
          <ul>
            <li><strong>Price:</strong> ${game.price !== null && game.price !== undefined ? `$${Number(game.price).toFixed(2)}` : 'N/A'}</li>
            <li><strong>Estimated Owners:</strong> ${formatVal(game.estimated_owners)}</li>
            <li><strong>Positive Reviews:</strong> ${game.positive_reviews !== null && game.positive_reviews !== undefined ? Number(game.positive_reviews).toLocaleString() : 'N/A'}</li>
          </ul>
        </section>

        <p><a href="../index.html">&larr; Back to Game List</a></p>
      </article>
    `;
  } catch (err) {
    console.error('Error loading game info:', err);
    container.innerHTML = '<p>Failed to load game details.</p>';
  }
}

loadGameDetails();