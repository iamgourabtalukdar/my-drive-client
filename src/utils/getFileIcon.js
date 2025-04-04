export const getFileIcon = (type) => {
  const icons = {
    document: "description",
    spreadsheet: "grid_on",
    image: "image",
    pdf: "picture_as_pdf",
    folder: "folder",
  };
  return icons[type] || "insert_drive_file";
};
