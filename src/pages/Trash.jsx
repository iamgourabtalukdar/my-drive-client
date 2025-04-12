import DriveLayoutContainer from "../components/DriveLayoutContainer";
import TrashViewTable from "../components/TrashViewTable";

const Trash = () => {
  return (
    <DriveLayoutContainer>
      <div className="py-1 ps-4 bg-gray-200 my-2 rounded flex justify-between items-center">
        <p>Items in the bin will be deleted forever after 30 days</p>
        <button className="font-medium text-gray-600 text-sm hover:bg-gray-300 px-4 me-1 py-2 rounded">
          Empty Bin
        </button>
      </div>
      <TrashViewTable />
    </DriveLayoutContainer>
  );
};

export default Trash;
