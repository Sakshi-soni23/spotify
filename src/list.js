const searchButton = document.getElementById('searchbtn'); // Search button
const searchBar = document.getElementById('searchbar'); // Search bar input field
const cancelButton = document.getElementById('cancelbtn'); // Cancel icon
const songResultsContainer = document.getElementById('song-results'); // Songs container

let offset = 0;
const limit = 20;

// Fetch and display songs
const fetchAndDisplaySongs = async (append = false) => {
    const searchTerm = searchBar.value.trim();
    if (!searchTerm) {
        alert('Please enter a song name!');
        return;
    }

    const url = `https://itunes.apple.com/search?term=${searchTerm}&limit=${limit}&offset=${offset}`;

    if (!append) songResultsContainer.innerHTML = ''; // Clear results if not appending

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (results.length === 0 && !append) {
            songResultsContainer.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
            return;
        }

        results.forEach(result => {
            const songDiv = document.createElement('div');
            songDiv.classList.add('song-result');

            const songImage = document.createElement('img');
            songImage.src = result.artworkUrl100;
            songImage.alt = result.trackName;

            const songTitle = document.createElement('h3');
            songTitle.textContent = result.trackName;

            const audio = document.createElement('audio');
            const audioSource = document.createElement('source');
            audioSource.src = result.previewUrl;
            audio.controls = true;
            audio.appendChild(audioSource);

            songDiv.appendChild(songImage);
            songDiv.appendChild(songTitle);
            songDiv.appendChild(audio);
            songResultsContainer.appendChild(songDiv);
        });

        offset += limit; // Update offset for next batch
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
};

// Clear search and reset
const clearSearch = () => {
    searchBar.value = '';
    songResultsContainer.innerHTML = '<p>Search for songs to display them here.</p>';
    offset = 0; // Reset offset
};

// Event listeners
if (searchButton) {
    searchButton.addEventListener('click', () => {
        offset = 0; // Reset offset for a new search
        fetchAndDisplaySongs();
    });
} else {
    console.error("Button with ID 'searchbtn' not found.");
}

if (cancelButton) {
    cancelButton.addEventListener('click', clearSearch);
} else {
    console.error("Button with ID 'cancelbtn' not found.");
}

// Infinite scrolling
if (songResultsContainer) {
    songResultsContainer.addEventListener('scroll', () => {
        if (songResultsContainer.scrollTop + songResultsContainer.clientHeight >= songResultsContainer.scrollHeight) {
            fetchAndDisplaySongs(true); // Append more results
        }
    });
} else {
    console.error("Container with ID 'song-results' not found.");
}