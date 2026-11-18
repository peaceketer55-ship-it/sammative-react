import { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import SearchBar from "./components/SearchBar";
import ProjectList from "./components/ProjectList";
import useProjects from "./hooks/useProjects";
import "./App.css";

function App() {
  const { projects, addProject, loading, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Personal Project Showcase App</h1>
      </header>

      <main>
        <ProjectForm onAddProject={addProject} />

        <section className="projects-section">
          <h2>Project List</h2>

          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

          {loading && <p>Loading projects...</p>}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && <ProjectList projects={filteredProjects} />}
        </section>
      </main>
    </div>
  );
}

export default App;