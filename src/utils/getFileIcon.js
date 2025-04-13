import React from "react";
import {
  BsFileEarmarkFill, // Default document (solid)
  BsFileWordFill, // .doc, .docx (solid)
  BsFileTextFill, // .txt (solid)
  BsMarkdownFill, // .md (solid)
  BsFileExcelFill, // .xls, .xlsx (solid)
  BsFileBarGraphFill, // .csv (solid)
  BsFileImageFill, // Image files (solid)
  BsFilePdfFill, // .pdf (solid)
  BsFilePlayFill, // Video files (solid)
} from "react-icons/bs";

export const getFileIcon = (extension) => {
  if (!extension) return React.createElement(BsFileEarmarkFill);

  const ext = extension.toLowerCase();

  const extensionToIcon = {
    // Documents
    ".doc": React.createElement(BsFileWordFill),
    ".docx": React.createElement(BsFileWordFill),
    ".txt": React.createElement(BsFileTextFill),
    ".md": React.createElement(BsMarkdownFill),

    // Spreadsheets
    ".xls": React.createElement(BsFileExcelFill),
    ".xlsx": React.createElement(BsFileExcelFill),
    ".csv": React.createElement(BsFileBarGraphFill),

    // Images
    ".jpg": React.createElement(BsFileImageFill),
    ".jpeg": React.createElement(BsFileImageFill),
    ".png": React.createElement(BsFileImageFill),
    ".gif": React.createElement(BsFileImageFill),
    ".bmp": React.createElement(BsFileImageFill),
    ".svg": React.createElement(BsFileImageFill),
    ".webp": React.createElement(BsFileImageFill),

    // PDF
    ".pdf": React.createElement(BsFilePdfFill),

    // Videos
    ".mp4": React.createElement(BsFilePlayFill),
    ".mkv": React.createElement(BsFilePlayFill),
    ".mov": React.createElement(BsFilePlayFill),
    ".avi": React.createElement(BsFilePlayFill),
    ".webm": React.createElement(BsFilePlayFill),
    ".flv": React.createElement(BsFilePlayFill),
  };

  return extensionToIcon[ext] || React.createElement(BsFileEarmarkFill);
};
