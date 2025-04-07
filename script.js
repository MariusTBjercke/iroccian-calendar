const months = [
  { name: "Deep Winter - Fonivèrno", season: "winter", before: "new-year", beforeDays: 1, beforeLabel: "New Year" },
  { name: "Late Winter - Tarivèrno", season: "winter", after: "spring-dawn", afterDays: 3, afterLabel: "Spring Dawn - Inprima" },
  { name: "Early Spring - Préprima", season: "spring" },
  { name: "Mid Spring - Majprima", season: "spring" },
  { name: "Deep Spring - Fonprima", season: "spring" },
  { name: "Late Spring - Tarprima", season: "spring", after: "summer-rising", afterDays: 3, afterLabel: "Summer Rising - Inestu" },
  { name: "Early Summer - Préëstu", season: "summer" },
  { name: "Mid Summer - Majestu", season: "summer", after: "mid-year", afterDays: 1, afterLabel: "Mid Year" },
  { name: "Deep Summer - Fonestu", season: "summer" },
  { name: "Late Summer - Tarestu", season: "summer", after: "autumn-falling", afterDays: 3, afterLabel: "Autumn Falling - Inauton" },
  { name: "Early Autumn - Préauton", season: "autumn" },
  { name: "Mid Autumn - Majauton", season: "autumn" },
  { name: "Deep Autumn - Fonauton", season: "autumn" },
  { name: "Late Autumn - Tarauton", season: "autumn", after: "winter-dusk", afterDays: 3, afterLabel: "Winter Dusk - Inivèrno" },
  { name: "Early Winter - Préïvèrno", season: "winter" },
  { name: "Mid Winter - Majivèrno", season: "winter" }
];

const weekDays = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

let currentIndex = 0;

function renderCalendar(index) {
  const month = months[index];
  const grid = document.getElementById("calendar-grid");
  const header = document.getElementById("current-month");
  const gridHeader = document.getElementById("calendar-grid-header");
  const footer = document.getElementById("calendar-footer");

  header.textContent = month.name;
  grid.innerHTML = "";
  gridHeader.innerHTML = "";

  let footerText = [];
  if (month.before) {
    footerText.push(`Preceded by: ${month.beforeLabel} (${month.beforeDays} day${month.beforeDays > 1 ? "s" : ""})`);
  }
  if (month.after) {
    footerText.push(`Followed by: ${month.afterLabel} (${month.afterDays} day${month.afterDays > 1 ? "s" : ""})`);
  }
  footer.textContent = footerText.join(" | ");

  weekDays.forEach(day => {
    const headerDay = document.createElement("div");
    headerDay.classList.add("header-day");
    headerDay.textContent = day;
    gridHeader.appendChild(headerDay);
  });

  let currentPosition = 0;
  if (month.before) {
    for (let i = 1; i <= month.beforeDays; i++) {
      const day = document.createElement("div");
      day.classList.add("day", "special-day", month.before);
      day.textContent = `S${i}`;

      const tooltip = document.createElement("span");
      tooltip.classList.add("tooltip");
      tooltip.textContent = `${month.beforeLabel} - Day ${i}`;
      day.appendChild(tooltip);

      grid.appendChild(day);
      currentPosition++;
    }
  }

  for (let i = 1; i <= 20; i++) {
    const day = document.createElement("div");
    day.classList.add("day", month.season);
    day.textContent = i;
    grid.appendChild(day);
    currentPosition++;
  }

  if (month.after) {
    for (let i = 1; i <= month.afterDays; i++) {
      const day = document.createElement("div");
      day.classList.add("day", "special-day", month.after);
      day.textContent = `S${i}`;

      // Legg til tooltip
      const tooltip = document.createElement("span");
      tooltip.classList.add("tooltip");
      tooltip.textContent = `${month.afterLabel} - Day ${i}`;
      day.appendChild(tooltip);

      grid.appendChild(day);
      currentPosition++;
    }
  }

  const totalDays = (month.beforeDays || 0) + 20 + (month.afterDays || 0);
  const columns = Math.ceil(totalDays / 5) * 5;
  grid.style.gridTemplateColumns = `repeat(5, 1fr)`;
  gridHeader.style.gridTemplateColumns = `repeat(5, 1fr)`;
}

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderCalendar(currentIndex);
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < months.length - 1) {
    currentIndex++;
    renderCalendar(currentIndex);
  }
});

// Initial render
renderCalendar(currentIndex);