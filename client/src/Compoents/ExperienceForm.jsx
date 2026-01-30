import { Briefcase, Loader2, Plus, Sparkle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../Utils/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);

    const experience = data[index];
    const prompt = `Enhance this job description: "${experience.description}" 
    for the position of ${experience.position} at ${experience.company}.`;

    try {
      const response = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      updateExperience(
        index,
        "description",
        response?.data?.enhancedContent?.content ||
          response?.data?.content ||
          "",
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your job experience</p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-1 bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          <Plus size={18} className="text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">
            Add Experience
          </span>
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          <Briefcase size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No work experience added yet</p>
          <p className="text-sm">
            Click <span className="font-semibold">Add Experience</span> to get
            started
          </p>
        </div>
      )}

      {/* EXPERIENCE LIST */}
      {data.length > 0 && (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={experience.id}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* CARD HEADER */}
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* INPUT GRID */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg"
                />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg"
                />

                <input
                  type="month"
                  disabled={experience.is_current}
                  value={experience.end_date}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg disabled:bg-gray-100"
                />
              </div>

              {/* CURRENT JOB */}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) => {
                    updateExperience(index, "is_current", e.target.checked);
                    if (e.target.checked) {
                      updateExperience(index, "end_date", "");
                    }
                  }}
                />
                Currently working here
              </label>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.description ||
                      !experience.company ||
                      !experience.position
                    }
                    type="button"
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-200 disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkle size={16} />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  placeholder="Describe your responsibilities and achievements..."
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
