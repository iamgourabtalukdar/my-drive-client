const FileTypeSelect = () => {
  return (
    <div class="relative">
      {/* <!-- Dropdown Trigger --> */}
      <div class="flex gap-2">
        <button id="dropdownBtn" class="px-4 py-2 bg-gray-200 rounded-md">
          Type ▼
        </button>
        <button class="px-4 py-2 bg-gray-200 rounded-md">People ▼</button>
      </div>

      {/* <!-- Dropdown Menu --> */}
      <div
        id="dropdownMenu"
        class="hidden absolute mt-2 w-48 bg-white shadow-lg rounded-md"
      >
        <ul class="py-2 text-gray-700">
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📁</span> Folders
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📄</span> Documents
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📊</span> Spreadsheets
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📑</span> Presentations
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🎥</span> Vids
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📝</span> Forms
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🖼</span> Photos & images
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📕</span> PDFs
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🎬</span> Videos
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">📦</span> Archives (zip)
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🎵</span> Audio
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🎨</span> Drawings
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🌍</span> Sites
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center">
            <span class="mr-2">🔗</span> Shortcuts
          </li>
        </ul>
      </div>
    </div>
  );
};
export default FileTypeSelect;

// <script>
//     const dropdownBtn = document.getElementById("dropdownBtn");
//     const dropdownMenu = document.getElementById("dropdownMenu");

//     dropdownBtn.addEventListener("click", () => {
//         dropdownMenu.classList.toggle("hidden");
//     });

//     document.addEventListener("click", (event) => {
//         if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
//             dropdownMenu.classList.add("hidden");
//         }
//     });
// </script>
