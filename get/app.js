// TASK A2: Implement GET with fetch (Random User)
// Requirements:
// 1) Show status: "Loading..."
// 2) Hide previous result (if any)
// 3) Fetch from: https://randomuser.me/api/
// 4) If (!res.ok) show error message
// 5) Parse JSON and render: name + email + avatar
// 6) Show status: "Loaded successfully."
//
// Must-have pattern: async/await, try/catch, res.ok, await res.json()

// 0) Access HTML elements (IDs required: btnLoad, status, result)
const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

// 1) Add click event listener to Load user button
// Hint: loadUserBtn.addEventListener("click", async () => { ... });
loadUserBtn.addEventListener("click", async () => {
  // 2) UI state: show loading + disable button
  statusDiv.textContent = "Loading...";
  loadUserBtn.disabled = true;
  
  // ✅ PART C: Add visual feedback for disabled button
  loadUserBtn.textContent = "Loading...";
  loadUserBtn.classList.add("opacity-50", "cursor-not-allowed");

  // 3) Hide previous result (required)
  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";

  try {
    // 4) Fetch random user data
    const res = await fetch("https://randomuser.me/api/");

    // 5) Check res.ok (HTTP errors do not throw automatically)
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // 6) Parse JSON
    const data = await res.json();
    const user = data.results[0];

    // 7) Render name + email + avatar into resultDiv
    const fullName = `${user.name.first} ${user.name.last}`;
    resultDiv.innerHTML = `
      <div class="flex flex-col items-center">
        <img 
          src="${user.picture.large}" 
          alt="${fullName}" 
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
        >
        <h3 class="text-2xl font-bold text-gray-800 mb-2">${fullName}</h3>
        <p class="text-gray-600 mb-4">${user.email}</p>
        <div class="bg-gray-100 rounded-lg p-4 w-full">
          <p class="text-gray-700"><span class="font-medium">Gender:</span> ${user.gender}</p>
          <p class="text-gray-700"><span class="font-medium">Location:</span> ${user.location.city}, ${user.location.country}</p>
          <p class="text-gray-700"><span class="font-medium">Phone:</span> ${user.phone}</p>
        </div>
      </div>
    `;

    // 8) Show result area (remove "hidden")
    resultDiv.classList.remove("hidden");

    // 9) Status success
    statusDiv.textContent = "Loaded successfully.";
    
  } catch (err) {
    // 10) Status error
    statusDiv.textContent = `Error: ${err.message}`;
    
    // Show error in result area
    resultDiv.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p class="font-medium">⚠️ Error Loading User</p>
        <p class="text-sm mt-1">${err.message}</p>
      </div>
    `;
    resultDiv.classList.remove("hidden");
    
  } finally {
    // 11) Re-enable button (always)
    loadUserBtn.disabled = false;
    
    // ✅ PART C: Restore button text and styling
    loadUserBtn.textContent = "Load user";
    loadUserBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
});

// Initialize status
statusDiv.textContent = "Ready to load user. Click the button above.";
clearBtn.addEventListener("click", () => {
    statusDiv.textContent = "...";
    resultDiv.innerHTML = "";
    resultDiv.classList.add("hidden");
});