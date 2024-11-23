const apiKey = "AIzaSyAqrWMKtUXZGHNWk4vMhpJsjAeEJrR15S4";
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const videoContainer = document.getElementById("video-container");
const videoPlayerSection = document.getElementById("video-player-section");
const videoPlayer = document.getElementById("video-player");
const relatedVideosContainer = document.getElementById("related-videos-container");

let nextPageToken = null;
let currentQuery = "";

// Handle search button click
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        currentQuery = query;
        videoContainer.innerHTML = "";
        nextPageToken = null;
        fetchVideos(query);
    }
});

// Fetch videos with YouTube Data API
async function fetchVideos(query, pageToken = "") {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&type=video&maxResults=20&pageToken=${pageToken}`;
    const response = await fetch(url);
    const data = await response.json();
    nextPageToken = data.nextPageToken || null;
    displayVideos(data.items);
}

// Display videos in the grid
function displayVideos(videos) {
    videos.forEach((video) => {
        const videoElement = document.createElement("div");
        videoElement.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" data-video-id="${video.id.videoId}">
      <h3>${video.snippet.title}</h3>
      <p>${video.snippet.description}</p>
    `;
        videoElement.querySelector("img").addEventListener("click", () => {
            playVideo(video.id.videoId);
        });
        videoContainer.appendChild(videoElement);
    });

    // Show "Load More" button if there are more videos
    if (nextPageToken) {
        showLoadMoreButton();
    }
}

// Play the selected video
function playVideo(videoId) {
    videoPlayerSection.classList.remove("hidden");
    videoPlayer.innerHTML = `
    <iframe width="100%" height="100%" 
      src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
    fetchRelatedVideos(videoId);
}

// Fetch related videos
async function fetchRelatedVideos(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${apiKey}&maxResults=10`;
    const response = await fetch(url);
    const data = await response.json();
    displayRelatedVideos(data.items);
}

// Display related videos
function displayRelatedVideos(videos) {
    relatedVideosContainer.innerHTML = "";
    videos.forEach((video) => {
        const videoElement = document.createElement("div");
        videoElement.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" data-video-id="${video.id.videoId}">
      <h4>${video.snippet.title}</h4>
    `;
        videoElement.querySelector("img").addEventListener("click", () => {
            playVideo(video.id.videoId);
        });
        relatedVideosContainer.appendChild(videoElement);
    });
}

// Show "Load More" button
function showLoadMoreButton() {
    let loadMoreButton = document.getElementById("load-more-button");
    if (!loadMoreButton) {
        loadMoreButton = document.createElement("button");
        loadMoreButton.id = "load-more-button";
        loadMoreButton.textContent = "Load More";
        loadMoreButton.style.margin = "20px auto";
        loadMoreButton.style.display = "block";
        loadMoreButton.style.padding = "10px 20px";
        loadMoreButton.style.backgroundColor = "#ff0000";
        loadMoreButton.style.color = "white";
        loadMoreButton.style.border = "none";
        loadMoreButton.style.cursor = "pointer";
        loadMoreButton.style.borderRadius = "5px";
        loadMoreButton.addEventListener("click", () => {
            fetchVideos(currentQuery, nextPageToken);
        });
        videoContainer.appendChild(loadMoreButton);
    }
}
