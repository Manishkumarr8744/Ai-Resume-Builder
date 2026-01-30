import { Briefcase, GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">Add your Higher Education</p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-1 bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          <Plus size={18} className="text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">
            Add Education
          </span>
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          <GraduationCap size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No Education experience added yet</p>
          <p className="text-sm">
            Click <span className="font-semibold">Add Education</span> to get
            started
          </p>
        </div>
      )}

      {/* EDUCATION LIST */}
      {data.length > 0 &&
        data.map((education, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            {/* CARD HEADER */}
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">
                Education #{index + 1}
              </h4>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* INPUT GRID */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Institution Name"
                value={education.institution || ""}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded"
              />

              <input
                type="text"
                placeholder="Degree (e.g.: Bachelor's, Master's)"
                value={education.degree || ""}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded"
              />

              <input
                type="text"
                placeholder="Field of Study"
                value={education.field || ""}
                onChange={(e) =>
                  updateEducation(index, "field", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded"
              />

              <input
                type="month"
                value={education.graduation_date || ""}
                onChange={(e) =>
                  updateEducation(index, "graduation_date", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded"
              />
            </div>

            <input
              type="text"
              placeholder="GPA (Optional)"
              value={education.gpa || ""}
              onChange={(e) => updateEducation(index, "gpa", e.target.value)}
              className="px-3 py-2 text-sm border rounded"
            />
          </div>
        ))}
    </div>
  );
};

export default EducationForm;
