import ListViewFileItem from "./ListViewFileItem";
import { motion } from "framer-motion";
import { DriveContext } from "../contexts/DriveContext";
import React, { useContext, useEffect } from "react";
import { MdArrowDropUp, MdOutlineRestorePage } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import DriveContextMenu from "./contextMenu/DriveContextMenu";

const RecentViewTable = ({ recentFiles, onTrashItem, onStarredItem }) => {
  const {
    selectedFile,
    setSelectedFile,
    setFileFolderModel,
    contextMenu,
    setContextMenu,
  } = useContext(DriveContext);

  const handleContextMenu = (e, item, type) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type,
      item,
    });
  };

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

      {Object.keys(recentFiles).length ? (
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

          <tbody className="">
            {Object.entries(recentFiles).map(([date, files]) => (
              <React.Fragment key={date}>
                <tr>
                  <td colSpan={4}>
                    <div className="mt-4 mb-3 text-gray-700">
                      {formatDate(date, false)}
                    </div>
                  </td>
                </tr>
                {files.map((file) => (
                  <ListViewFileItem
                    key={file.id}
                    file={file}
                    setSelectedFile={setSelectedFile}
                    setContextMenu={setContextMenu}
                    fileSelectClass={
                      selectedFile?.id === file.id ? "selected" : ""
                    }
                    handleContextMenu={handleContextMenu}
                  />
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center">
          <MdOutlineRestorePage className="text-9xl text-gray-100" />
          <h1 className="mt-4 text-2xl font-medium text-gray-200">
            No recent files
          </h1>
        </div>
      )}
    </>
  );
};

export default RecentViewTable;
