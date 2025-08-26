const course = {
  1: {
    id: 1,
    title: "Classic Frame",
    category: "single",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Wood Design",
    price: "399.00",
    rating: "5.0",
  },
  2: {
    id: 2,
    title: "Modern Frame",
    category: "double",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Metal Look",
    price: "499.00",
    rating: "4.5",
  },
  3: {
    id: 3,
    title: "Rustic Frame",
    category: "triple",
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
  },
  5: {
    id: 5,
    title: "Golden Frame",
    category: "single",
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
  },
  7: {
    id: 7,
    title: "Family Frame",
    category: "triple",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Photo Set",
    price: "799.00",
    rating: "4.4",
  },
  8: {
    id: 8,
    title: "Multi Frame",
    category: "calendar",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Year View",
    price: "999.00",
    rating: "4.7",
  },
  9: {
    id: 9,
    title: "Glass Frame",
    category: "single",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Clear Look",
    price: "449.00",
    rating: "4.2",
  },
  10: {
    id: 10,
    title: "Vintage Frame",
    category: "double",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Old Style",
    price: "649.00",
    rating: "4.3",
  },
  11: {
    id: 11,
    title: "Decor Frame",
    category: "triple",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Room Fit",
    price: "549.00",
    rating: "4.1",
  },
  12: {
    id: 12,
    title: "Office Frame",
    category: "calendar",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Desk Use",
    price: "499.00",
    rating: "4.6",
  },
  13: {
    id: 13,
    title: "Wall Frame",
    category: "single",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Hang Easy",
    price: "299.00",
    rating: "4.0",
  },
  14: {
    id: 14,
    title: "Mini Frame",
    category: "double",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqc3IG7JSprwTRbeasE23pEQtr5YdeqdqXCQ&s",
    description: "Small Size",
    price: "199.00",
    rating: "3.9",
  },
};


const section = document.getElementById("courseL");

function renderCourses(filter = "all") {
  section.innerHTML = ""; // clear previous cards

  let courseEntries = Object.entries(course);

  // filter by category if not "all"
  if (filter !== "all") {
    courseEntries = courseEntries.filter(
      ([id, data]) => data.category === filter
    );
  }

  // render cards
  courseEntries.forEach(([id, data]) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md px-2 py-1 relative";

    card.innerHTML = `
      <a href="CourseDetail.html?id=${id}" class="md:block relative">
        <div class="absolute top-2 left-2 bg-[#972034] w-7 h-7 rounded-full flex items-center justify-center">
          <i class="fas fa-heart text-white text-xs"></i>
        </div>
        <img src="${data.icon}" alt="${data.title}" 
             class="w-full h-40 mb-2 object-cover rounded-lg"/>
        <div class="overflow-hidden ">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-900 font-semibold text-base">${data.title}</h3>
            <div class="flex items-center space-x-1">
              <i class="fas fa-star text-yellow-500 text-sm"></i>
              <span class="text-gray-800 text-sm font-semibold">(${data.rating})</span>
            </div>
          </div>
          <p class="text-gray-500">${data.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-[#972034] font-extrabold text-lg">₹${data.price}</span>
            <button aria-label="Add to cart"
              class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200">
              <i class="fas fa-shopping-cart text-gray-700 text-lg"></i>
            </button>
          </div>
        </div>
      </a>
    `;
    section.appendChild(card);
  });
}

// initial render
renderCourses();

document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter; // e.g. "single", "double"
    renderCourses(filter);
  });
});
