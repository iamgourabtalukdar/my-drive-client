import FileFolderContextMenu from "./contextMenu/FileFolderContextMenu";
import FileItem from "./FileItem";
import { motion } from "framer-motion";
import FolderItem from "./FolderItem";

const FileTable = ({
  files,
  folders,
  selectedFile,
  setSelectedFile,
  setShowPreview,
  setNewFolderModel,
  contextMenu,
  setContextMenu,
  handleMoveToTrash,
}) => {
  return (
    <>
      {contextMenu.visible && (
        <FileFolderContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setNewFolderModel={setNewFolderModel}
          handleMoveToTrash={handleMoveToTrash}
        />
      )}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="file-table w-full"
      >
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-600">
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
        <tbody>
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              setSelectedFile={setSelectedFile}
              setShowPreview={setShowPreview}
              setContextMenu={setContextMenu}
              fileSelectClass={selectedFile?.id === folder.id ? "selected" : ""}
            />
          ))}
          {files.map((file) => (
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

export default FileTable;
