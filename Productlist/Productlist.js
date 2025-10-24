const searchInput = document.getElementById("searchResult");
const section = document.getElementById("courseSection");

// Load JSON data
fetch("courses.json")
  .then((res) => res.json())
  .then((course) => {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("search"); // value from ?search=

    if (searchValue) {
      searchInput.value = searchValue;
    }

    function renderCourses(filter = "all", search = "") {
      section.innerHTML = ""; // clear previous

      let courseEntries = Object.entries(course); // all courses

      // Set search box value
      if (searchValue) {
        searchInput.value = searchValue;
        search = searchValue; // use URL param for filtering
      } else {
        searchInput.placeholder = "Search something...";
      }

      // Handle redirects
      const redirectMap = {
        login: "Owner.html",
        signup: "Owner.html",
        admin: "Adminpenel.html",
        owner: "Adminpenel.html",
        home: "index.html",
      };
      const keyword = search.toLowerCase();
      if (redirectMap[keyword]) {
        window.location.href = redirectMap[keyword];
        return;
      }

      // Search filter
      if (
        search.trim() !== "" &&
        !["all", "all type", "all frame"].includes(keyword)
      ) {
        const searchLower = search.toLowerCase();
        courseEntries = courseEntries.filter(
          ([id, data]) =>
            data.category.toLowerCase().includes(searchLower) ||
            data.title.toLowerCase().includes(searchLower) ||
            data.description.toLowerCase().includes(searchLower) ||
            String(data.price).toLowerCase().includes(searchLower) ||
            String(data.size).toLowerCase().includes(searchLower)
        );
      }

      // Category filter
      if (filter !== "all") {
        courseEntries = courseEntries.filter(
          ([id, data]) => data.category === filter
        );
      }

      // Render cards
      courseEntries.forEach(([id, data]) => {
        const card = document.createElement("div");
        card.className =
          "bg-white rounded-xl  shadow-md overflow-hidden relative";

        card.innerHTML = `
          <a href="CourseDetail.html?id=${id}" class="md:block relative">
            <div class="absolute top-2 left-2 bg-gray-50 w-7 h-7 rounded-full flex items-center justify-center">
              <i class="fas fa-heart text-black text-lg"></i>
            </div>

            <div class="h-48 bg-[#526474] justify-center align-center object-cover">
              <img src="${data.icon}" alt="${data.title}" class="w-full h-full object-cover rounded-lg"/>
            </div>

            <div class="overflow-hidden px-2">
              <div class="flex items-center justify-between">
                <h3 class="text-gray-900 font-semibold text-base">${data.title}</h3>
                <div class="flex items-center space-x-1 text-sm">
                  <i class="fas fa-star text-yellow-500 text-sm"></i>
                  <span class="text-gray-800 font-semibold">(${data.rating})</span>
                </div>
              </div>
              <p style="font-size: 10px;" class="w-40 overflow-hidden h-5 text-gray-500 text-green-900 mt-[-5px]">${data.description} : ${data.size}</p>
              <div class="flex items-center justify-between mt-[-5px]">
                <span class="font-extrabold text-lg">₹${data.price}</span>
                <button aria-label="Add to cart"
                  class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-400">
                  <i class="fas fa-shopping-cart text-gray-700 text-base"></i>
                </button>
              </div>
            </div>
          </a>
        `;
        section.appendChild(card);
      });
    }

    // Initial render
    renderCourses();

    // Listen for typing in search input
    searchInput.addEventListener("input", (e) => {
      renderCourses("all", e.target.value);
    });

    // Category button filtering
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        renderCourses(filter);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to load course data:", err);
  });
