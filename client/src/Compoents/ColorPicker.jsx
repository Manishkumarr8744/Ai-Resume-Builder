import { Check, Palette } from "lucide-react";
import React from "react";

const ColorPicker = ({ onChange, selectedColor }) => {
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Black", value: "#1F2937" },
    { name: "Teal", value: "#14b8ac" },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-sm text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 ring-orange-300 hover:ring-transition-all px-3 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        // onChange={}
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>
      {isOpen &&(
            <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm ">
                {colors && colors.map((color)=>(
                    <div key={color.value} className="relative cursor-pointer group flex flex-col"
                    onClick={()=>{onChange(color.value),setIsOpen(!isOpen)}}>
                        <div className={`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors`} style={{backgroundColor:color.value}}>

                        </div>
                        <div>
                            {selectedColor===color.value &&(
                                <div className="absoulet top-0 left-0 bottom-4.5 flex items-center justify-center">
                                    <Check size={5} className="text-white"/>
                                </div>
                            )}
                            <p className="text-xs mt-1 text-center">{color.name} </p>
                        </div>

                    </div>
                ))}
            </div>
      )}
    </div>
  );
};

export default ColorPicker;
