import React from "react";
import GridViewFolderItem from "./GridViewFolderItem";
import GridViewFileItem from "./GridViewFileItem";

const GridView = ({ folders, files }) => {
  return (
    <div className="p-4">
      {/* Folders */}
      {folders.length > 0 && (
        <div className="mb-6">
          <h2 className="font-medium mb-4">Folders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
            {folders.map((folder) => (
              <GridViewFolderItem folder={folder} key={folder.id} />
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div>
          <h2 className="font-medium mb-4">Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => (
              <GridViewFileItem file={file} key={file.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridView;
