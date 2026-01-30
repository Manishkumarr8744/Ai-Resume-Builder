import { Loader2, WandSparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../Utils/api";
import toast from "react-hot-toast";

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent.content,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg  font-medium flex items-center gap-2 text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm  text-gray-500">Add summary to your resume</p>
        </div>
        <div>
          <button
            disabled={isGenerating}
            onClick={generateSummary}
            className="flex items-center gap-1 bg-blue-100 p-2 rounded-lg disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <WandSparkles className="text-blue-600" size={20} />
            )}

            <span className="text-blue-600">
              {isGenerating ? "AI working" : "AI Enhance"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          rows={5}
          className="w-full p-3 mt-3 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 resize-none outline-none transition-colors"
          name=""
          id=""
          placeholder="Write your professional summary that shows your skills and strength etc...."
        />
        <p className="text-gray-600 mx-auto w-[80%] text-center text-sm">
          Tip: Keep it concise (3-4 sentences) and highlight your key
          achievements and value proposition.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
