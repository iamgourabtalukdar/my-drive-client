import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import FileTable from "../components/FileTable";
import PreviewPanel from "../components/PreviewPanel";
import { useState } from "react";
import files from "../../data.json";

const Home = () => {
  // const [files, setFiles] = useState(data);

  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-white  font-sans text-gray-800 h-screen flex flex-col">
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

      <Toolbar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* File Browser */}
        <main className="flex-1 overflow-auto p-4">
          <FileTable
            files={files}
            setShowPreview={setShowPreview}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </main>

        <PreviewPanel
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
        />
      </div>
    </div>
  );
};
export default Home;
