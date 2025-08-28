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
        <tr className="border-b border-color/20 text-left">
          <th className="hover:bg-hover cursor-pointer rounded-tl px-4 py-2 pb-2 font-medium">
            <div className="flex items-center">
              <span>Name</span>

              <MdArrowDropUp className="text-2xl" />
            </div>
          </th>
          <th className="hover:bg-hover cursor-pointer px-4 py-2 pb-2 font-medium">
            Owner
          </th>
          <th className="hover:bg-hover cursor-pointer text-nowrap px-4 py-2 pb-2 font-medium">
            Last modified
          </th>
          <th className="hover:bg-hover cursor-pointer rounded-tr px-4 py-2 pb-2 font-medium">
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
