import ListViewFileItem from "./ListViewFileItem";
import { motion } from "framer-motion";
import ListViewFolderItem from "./ListViewFolderItem";
import { MdArrowDropUp } from "react-icons/md";
import { useContext } from "react";
import { DriveContext } from "../contexts/DriveContext";

const TrashListView = ({ folders, files }) => {
  const { selectedFile, setSelectedFile, setContextMenu } =
    useContext(DriveContext);

  const handleContextMenu = (e, item, type) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type,
      item,
    });
  };

  return (
    <motion.table
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // transition={{ delay: 0.3 }}
      className="file-table w-full"
    >
      <thead>
        <tr className="border-y border-gray-200 text-left text-gray-600">
          <th className="cursor-pointer rounded-tl px-4 py-2 pb-2 font-medium hover:bg-gray-100">
            <div className="flex items-center">
              <span>Name</span>
              <MdArrowDropUp className="text-2xl" />
            </div>
          </th>
          <th className="cursor-pointer px-4 py-2 pb-2 font-medium hover:bg-gray-100">
            Owner
          </th>
          <th className="cursor-pointer px-4 py-2 pb-2 font-medium hover:bg-gray-100">
            Last modified
          </th>
          <th className="cursor-pointer rounded-tr px-4 py-2 pb-2 font-medium hover:bg-gray-100">
            Size
          </th>
        </tr>
      </thead>
      <tbody className="bg-red-50">
        {folders.map((folder) => (
          <ListViewFolderItem
            key={folder.id}
            folder={folder}
            setSelectedFile={setSelectedFile}
            handleContextMenu={handleContextMenu}
            fileSelectClass={selectedFile?.id === folder.id ? "selected" : ""}
            isTrash={true}
          />
        ))}
        {files.map((file) => (
          <ListViewFileItem
            key={file.id}
            file={file}
            setSelectedFile={setSelectedFile}
            handleContextMenu={handleContextMenu}
            fileSelectClass={selectedFile?.id === file.id ? "selected" : ""}
            isTrash={true}
          />
        ))}
      </tbody>
    </motion.table>
  );
};
export default TrashListView;
