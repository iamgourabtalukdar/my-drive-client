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
