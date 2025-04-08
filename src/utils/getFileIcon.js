export const getFileIcon = (extension) => {
  // if (item.type === "folder") return "folder";

  if (!extension) return "insert_drive_file";

  const ext = extension.toLowerCase();

  const extensionToType = {
    // documents
    ".doc": "document",
    ".docx": "document",
    ".txt": "document",
    ".md": "document",

    // spreadsheets
    ".xls": "spreadsheet",
    ".xlsx": "spreadsheet",
    ".csv": "spreadsheet",

    // images
    ".jpg": "image",
    ".jpeg": "image",
    ".png": "image",
    ".gif": "image",
    ".bmp": "image",
    ".svg": "image",
    ".webp": "image",

    // pdf
    ".pdf": "pdf",

    // videos
    ".mp4": "video",
    ".mkv": "video",
    ".mov": "video",
    ".avi": "video",
    ".webm": "video",
    ".flv": "video",
  };

  const type = extensionToType[ext] || "default";

  const icons = {
    document: "description",
    spreadsheet: "grid_on",
    image: "image",
    pdf: "picture_as_pdf",
    video: "movie",
    folder: "folder",
    default: "insert_drive_file",
  };

  return icons[type];
};
