import { Layout } from 'lucide-react';
import React from 'react'

const TemplateSelector = ({selectedTemplate="Classic",onChange}) => {
    const [isOpen,setIsOpen]=React.useState(false);

    const templates=[
        {id:'classic',name:'Classic'},
        {id:'modern',name:'Modern'},
        {id:'minimal',name:'Minimal'},
        {id:'minimalImage',name:'Minimal Image'},
    ]

  return (
    <div className='relative'>
        <button onClick={()=>{setIsOpen(!isOpen)}} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Layout size={14}/><span className='max-sm:hidden'>Template</span>
        </button>
        {isOpen &&(
            <div className='absolute top-full left-0 w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => {
                            onChange(template.id);
                            setIsOpen(!isOpen);
                        }}
                        className={`relative border transition-all   text-left p-3 rounded-md cursor-pointer ${
                            selectedTemplate === template.id
                                ? "bg-blue-100 text-blue-700"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        {template.name}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector