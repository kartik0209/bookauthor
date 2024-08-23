import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import ConfirmationModal from "../../Components/ConfirmationModal";

const Home = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      } catch (error) {
        console.error("Error parsing file:", error);
        toast.error("invalid input");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConfirmUpload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error("There was an error uploading the data.");
    } finally {
      setShowAlert(false);
    }
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = (confirmed) => {
    if (confirmed) {
      handleConfirmUpload();
    } else {
      setShowAlert(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Upload Excel File
        </h1>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          className="mb-4 w-full text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <button
          onClick={handleFileUpload}
          className="w-full bg-teal-600 text-white rounded-lg py-2 font-medium hover:bg-teal-700 transition duration-300"
        >
          Upload
        </button>
      </div>

      {data.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Uploaded Data
          </h2>
          <div className="border-10 border-solid border-white rounded-lg overflow-hidden">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  {Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 border-10 border-solid border-white"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-teal-100 transition duration-300"
                  >
                    {Object.values(row).map((value, i) => (
                      <td
                        key={i}
                        className="px-4 py-2 border-10 border-solid border-white text-gray-700"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleShowAlert}
            className="mt-4 w-full bg-green-600 text-white rounded-lg py-2 font-medium hover:bg-green-700 transition duration-300"
          >
            Confirm Upload
          </button>
        </div>
      )}

      {showAlert && (
        <ConfirmationModal
          message="Are you sure you want to upload this data?"
          onConfirm={() => handleCloseAlert(true)}
          onCancel={() => handleCloseAlert(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
