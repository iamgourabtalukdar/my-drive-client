import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import FileTable from "../components/FileTable";
import PreviewPanel from "../components/PreviewPanel";
import FileUpload from "../components/FileUpload";
import FilePreview from "../components/FilePreview";
import FileFolderCreateRenameModel from "../components/modelPopUp/FileFolderCreateRenameModel";

const Home = () => {
  const navigate = useNavigate();
  const params = useParams();
  const folderId = params.folderId || "";
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [newFolderModel, setNewFolderModel] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    file: null,
  });
  // const [showFilePreview, setShowFilePreview] = useState(true);

  // Handle file upload
  const handleFilesUpload = async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file.file);
      });

      if (folderId) {
        formData.append("folderId", folderId);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/file/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
          headers: {
            "File-Count": files.length,
            "Parent-Folder-Id": folderId,
          },
        }
      );

      const data = await response.json();

      if (data.status) {
        // Refresh the folder data to show new files
        fetchFolderData();
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setShowFileUpload(false);
    }
  };

  async function handleMoveFileToTrash(fileId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/file/${fileId}/trash`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.status) {
        fetchFolderData();
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  }

  // fetch folder data
  async function fetchFolderData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/folder/${folderId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.status) {
        setFolders(data.folders);
        setFiles(data.files);
      } else {
        // navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      // navigate("/signin");
    }
  }

  useEffect(() => {
    fetchFolderData();
  }, [folderId]);

  return (
    <>
      <div className="bg-white font-sans text-gray-800 h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-blue-500 font-bold text-xl mr-4">Drive</div>
              <nav className="flex space-x-6">
                <a
                  href="#"
                  className="text-blue-500 font-medium border-b-2 border-blue-500 pb-1"
                >
                  My Drive
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  Shared with me
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  Recent
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  Starred
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in Drive"
                  className="bg-gray-100 rounded-md py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <span className="material-icons absolute left-3 top-2 text-gray-500">
                  search
                </span>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="material-icons text-gray-600">settings</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="material-icons text-gray-600">apps</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            onUploadClick={() => setShowFileUpload(true)}
            setNewFolderModel={setNewFolderModel}
          />

          {/* File Browser */}
          <main className="flex-1 overflow-auto p-4">
            <Toolbar onUploadClick={() => setShowFileUpload(true)} />

            <FileTable
              files={files}
              folders={folders}
              setShowPreview={setShowPreview}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setNewFolderModel={setNewFolderModel}
              contextMenu={contextMenu}
              setContextMenu={setContextMenu}
              handleMoveFileToTrash={handleMoveFileToTrash}
            />
          </main>

          {/* <PreviewPanel
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        /> */}
          {/* File Preview Modal */}
          {/* {showFilePreview && <FilePreview />} */}

          {/* File Upload Modal */}
          {showFileUpload && (
            <FileUpload
              onFilesUpload={handleFilesUpload}
              onClose={() => setShowFileUpload(false)}
            />
          )}
        </div>
      </div>

      {/* Folder creation Model */}
      {newFolderModel.isVisible &&
        createPortal(
          <FileFolderCreateRenameModel
            newFolderModel={newFolderModel}
            isOpen={newFolderModel}
            onCloseHandler={() => setNewFolderModel({ isVisible: false })}
            fetchFolderData={fetchFolderData}
          />,
          document.getElementById("portal")
        )}
    </>
  );
};

export default Home;
