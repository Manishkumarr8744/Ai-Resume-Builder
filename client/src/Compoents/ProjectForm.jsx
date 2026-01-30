import { Plus, Projector, Puzzle, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">Add your Project</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-1 bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          <Plus size={18} className="text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">Add Project</span>
        </button>
      </div>

      { data.length === 0 && (
        <div className="text-center  py-10 text-gray-500 border border-dashed rounded-lg">
          <Puzzle size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No Project added yet</p>
          <p className="text-sm">
            Click <span className="font-semibold">Add Project</span> to get
            started
          </p>
        </div>
      )}
      {data && data?.length > 0 && (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* CARD HEADER */}
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* INPUT GRID */}
              <div className="grid  gap-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg "
                />

                <input
                  type="text"
                  placeholder="Project Type"
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg "
                />

                <textarea
                  rows={4}
                  type="text"
                  placeholder="Project description"
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg resize-none "
                />
              </div>

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
