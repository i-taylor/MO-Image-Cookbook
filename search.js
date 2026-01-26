(function () {
  const searchInput = document.querySelector('input[type="search"]');
  if (!searchInput) return;

  const cards = Array.from(document.querySelectorAll(".grid .card, main .card"));
  const resultsSection = document.getElementById("search-results");
  const resultsList = document.getElementById("results-list");
  const resultsEmpty = document.getElementById("results-empty");
  const currentPage = document.body.getAttribute("data-page") || "index.html";

  const SEARCH_DATA = [
    { title: "Michigan Online Logo (Horizontal)", page: "index.html", url: "index.html#asset-mo-logo", keywords: "course images michiganOnline.png logo horizontal" },
    { title: "University of Michigan Logo", page: "index.html", url: "index.html#asset-umich-logo", keywords: "course images umichlogo.png logo" },
    { title: "Video icon", page: "index.html", url: "index.html#asset-video-icon", keywords: "icons video.png video" },
    { title: "Discussion icon", page: "index.html", url: "index.html#asset-discussion-icon", keywords: "icons discussion.png comment" },
    { title: "Objectives icon", page: "index.html", url: "index.html#asset-objectives-icon", keywords: "icons objectives.png light bulb lightbulb" },
    { title: "Overview icon", page: "index.html", url: "index.html#asset-overview-icon", keywords: "icons overview.png clipboard" },
    { title: "Reading icon", page: "index.html", url: "index.html#asset-reading-icon", keywords: "icons reading.png book page" },
    { title: "Star icon", page: "index.html", url: "index.html#asset-star-icon", keywords: "icons star.png star" },
    { title: "Time icon", page: "index.html", url: "index.html#asset-time-icon", keywords: "icons time.png clock" },
    { title: "Snippet checklist", page: "snippets.html", url: "snippets.html#snippet-checklist", keywords: "snippet rules checklist role presentation alt width height base url icons" }
  ];

  function normalize(text) {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function renderOtherResults(query) {
    if (!resultsSection || !resultsList || !resultsEmpty) return;
    if (!query) {
      resultsSection.hidden = true;
      return;
    }

    const matches = SEARCH_DATA.filter((item) => {
      if (item.page === currentPage) return false;
      const haystack = normalize(item.title + " " + item.keywords);
      return haystack.includes(query);
    });

    resultsList.innerHTML = matches
      .map((item) => {
        return (
          '<li class="result-item">' +
          '<a href="' + item.url + '">' + item.title + "</a>" +
          '<div class="result-meta">From ' + item.page + "</div>" +
          "</li>"
        );
      })
      .join("");

    resultsEmpty.hidden = matches.length > 0;
    resultsSection.hidden = false;
  }

  function filterCards(query) {
    cards.forEach((card) => {
      const haystack = card.dataset.search || normalize(card.textContent);
      card.dataset.search = haystack;
      const match = !query || haystack.includes(query);
      card.style.display = match ? "" : "none";
    });
  }

  searchInput.addEventListener("input", () => {
    const query = normalize(searchInput.value);
    filterCards(query);
    renderOtherResults(query);
  });
})();
