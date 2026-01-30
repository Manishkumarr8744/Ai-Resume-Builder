import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowBigLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkle,
  User,
} from "lucide-react";
import PersonalInfoForm from "../Compoents/PersonalInfoForm";
import ResumePreview from "../Compoents/ResumePreview";
import TemplateSelector from "../Compoents/TemplateSelector";
import ColorPicker from "../Compoents/ColorPicker";
import ProfessionalSummary from "../Compoents/ProfessionalSummary";
import ExperienceForm from "../Compoents/ExperienceForm";
import EducationForm from "../Compoents/EducationForm";
import ProjectForm from "../Compoents/ProjectForm";
import SkillsForm from "../Compoents/SkillsForm";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../Utils/api";

const ResumeBuilder = () => {
  const { resumeID } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = React.useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    work_experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  const [removeBg, setRemoveBg] = React.useState(false);

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const sections = [
    { id: "personal", name: "personal_info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkle },
  ];

  const activeSection = sections[activeSectionIndex];

  const changeResumeVisiblity = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeID);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleShare = () => {
    const frontendURL = window.location.href.split("/app/")[0];
    const resumeURL = frontendURL + "/view/" + resumeID;

    if (navigator.share) {
      navigator.share({ url: resumeURL, text: "My Resume" });
    } else {
      alert("share not allowed on this browser");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      if (typeof resumeData.personal_info.image === "string") {
        delete updatedResumeData.personal_info.image;
      }

      const formdata = new FormData();
      formdata.append("resumeId", resumeID);
      formdata.append("resumeData", JSON.stringify(updatedResumeData));
      removeBg && formdata.append("removeBackground", "yes");

      typeof resumeData.personal_info.image === "object" &&
        formdata.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (resumeID) {
      loadExistingResume();
    }
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6  ">
        <Link
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transitiom-all"
          to="/app"
        >
          <ArrowBigLeft className="w-6 h-6" />
          Back To Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12  gap-8">
          {/*form - left side */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border  border-gray-200 p-6 pt-1">
              {/* progress bar by activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200 " />
              <hr
                className=" absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-2">
                <div className="flex justify-center items-center mb-6 gap-2 py-1">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData({ ...resumeData, template })
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData({ ...resumeData, accent_color: color })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={activeSectionIndex === 0}
                      className="flex items-center gap-1 p-3 rounded-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1),
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* form Contet */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <div>
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: {
                            ...prev.personal_info,
                            ...data,
                          },
                        }))
                      }
                      removeBg={removeBg}
                      setRemoveBg={setRemoveBg}
                    />
                  </div>
                )}
                {activeSection.id === "summary" && (
                  <div>
                    <ProfessionalSummary
                      data={resumeData.professional_summary}
                      onChange={(data) => {
                        setResumeData((prev) => ({
                          ...prev,
                          professional_summary: data,
                        }));
                      }}
                      setResumeData={setResumeData}
                    />
                  </div>
                )}

                {activeSection.id === "experience" && (
                  <div>
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) => {
                        setResumeData((prev) => ({
                          ...prev,
                          experience: data,
                        }));
                      }}
                    />
                  </div>
                )}

                {activeSection.id === "education" && (
                  <div>
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) => {
                        setResumeData((prev) => ({ ...prev, education: data }));
                      }}
                    />
                  </div>
                )}

                {activeSection.id === "projects" && (
                  <div>
                    <ProjectForm
                      data={resumeData.project}
                      onChange={(data) => {
                        setResumeData((prev) => ({ ...prev, project: data }));
                      }}
                    />
                  </div>
                )}

                {activeSection.id === "skills" && (
                  <div>
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) => {
                        setResumeData((prev) => ({ ...prev, skills: data }));
                      }}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  toast.promise(saveResume, { loading: "Saving..." });
                }}
                className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm "
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* preview - right side */}
          <div className="relative  lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-sm bg-gradient-to-br from-orange-200 text-orange-600 rounded-lg ring-orange-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisiblity}
                  className="flex items-center gap-2 justify-center text-center p-2 px-4 text-sm bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors "
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public === true ? "Public" : "Private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 justify-center text-center p-2 px-4 text-sm bg-gradient-to-br from-blue-100 to-purple-200 text-blue-600 ring-blue-300 rounded-lg hover:ring transition-colors "
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
              </div>
            </div>
            {/* Resume preview */}
            <div id="print-resume">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
