import { useState } from "react";
import { Outlet } from "react-router";
import FileUpload from "../components/FileUpload";
import Header from "../components/Header";
import CreatePopUp from "../components/modelPopUp/CreatePopUp"; // Import the popup
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";

const DriveLayout = () => {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  // State for the popup is now lifted here
  const [isCreatePopUp, setIsCreatePopUp] = useState(false);
  const [popUpData, setPopUpData] = useState(null);

  // This key will be passed down. Changing it will trigger a refresh in Home.jsx.
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentFolderId, setCurrentFolderId] = useState(null);

  const onRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger useEffect in children
  };

  return (
    <>
      <div className="grid h-screen min-h-screen grid-cols-[256px_1fr] grid-rows-[64px_64px_1fr] overflow-hidden">
        <Header />

        {isMenu ? (
          <div
            className="absolute z-20 h-full w-full bg-black/20 dark:bg-white/20"
            onClick={() => setIsMenu(false)}
          >
            {/* Pass state and setters to Sidebar */}
            <Sidebar
              classes="flex max-w-64 min-w-0 transition duration-200 pt-8"
              setIsCreatePopUp={setIsCreatePopUp}
              setPopUpData={setPopUpData}
              setIsFileUpload={setIsFileUpload}
              currentFolderId={currentFolderId}
            />
          </div>
        ) : (
          // Also pass to the default Sidebar view
          <Sidebar
            classes="hidden"
            setIsCreatePopUp={setIsCreatePopUp}
            setPopUpData={setPopUpData}
            setIsFileUpload={setIsFileUpload}
            currentFolderId={currentFolderId}
          />
        )}
        <Toolbar
          onRefresh={onRefresh}
          // isListView={isListView} // This state should also be managed here if needed elsewhere
          // setIsListView={setIsListView}
          setIsMenu={setIsMenu}
        />
        <main className="col-start-1 col-end-3 row-start-3 row-end-4 overflow-y-scroll p-2 md:p-4 lg:col-start-2">
          {/* Pass the refreshKey down to the children (Home.jsx) via context */}
          <Outlet context={{ refreshKey, setCurrentFolderId }} />
        </main>
      </div>

      {/* Modals are now managed by the layout */}
      {isFileUpload && (
        <FileUpload
          currentFolderId={currentFolderId}
          onClose={() => setIsFileUpload(false)}
          onRefresh={onRefresh}
        />
      )}

      {isCreatePopUp && (
        <CreatePopUp
          setIsCreatePopUp={setIsCreatePopUp}
          data={popUpData}
          onSuccess={onRefresh} // The popup will trigger the refresh
        />
      )}
    </>
  );
};

export default DriveLayout;
