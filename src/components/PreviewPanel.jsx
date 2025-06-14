import { MdClose, MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { getFileIcon } from "../utils/getFileIcon";
import { FaRegTrashAlt } from "react-icons/fa";

const PreviewPanel = ({
  selectedFile,
  setSelectedFile,
  showPreview,
  setShowPreview,
}) => {
  if (!showPreview) return null;

  const renderPreviewContent = () => {
    if (!selectedFile) return null;

    switch (selectedFile.type) {
      case "folder":
        return (
          <div className="text-center text-gray-500">
            <BsFolderFill className="text-6xl mb-2 text-yellow-400" />
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm mt-2">This is a folder</p>
          </div>
        );
      case "image":
        return (
          <div className="text-center">
            <img
              src={`https://via.placeholder.com/400x300?text=${selectedFile.name}`}
              alt={selectedFile.name}
              className="max-w-full max-h-96 mx-auto"
            />
            <p className="font-medium mt-4">{selectedFile.name}</p>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500">
            <span className="text-6xl mb-2 text-blue-500">
              {getFileIcon(selectedFile.type)}
            </span>
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm mt-2">
              {selectedFile.size} • {selectedFile.modified}
            </p>
          </div>
        );
    }
  };

  return (
    <aside className="w-96 border-l border-gray-200 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h3 className="font-medium">Preview</h3>
        <button
          onClick={() => {
            setShowPreview(false);
            setSelectedFile(null);
          }}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <button className="text-xl">
            <MdClose />
          </button>
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center">
        {renderPreviewContent()}
      </div>
      <div className="border-t border-gray-200 p-3 flex justify-between">
        <button className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
          <MdOutlineFileDownload className="mr-1" />
          Download
        </button>
        <button className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
          <MdOutlineShare className="mr-1" />
          Share
        </button>
        <button className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
          <FaRegTrashAlt className="mr-1" />
          Remove
        </button>
      </div>
    </aside>
  );
};

export default PreviewPanel;
