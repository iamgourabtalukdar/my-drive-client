import FileItem from "./FileItem";
import { motion } from "framer-motion";
import FolderItem from "./FolderItem";
import { DriveContext } from "../contexts/DriveContext";
import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdArrowDropUp } from "react-icons/md";
import TrashContextMenu from "./contextMenu/TrashContextMenu";

const TrashViewTable = ({ files, folders, onRestoreItem, onDeleteItem }) => {
  const { selectedFile, setSelectedFile, contextMenu, setContextMenu } =
    useContext(DriveContext);

  return (
    <>
      {contextMenu.visible && (
        <TrashContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          onRestoreItem={onRestoreItem}
          onDeleteItem={onDeleteItem}
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
            <tr className="border-y border-gray-200 text-left text-gray-600">
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
          <tbody className="bg-red-50">
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                setSelectedFile={setSelectedFile}
                setContextMenu={setContextMenu}
                fileSelectClass={
                  selectedFile?.id === folder.id ? "selected" : ""
                }
                isTrash={true}
              />
            ))}
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                setSelectedFile={setSelectedFile}
                setContextMenu={setContextMenu}
                fileSelectClass={selectedFile?.id === file.id ? "selected" : ""}
                isTrash={true}
              />
            ))}
          </tbody>
        </motion.table>
      ) : (
        <div className="flex justify-center items-center flex-col  mt-16">
          <FaRegTrashAlt className="text-9xl text-gray-100" />
          <h1 className="text-gray-200 font-medium text-2xl mt-4">
            Your trash is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default TrashViewTable;
