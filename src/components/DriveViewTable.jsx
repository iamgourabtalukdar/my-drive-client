import FileItem from "./FileItem";
import { motion } from "framer-motion";
import FolderItem from "./FolderItem";
import { DriveContext } from "../contexts/DriveContext";
import { useContext } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import DriveContextMenu from "./contextMenu/DriveContextMenu";

const DriveViewTable = ({ folders, files, onTrashItem, onStarredItem }) => {
  const {
    selectedFile,
    setSelectedFile,
    setFileFolderModel,
    contextMenu,
    setContextMenu,
    setShowPreview,
  } = useContext(DriveContext);

  return (
    <>
      {contextMenu.visible && (
        <DriveContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setFileFolderModel={setFileFolderModel}
          onTrashItem={onTrashItem}
          onStarredItem={onStarredItem}
        />
      )}

      {folders.length || files.length ? (
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ delay: 0.3 }}
          className="file-table w-full"
        >
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-600">
              <th className="pb-2 font-medium cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-tl">
                <div className="flex items-center">
                  <span>Name</span>

                  <MdArrowDropUp className="text-2xl" />
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
                fileSelectClass={
                  selectedFile?.id === folder.id ? "selected" : ""
                }
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
      ) : (
        <div className="flex justify-center items-center flex-col  mt-16">
          <FaRegFolderOpen className="text-gray-100 text-9xl" />
          <h1 className="text-gray-200 font-medium text-2xl mt-4">
            Folder is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default DriveViewTable;
