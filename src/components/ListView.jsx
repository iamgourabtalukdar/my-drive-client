import { DriveContext } from "../contexts/DriveContext";
import { useContext } from "react";
import ListViewFileItem from "./ListViewFileItem";
import { motion } from "framer-motion";
import ListViewFolderItem from "./ListViewFolderItem";
import { MdArrowDropUp } from "react-icons/md";

const ListView = ({ folders, files }) => {
  const { selectedFile, setSelectedFile, setContextMenu, setShowPreview } =
    useContext(DriveContext);

  return (
    <motion.table
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // transition={{ delay: 0.3 }}
      className="w-full"
    >
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-600">
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
      <tbody>
        {folders.map((folder) => (
          <ListViewFolderItem
            key={folder.id}
            folder={folder}
            setSelectedFile={setSelectedFile}
            setShowPreview={setShowPreview}
            setContextMenu={setContextMenu}
            fileSelectClass={selectedFile?.id === folder.id ? "selected" : ""}
          />
        ))}
        {files.map((file) => (
          <ListViewFileItem
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
  );
};
export default ListView;
