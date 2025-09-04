import ListViewFileItem from "./ListViewFileItem";
import { motion } from "framer-motion";
import ListViewFolderItem from "./ListViewFolderItem";
import { MdArrowDropUp } from "react-icons/md";

const ListView = ({
  folders,
  files,
  handleFolderContextMenu,
  handleFileContextMenu,
}) => {
  const { setSelectedFile, setShowPreview, selectedFile } = {};
  return (
    <motion.table
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // transition={{ delay: 0.3 }}
      className="w-full"
    >
      <thead>
        <tr className="border-b border-gray-700/50 text-left hover:bg-gray-100 dark:border-gray-300/50 dark:hover:bg-gray-900">
          <th className="cursor-pointer rounded-tl px-4 py-2 pb-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
            <div className="flex items-center">
              <span>Name</span>

              <MdArrowDropUp className="text-2xl" />
            </div>
          </th>
          <th className="cursor-pointer px-4 py-2 pb-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
            Owner
          </th>
          <th className="cursor-pointer px-4 py-2 pb-2 font-medium text-nowrap hover:bg-gray-200 dark:hover:bg-gray-800">
            Last modified
          </th>
          <th className="cursor-pointer rounded-tr px-4 py-2 pb-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-800">
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
            handleFolderContextMenu={handleFolderContextMenu}
            fileSelectClass={selectedFile?.id === folder.id ? "selected" : ""}
          />
        ))}
        {files.map((file) => (
          <ListViewFileItem
            key={file.id}
            file={file}
            setSelectedFile={setSelectedFile}
            setShowPreview={setShowPreview}
            handleFileContextMenu={handleFileContextMenu}
            fileSelectClass={selectedFile?.id === file.id ? "selected" : ""}
          />
        ))}
      </tbody>
    </motion.table>
  );
};
export default ListView;
