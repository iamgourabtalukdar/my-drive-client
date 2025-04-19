import React, { useContext } from "react";
import GridViewFolderItem from "./GridViewFolderItem";
import GridViewFileItem from "./GridViewFileItem";
import { DriveContext } from "../contexts/DriveContext";

const GridView = ({ folders, files, onStarredItem, isTrash = false }) => {
  const {
    selectedFile,
    setSelectedFile,
    contextMenu,
    setContextMenu,
    setShowPreview,
  } = useContext(DriveContext);

  const handleContextMenu = (e, item, type) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type,
      item,
    });
  };

  return (
    <>
      {/* Folders */}
      {folders.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 font-medium">Folders</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {folders.map((folder) => (
              <GridViewFolderItem
                key={folder.id}
                folder={folder}
                handleContextMenu={handleContextMenu}
                onStarredItem={onStarredItem}
                isTrash={isTrash}
              />
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div>
          <h2 className="mb-4 font-medium">Files</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {files.map((file) => (
              <GridViewFileItem
                key={file.id}
                file={file}
                handleContextMenu={handleContextMenu}
                onStarredItem={onStarredItem}
                isTrash={isTrash}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GridView;
