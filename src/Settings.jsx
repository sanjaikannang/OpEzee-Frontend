import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import back from "../public/images/back.png"; // Update the path as needed

const Settings = () => {
  const [name, setName] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("configuration", configuration);
      formData.append("icon", image);

      await axios.post(
        "https://sanjai-cross-platform-application.onrender.com/apps/create",
        formData
      );

      // Redirect to the homepage after successful addition
      navigate("/");
    } catch (error) {
      console.error("Error adding app:", error.message);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        {/* Navigation Bar */}
        <nav className="bg-blue-900 p-4 text-white flex justify-between items-center">
          <p className="text-2xl font-light">OpEzee</p>

          <FontAwesomeIcon
            icon={faHome}
            className="text-lg"
            onClick={() => navigate("/")}
          />
        </nav>

        {/* Content Section */}
        <div className="container mx-auto mt-8 text-white px-4 lg:px-8 flex flex-col items-center">
          <h1 className="text-3xl font-thin mb-4">Add App</h1>
          <form className="w-full max-w-md">
            <div className="mb-4">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="App Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="App Configuration"
                value={configuration}
                onChange={(e) => setConfiguration(e.target.value)}
              />
            </div>
            <div className="mb-4 text-white">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              type="button"
              onClick={handleAddButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-thin py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto w-full"
            >
              ADD
            </button>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default Settings;
