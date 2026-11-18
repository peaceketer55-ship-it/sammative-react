import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/projects";

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load projects.");
        setLoading(false);
      });
  }, []);

  const addProject = async (newProject) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Failed to add project");
      }

      const savedProject = await response.json();
      setProjects((prevProjects) => [savedProject, ...prevProjects]);
    } catch (err) {
      alert("Could not add project. Please try again.");
    }
  };

  return { projects, addProject, loading, error };
}

export default useProjects;