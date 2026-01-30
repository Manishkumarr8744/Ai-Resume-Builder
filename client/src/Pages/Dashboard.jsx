import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  Form,
  LoaderCircleIcon,
  Pencil,
  PlusIcon,
  Trash,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
// import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../Utils/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const navigate = useNavigate();
  const colors = React.useMemo(
    () => ["#f87171", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa", "#f472b6"],
    [],
  );
  const [allResumes, setAllResumes] = React.useState([]);
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUploadResume, setShowUploadResume] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [resume, setResume] = React.useState(null);
  const [editResumeId, setEditResumeId] = React.useState("");
  const [Loading, setLoading] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/userResume", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllResumes(data.resume);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const uploadResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resumeText = await pdfToText(resume);

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
    setLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(
        `/api/resumes/update/`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this resume?",
      );
      if (!confirmed) return;
      if (confirmed) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllResumes((prev) =>
          prev.filter((resume) => resume._id != resumeId),
        );
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (!allResumes.length && token) {
      loadAllResumes();
    }
  }, [allResumes.length, token]);

  return (
    <div>
      <h1></h1>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent  ">
          Welcome, Manish
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-orange-300 to bg-orange-500 text-white rounded-full" />
            <p className=" text-sm  group-hover:text-orange-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to bg-purple-500 text-white rounded-full" />
            <p className=" text-sm  group-hover:text-orange-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>
        <hr className="border-slate-300 my-6 sm:w-76.25" />

        <div className=" grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes?.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={index}
                className="relative group w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border gap-2 group-hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg,${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500  transition-all duration-300 px02 text-center">
                  Updated on {new Date(resume.updatedAt).toLocaleString()}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <Trash
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                  <Pencil
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur flex items-center justify-center z-10"
            action=""
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shawdow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                required
                className="w-full px-4 py-2 mb-4  focus:border-orange-600 ring-orange-600"
              />
              <button className="w-full py-2 bg-orange-600 text-white  rounded hover:bg-orange-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="size-6 absolute top-4 right-4 text-orange-300 cursor-pointer hover:text-orange-400 transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur flex items-center justify-center z-10"
            action=""
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shawdow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload a Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                required
                className="w-full px-4 py-2 mb-4  focus:border-orange-600 ring-orange-600"
              />
              <input
                type="file"
                accept=".pdf,.docx"
                required
                className="w-full px-4 py-2 mb-4  focus:border-orange-600 ring-orange-600"
                onChange={(e) => setResume(e.target.files[0])}
              />
              <button
                disabled={Loading}
                className="w-full py-2 bg-purple-600 text-white  rounded hover:bg-purple-700 transition-colors flex justify-center items-center gap-2"
              >
                {Loading && (
                  <LoaderCircleIcon className="animate-spin size-4 text-white" />
                )}
                {Loading ? "Uploading..." : "Upload Resume "}
              </button>
              <XIcon
                className="size-6 absolute top-4 right-4 text-orange-300 cursor-pointer hover:text-orange-400 transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur flex items-center justify-center z-10"
            action=""
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shawdow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                required
                className="w-full px-4 py-2 mb-4  focus:border-orange-600 ring-orange-600"
              />
              <button className="w-full py-2 bg-orange-600 text-white  rounded hover:bg-orange-700 transition-colors">
                Update
              </button>
              <XIcon
                className="size-6 absolute top-4 right-4 text-orange-300 cursor-pointer hover:text-orange-400 transition-colors"
                onClick={() => {
                  setEditResumeId(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
