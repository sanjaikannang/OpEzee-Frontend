import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import back from "../public/images/back.png"; // Update the path as needed

const HomePage = () => {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sanjai-cross-platform-application.onrender.com/apps/get"
        );
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAppClick = (appId) => {
    // Navigate to the configuration page with the app's ID in the URL params
    navigate(`/configuration/${appId}`);
  };

  return (
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
        <span className="text-lg">
          <FontAwesomeIcon onClick={() => navigate("/settings")} icon={faCog} />
        </span>
      </nav>

      {/* Content Section */}
      <div className="container mx-auto mt-8 px-4 lg:px-8">
        <h1 className="text-3xl font-thin mb-4 text-white">Apps</h1>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {apps.map((app) => (
            <div
              key={app._id}
              className="cursor-pointer p-4 rounded-md"
              onClick={() => handleAppClick(app._id)}
            >
              <img
                src={app.icon}
                alt={app.name}
                className="w-full h-12 object-contain mb-4 rounded-md"
                onError={(e) => {
                  e.target.src =
                    "https://sanjai-cross-platform-application.onrender.com/fallback-image.jpg"; // Provide a fallback image URL
                }}
              />
              <p className="text-lg text-white font-light text-center">
                {app.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
