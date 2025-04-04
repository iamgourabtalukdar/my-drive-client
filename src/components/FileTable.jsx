import { useState } from "react";
import FileFolderContextMenu from "../contexts/FileFolderContextMenu";
import FileItem from "./FileItem";
import { motion } from "framer-motion";

const FileTable = ({
  files,
  selectedFile,
  setSelectedFile,
  setShowPreview,
}) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    file: null,
  });

  return (
    <>
      {contextMenu.visible && (
        <FileFolderContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
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
              File size
            </th>
          </tr>
        </thead>
        <tbody>
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
