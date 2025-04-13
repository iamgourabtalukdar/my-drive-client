import FileFolderContextMenu from "./contextMenu/FileFolderContextMenu";
import FileItem from "./FileItem";
import { motion } from "framer-motion";
import FolderItem from "./FolderItem";
import { DriveContext } from "../contexts/DriveContext";
import React, { useContext, useEffect } from "react";
import { MdArrowDropUp, MdOutlineRestorePage } from "react-icons/md";
import { formatDate } from "../utils/formatDate";

const RecentViewTable = () => {
  const {
    recentFiles,
    selectedFile,
    setSelectedFile,
    setShowPreview,
    setFileFolderModel,
    contextMenu,
    setContextMenu,
    handleMoveToTrash,
    fetchRecentFiles,
    handleRestoreFromTrash,
    handleDeleteFromTrash,
  } = useContext(DriveContext);

  useEffect(() => {
    fetchRecentFiles();
  }, []);

  return (
    <>
      {contextMenu.visible && (
        <FileFolderContextMenu
          isTrashedContext={false}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setFileFolderModel={setFileFolderModel}
          handleMoveToTrash={handleMoveToTrash}
          handleRestoreFromTrash={handleRestoreFromTrash}
          handleDeleteFromTrash={handleDeleteFromTrash}
        />
      )}

      {Object.keys(recentFiles).length ? (
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

          <tbody className="">
            {Object.entries(recentFiles).map(([date, files]) => (
              <React.Fragment key={date}>
                <tr>
                  <td colSpan={4}>
                    <div className="mt-4 mb-3 text-gray-700 ">
                      {formatDate(date, false)}
                    </div>
                  </td>
                </tr>
                {files.map((file) => (
                  <FileItem
                    key={file.id}
                    file={file}
                    setSelectedFile={setSelectedFile}
                    setShowPreview={setShowPreview}
                    setContextMenu={setContextMenu}
                    fileSelectClass={
                      selectedFile?.id === file.id ? "selected" : ""
                    }
                    isTrash={false}
                  />
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <div className="flex justify-center items-center flex-col  mt-16">
          <MdOutlineRestorePage className="text-gray-100 text-9xl" />
          <h1 className="text-gray-200 font-medium text-2xl mt-4">
            No recent files
          </h1>
        </div>
      )}
    </>
  );
};

export default RecentViewTable;
