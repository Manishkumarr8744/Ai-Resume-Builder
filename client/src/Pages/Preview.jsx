import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Compoents/Loader";
import ResumePreview from "../Compoents/ResumePreview";
import { ArrowLeftIcon } from "lucide-react";
import api from "../Utils/api.js";
import toast from "react-hot-toast";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch resume
  const loadResume = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      if (data?.resume) {
        setResumeData(data.resume);
      } else {
        setResumeData(null); // resume not found
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  if (isLoading) return <Loader />;

  if (!resumeData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-center text-6xl text-orange-400">Resume Not Found</p>
        <a
          href="/"
          className="flex text-white text-center items-center text-2xl mt-6 py-2 px-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 ring ring-green-400 hover:ring-green-700 transition-colors"
        >
          <ArrowLeftIcon className="size-7 mr-2" />
          Go to Home Page
        </a>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          classes="py-4 bg-white"
          data={resumeData}
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  );
};

export default Preview;
