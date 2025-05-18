import React from 'react';
import StaggeredDropDown from './StaggeredDropDown';
import {
  FiEdit,
  FiTrash,
  FiShare,
  FiPlusSquare,
  FiDownload,
  FiStar,
  FiSettings,
  FiInfo
} from "react-icons/fi";

const DropdownExample: React.FC = () => {
  // Example 1: Post actions dropdown
  const postOptions = [
    { text: "Edit", Icon: FiEdit, onClick: () => console.log("Edit post clicked") },
    { text: "Duplicate", Icon: FiPlusSquare, onClick: () => console.log("Duplicate post clicked") },
    { text: "Share", Icon: FiShare, onClick: () => console.log("Share post clicked") },
    { text: "Remove", Icon: FiTrash, onClick: () => console.log("Remove post clicked") },
  ];

  // Example 2: User actions dropdown
  const userOptions = [
    { text: "Profile", Icon: FiInfo, onClick: () => console.log("Profile clicked") },
    { text: "Settings", Icon: FiSettings, onClick: () => console.log("Settings clicked") },
    { text: "Logout", Icon: FiShare, onClick: () => console.log("Logout clicked") },
  ];

  // Example 3: File actions dropdown with custom styling
  const fileOptions = [
    { text: "Download", Icon: FiDownload, onClick: () => console.log("Download clicked") },
    { text: "Favorite", Icon: FiStar, onClick: () => console.log("Favorite clicked") },
    { text: "Delete", Icon: FiTrash, onClick: () => console.log("Delete clicked") },
  ];

  return (
    <div className="flex flex-col gap-12 p-8">
      <div>
        <h2 className="text-lg font-bold mb-4">Default Post Actions Dropdown</h2>
        <StaggeredDropDown options={postOptions} />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">User Actions Dropdown</h2>
        <StaggeredDropDown 
          options={userOptions} 
          buttonText="User actions" 
        />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Custom Styled File Actions Dropdown</h2>
        <StaggeredDropDown 
          options={fileOptions} 
          buttonText="File actions"
          buttonClassName="flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          dropdownClassName="flex flex-col gap-2 p-2 rounded-lg bg-gray-50 shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          optionClassName="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-blue-100 text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DropdownExample;