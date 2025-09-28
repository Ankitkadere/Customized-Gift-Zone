const course = {
  1: {
    id: 1,
    title: "Classic Frame",
    category: "single",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Wood Design",
    price: "399.00",
    rating: "5.0",
    size: "4x6",
  },
  2: {
    id: 2,
    title: "Modern Frame",
    category: "double",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/038/028/595/small/ai-generated-antique-gold-picture-frame-isolated-on-transparent-background-png.png",
    description: "Metal Look",
    price: "499.00",
    rating: "4.5",
    size: "5x7",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Metal Look",
    price: "499.00",
    rating: "4.5",
  },
  3: {
    id: 3,
    title: "Rustic Frame",
    category: "triple",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/021/014/803/small/empty-photo-frame-on-isolate-on-transparent-background-realistic-design-element-free-png.png",
    description: "Rough Style",
    price: "299.00",
    rating: "4.0",
    size: "6x8",

    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Rough Style",
    price: "299.00",
    rating: "4.0",
  },
  4: {
    id: 4,
    title: "Calen. Frame",
    category: "calendar",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Wall Use",
    price: "299.00",
    rating: "4.5",
    size: "8x12",
  },
  5: {
    id: 5,
    title: "Golden Frame",
    category: "single",
    icon: "Assets/Single/farme1.jpg",
    description: "Gold Touch",
    price: "599.00",
    rating: "4.8",
    size: "10x15",

    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Gold Touch",
    price: "599.00",
    rating: "4.8",
  },
  6: {
    id: 6,
    title: "Silver Frame",
    category: "double",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Shiny Metal",
    price: "699.00",
    rating: "4.6",
    size: "12x18",
  },
  7: {
    id: 7,
    title: "Family Frame",
    category: "triple",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Photo Set",
    price: "799.00",
    rating: "4.4",
    size: "16x24",
  },
  8: {
    id: 8,
    title: "Multi Frame",
    category: "calendar",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Year View",
    price: "999.00",
    rating: "4.7",
    size: "20x30",
  },
  9: {
    id: 9,
    title: "Glass Frame",
    category: "single",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Clear Look",
    price: "449.00",
    rating: "4.2",
    size: "24x36",
  },
  10: {
    id: 10,
    title: "Vintage Frame",
    category: "double",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Old Style",
    price: "649.00",
    rating: "4.3",

    size: "12x18",
  },
  11: {
    id: 11,
    title: "Decor Frame",
    category: "triple",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Room Fit",
    price: "549.00",
    rating: "4.1",
    size: "20x30",
  },
  12: {
    id: 12,
    title: "Office Frame",
    category: "calendar",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Desk Use",
    price: "499.00",
    rating: "4.6",
    size: "12x18",
  },
  13: {
    id: 13,
    title: "Wall Frame",
    category: "single",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Hang Easy",
    price: "299.00",
    rating: "4.0",

    size: "8x12",
  },
  14: {
    id: 14,
    title: "Mini Frame",
    category: "double",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Small Size",
    price: "199.00",
    rating: "3.9",

    size: "5x7",
  },
};
const searchInput = document.getElementById("searchResult");
const section = document.getElementById("courseSection");

const params = new URLSearchParams(window.location.search);
const searchValue = params.get("search"); // value from ?search=
searchInput.value = searchValue;

function renderCourses(filter = "all", search = "") {
  section.innerHTML = ""; // clear previous

  let courseEntries = Object.entries(course); // all courses

  // Show search value on input
  if (searchValue) {
    searchInput.value = searchValue;
    search = searchValue; // use URL param for filtering
  } else {
    searchInput.placeholder = "Search something...";
  }

  // Redirect if certain keywords are searched
  if (search.toLowerCase() === "login" || search.toLowerCase() === "signup") {
    window.location.href = "Owner.html";
    return;
  }

  if (search.toLowerCase() === "admin" || search.toLowerCase() === "owner") {
    window.location.href = "Adminpenel.html";
    return;
  }

  // search filter
  if (
    search.trim() !== "" &&
    !["all", "all type", "all frame"].includes(search.toLowerCase())
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

  // category filter
  if (filter !== "all") {
    courseEntries = courseEntries.filter(
      ([id, data]) => data.category === filter
    );
  }

  // render cards
  courseEntries.forEach(([id, data]) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-md px-2 overflow-hidden relative";

    card.innerHTML = `
      <a href="CourseDetail.html?id=${id}" class="md:block relative">
        <div class="absolute top-2 left-2 bg-gray-50 w-4 h-7 rounded-full flex items-center justify-center">
          <i class="fas fa-heart text-black text-xs"></i>
        </div>

        <div class="h-40 bg-[#526474] object-cover">
          <img src="${data.icon}" alt="${data.title}"
               class="w-full h-40 mb-2 object-cover rounded-lg"/>
        </div>

        <div class="overflow-hidden">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-900 font-semibold text-sm">${data.title}</h3>
            <div class="flex items-center space-x-1 text-sm">
              <i class="fas fa-star text-yellow-500 text-sm"></i>
              <span class="text-gray-800 font-semibold">(${data.rating})</span>
            </div>
          </div>
          <p style="font-size: 10px;" class="text-gray-500 text-green-900 mt-[-5px]">${data.description} : ${data.size}</p>
          <div class="flex items-center justify-between mt-[-5px]">
            <span class="font-extrabold text-base">₹${data.price}</span>
            <button aria-label="Add to cart"
              class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-400">
              <i class="fas fa-shopping-cart text-gray-700 text-sm"></i>
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
    const filter = btn.dataset.filter; // e.g. "single", "double"
    renderCourses(filter);
  });
});
