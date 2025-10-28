const searchInput = document.getElementById("searchResult");
const courseSection = document.getElementById("courseSection");
const SHEET_API =
  "https://script.google.com/macros/s/AKfycbzMq8ZIKjp_zbvuGStwYd7m4eizacjlrwPyu3vxuCxLCLC_iPAIiU-2imLLM0yVJxNb/exec";

let allCourses = [];

// Fetch data
fetch(`${SHEET_API}?action=read`)
  .then((res) => res.json())
  .then((data) => {
    allCourses = data.records || [];

    // Initial render
    renderCourses(); 
    // Search input listener
    searchInput.addEventListener("input", (e) => {
      renderCourses(e.target.value, getActiveCategory());
    });

    // Category buttons listener
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Set aria-pressed for accessibility
        document
          .querySelectorAll(".category-btn")
          .forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");

        renderCourses(searchInput.value, btn.dataset.filter);
      });
    });
  })
  .catch((err) => console.error("Failed to fetch courses:", err));

// Render courses function
function renderCourses(searchTerm = "", categoryFilter = "all") {
  courseSection.innerHTML = "";

  let filteredCourses = [...allCourses];

  // Filter by category if selected
  if (categoryFilter && categoryFilter !== "all") {
    filteredCourses = filteredCourses.filter(
      (course) =>
        (course.Category || "").toLowerCase() == categoryFilter.toLowerCase()
    );
  }

  // Filter by search input
  if (searchTerm && searchTerm.trim() !== "") {
    const term = searchTerm.toLowerCase();
    filteredCourses = filteredCourses.filter(
      (course) =>
        (course.Tittle || "").toLowerCase().includes(term) ||
        (course.SubTittle || "").toLowerCase().includes(term) ||
        (course.Material || "").toLowerCase().includes(term) ||
        (course.Specification || "").toLowerCase().includes(term) ||
        (course.Color || "").toLowerCase().includes(term) ||
        String(course.Price || "")
          .toLowerCase()
          .includes(term) ||
        String(course.Size || "")
          .toLowerCase()
          .includes(term)
    );
  }

  // Render cards
  filteredCourses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "bg-white shadow rounded-lg overflow-hidden relative";

    card.innerHTML = `
      <a href="FullpageOrder.html?id=${course.Id}" class="block relative">
        <div class="absolute top-2 left-2 bg-gray-50 w-7 h-7 rounded-full flex items-center justify-center">
          <i class="fas fa-heart text-black text-lg"></i>
        </div>
        <div class="h-48 bg-[#526474] flex items-center justify-center overflow-hidden">
          <img src="${course.Icon}" alt="${
      course.Tittle
    }" class="w-full h-full object-cover" />
        </div>
        <div class="overflow-hidden px-2  ">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-900 font-semibold text-base">${
              course.Tittle
            }</h3>
            <div class="flex items-center space-x-1 text-sm">
              <i class="fas fa-star text-yellow-500 text-sm"></i>
              <span class="text-gray-800 font-semibold">(${
                course.Ratting || 0
              })</span>
            </div>
          </div>
          <p class="text-gray-500 text-xs mt-[-5px]  overflow-hidden h-4">${
            course.Specification || ""
          }</p>
          <div class="flex items-center justify-between  ">
            <span class="font-extrabold text-lg">₹${
              course.Price || 0
            }<span class="text-[10px] text-gray-800"> ${
      course.Size || ""
    }</span></span>
            <button aria-label="Add to cart" class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-400">
              <i class="fas fa-shopping-cart text-gray-700 text-base"></i>
            </button>
          </div>
        </div>
      </a>
    `;
    courseSection.appendChild(card);
  });

  if (filteredCourses.length === 0) {
    courseSection.innerHTML = `<p class="text-center col-span-full text-gray-500">No Product Found.</p>`;
  }
}

// Helper to get currently selected category
function getActiveCategory() {
  const activeBtn = document.querySelector(
    ".category-btn[aria-pressed='true']"
  );
  return activeBtn ? activeBtn.dataset.filter : "all";
}
