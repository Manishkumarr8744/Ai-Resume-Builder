import { Plus, Sparkle, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
    
  const [newSkill, setNewSkills] = useState("");

  const addSkills = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkills("");
    }
  };

  const removeSkills = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key == "enter") {
      e.preventDefault();
      addSkills();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-9 00">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills
        </p>
      </div>

      <div>
        <input
          onKeyDown={handleKeyPress}
          value={newSkill}
          onChange={(e) => setNewSkills(e.target.value)}
          type="text"
          placeholder="Enter a skill (e.g., python , javascript,Project Management"
          className="flex-1 px-3 py-4 text-sm "
        />
        <button onClick={()=>{addSkills()}} disabled={!newSkill.trim()} className="flex mt-3 items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus size={20}/>Add
        </button>
      </div>
      {data.length>0?(
        <div className="flex flex-wrap gap-2">
            {data.map((skill,index)=>{
               return <span key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm ">{skill} <button onClick={()=>removeSkills(index)} className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors "><X size={23}/></button></span>
            })}
        </div>
      ):(
        <div className="text-center py-6 text-gray-500 ">
            <Sparkle size={10} className="mx-auto mb-2 text-gray-300"/>
            <p>No skills Added yet.</p>
            <p className="text-sm">Add your technical and soft skills above</p>
        </div>
      )}

      <div className="bg-blue-100 py-2 px-3 rounded-xl">
        <p><strong>Tip: </strong>Add up-to 7-8 skills including both technical and soft skills</p>
      </div>
    </div>
  );
};

export default SkillsForm;
