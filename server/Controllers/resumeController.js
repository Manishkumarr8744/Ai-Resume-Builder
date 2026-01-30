import { json } from "stream/consumers";
import imageKit from "../configs/imageKit.js";
import Resume from "../Models/resumeModel.js";
import fs from "fs";
import { console } from "inspector";

// /api/reusme/create  [POST -create resume]
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });
    return res
      .status(201)
      .json({ message: "Resume Created Successfully", resume: newResume });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// /api/resume/delete    [Delete - delete resume]
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });
    return res.status(201).json({ message: "Resume deleted Successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//get user resume by id [ GET - for user resume by id]
// /api/resume/:resumeId
export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const userId = req.userId;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not Found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    return res.status(201).json({ message: "Resume Found", resume });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//get resume by public id
//Get : /api/resume/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, public: true });
    if (!resume) {
      return res.status(401).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//for update resume
// /api/resume/update [PUT]
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;

    const image = req.file;

    const resumeDataCopy = JSON.parse(resumeData);

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resume",
        transformation: {
          pre:
            "w-300 , h-300,fo-face , z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true },
    );

    return res.status(200).json({ message: "updated resume saved", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
