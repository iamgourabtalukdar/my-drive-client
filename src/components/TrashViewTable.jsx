import FileFolderContextMenu from "./contextMenu/FileFolderContextMenu";
import FileItem from "./FileItem";
import { motion } from "framer-motion";
import FolderItem from "./FolderItem";
import { DriveContext } from "../contexts/DriveContext";
import { useContext, useEffect } from "react";

const TrashViewTable = () => {
  const {
    trashFilesFolders,
    selectedFile,
    setSelectedFile,
    setShowPreview,
    setFileFolderModel,
    contextMenu,
    setContextMenu,
    handleMoveToTrash,
    fetchTrashData,
  } = useContext(DriveContext);

  useEffect(() => {
    fetchTrashData();
  }, []);

  return (
    <>
      {contextMenu.visible && (
        <FileFolderContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setFileFolderModel={setFileFolderModel}
          handleMoveToTrash={handleMoveToTrash}
        />
      )}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // transition={{ delay: 0.3 }}
        className="file-table w-full"
      >
        <thead>
          <tr className="border-y border-gray-200 text-left text-gray-600">
            <th className="pb-2 font-medium cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-tl">
              <div className="flex items-center">
                <span>Name</span>
                <span className="material-icons text-sm ml-1">
                  arrow_drop_up
                </span>
              </div>
            </th>
            <th className="pb-2 font-medium cursor-pointer hover:bg-gray-100 px-4 py-2">
              Owner
            </th>
            <th className="pb-2 font-medium cursor-pointer hover:bg-gray-100 px-4 py-2">
              Last modified
            </th>
            <th className="pb-2 font-medium cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-tr">
              Size
            </th>
          </tr>
        </thead>
        <tbody className="bg-red-50">
          {trashFilesFolders.folders?.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              setSelectedFile={setSelectedFile}
              setShowPreview={setShowPreview}
              setContextMenu={setContextMenu}
              fileSelectClass={selectedFile?.id === folder.id ? "selected" : ""}
              isTrash={true}
            />
          ))}
          {trashFilesFolders.files?.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              setSelectedFile={setSelectedFile}
              setShowPreview={setShowPreview}
              setContextMenu={setContextMenu}
              fileSelectClass={selectedFile?.id === file.id ? "selected" : ""}
            />
          ))}
        </tbody>
      </motion.table>
    </>
  );
};

export default TrashViewTable;
