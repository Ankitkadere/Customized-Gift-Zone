const searchInput = document.getElementById("searchResult");
const courseSection = document.getElementById("courseSection");
const SHEET_API =
  "https://script.google.com/macros/s/AKfycbzMq8ZIKjp_zbvuGStwYd7m4eizacjlrwPyu3vxuCxLCLC_iPAIiU-2imLLM0yVJxNb/exec";

// Fetch data
fetch(`${SHEET_API}?action=read`)
  .then((res) => res.json())
  .then((data) => {
    const courses = data.records;

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) searchInput.value = searchParam;

    function renderCourses(search = "") {
      courseSection.innerHTML = "";
      let filteredCourses = [...courses];

      if (search && search.trim() !== "") {
        const term = search.toLowerCase();
        filteredCourses = filteredCourses.filter(
          (course) =>
            (course.Category || "").toLowerCase().includes(term) ||
            (course.Tittle || "").toLowerCase().includes(term) ||
            (course.SubTittle || "").toLowerCase().includes(term) ||
            (course.Material || "").toLowerCase().includes(term) ||
            (course.Color || "").toLowerCase().includes(term) ||
            (course.Specification || "").toLowerCase().includes(term) ||
            String(course.Price || "")
              .toLowerCase()
              .includes(term) ||
            String(course.Size || "")
              .toLowerCase()
              .includes(term)
        );
      }

      filteredCourses.forEach((course) => {
        const card = document.createElement("div");
        card.className = "bg-white shadow rounded-lg overflow-hidden relative";

        card.innerHTML = `
         
<a href="CourseDetail.html?id=${course.Id}" class="md:block relative">
  <div class="absolute top-2 left-2 bg-gray-50 w-7 h-7 rounded-full flex items-center justify-center">
    <i class="fas fa-heart text-black text-lg"></i>
  </div>

  <div class="h-48 bg-[#526474] justify-center align-center object-cover">
    <img
      src="${course.Icon}"
      alt="${course.Tittle}"
      class="w-full h-full object-cover rounded-lg"
    />
  </div>

  <div class="overflow-hidden px-2">
    <div class="flex items-center justify-between">
      <h3 class="text-gray-900 font-semibold text-base">${course.Tittle}</h3>
      <div class="flex items-center space-x-1 text-sm">
        <i class="fas fa-star text-yellow-500 text-sm"></i>
        <span class="text-gray-800 font-semibold">(${course.Ratting})</span>
      </div>
    </div>
    <p
      style="font-size: 10px;"
      class="w-40 overflow-hidden h-5 text-gray-500 text-green-900 mt-[-5px]"
    >
      ${course.Specification} : ${course.Size}
    </p>
    <div class="flex items-center justify-between mt-[-5px]">
      <span class="font-extrabold text-lg">₹${course.Price}</span>
      <button
        aria-label="Add to cart"
        class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-400"
      >
        <i class="fas fa-shopping-cart text-gray-700 text-base"></i>
      </button>
    </div>
  </div>
</a>

        `;
        courseSection.appendChild(card);
      });

      if (filteredCourses.length === 0) {
        courseSection.innerHTML = `<p class="text-center col-span-full text-gray-500">No courses found.</p>`;
      }
    }

    renderCourses(searchInput.value);

    searchInput.addEventListener("input", (e) => renderCourses(e.target.value));

    // Optional: Category buttons filtering if any exist
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => renderCourses(btn.dataset.filter));
    });
  })
  .catch((err) => console.error("Failed to fetch courses:", err));
