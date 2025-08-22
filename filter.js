 
    const categoryButtons = document.querySelectorAll(".category-btn");
    const courses = document.querySelectorAll(".course-item");
    const noMoreCoursesText = document.querySelector("center h2");
    const searchInput = document.getElementById("search-input");

    let currentCategory = "all";

    function filterCourses() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      let anyVisible = false;

      courses.forEach((course) => {
        const courseCategory = course.dataset.category;
        const courseName = course.querySelector("h2").textContent.toLowerCase();

        const matchesCategory =
          currentCategory === "all" || courseCategory === currentCategory;
        const matchesSearch = courseName.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
          course.style.display = "block";
          anyVisible = true;
        } else {
          course.style.display = "none";
        }
      });

      noMoreCoursesText.style.display = anyVisible ? "none" : "block";
    }

    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active styles and aria-pressed
        categoryButtons.forEach((b) => {
          b.classList.remove("text-[#0f6f61]", "font-bold");
          b.setAttribute("aria-pressed", "false");
        });
        // Add active styles and aria-pressed to clicked
        btn.classList.add("text-[#0f6f61]", "font-bold");
        btn.setAttribute("aria-pressed", "true");

        currentCategory = btn.getAttribute("data-filter");
        filterCourses();
      });
    });

    searchInput.addEventListener("input", () => {
      filterCourses();
    });

    // Initialize: show all courses by default and no category selected initially
    filterCourses();
 