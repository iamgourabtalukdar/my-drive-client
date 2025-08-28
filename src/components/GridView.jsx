import GridViewFolderItem from "./GridViewFolderItem";
import GridViewFileItem from "./GridViewFileItem";

const GridView = ({
  folders,
  files,
  onStarredItem,
  handleFolderContextMenu,
  handleFileContextMenu,
  isTrash = false,
}) => {
  return (
    <>
      {/* Folders */}
      {folders.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 font-medium">Folders</h2>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
            {folders.map((folder) => (
              <GridViewFolderItem
                key={folder.id}
                folder={folder}
                handleFolderContextMenu={handleFolderContextMenu}
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {files.map((file) => (
              <GridViewFileItem
                key={file.id}
                file={file}
                handleFileContextMenu={handleFileContextMenu}
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
