import React from 'react';

const ImageIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const GalleryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M9 9h6v6H9z"/>
    <path d="M21 15V9a2 2 0 0 0-2-2H9"/>
  </svg>
);

interface ControlTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function ControlTabs({ activeTab, setActiveTab }: ControlTabsProps) {

  const tabOptions = [
    {
      key: 'main',
      rounded: 'rounded-l-[22px]',
      title: (
        <div className="flex items-center gap-2">
          <ImageIcon />
          <span>Imagen principal</span>
        </div>
      )
    },
    {
      key: 'gallery',
      rounded: 'rounded-r-[22px]',
      title: (
        <div className="flex items-center gap-2">
          <GalleryIcon />
          <span>Galería de imágenes</span>
        </div>
      )
    }
  ];

  return (
    <div className="w-full flex justify-center">
        <div className="neumorphic-tabs w-fit rounded-lg">
          <div className="flex">
            {tabOptions.map((tab) => (
              <button
                key={tab.key}
                className={`${tab.rounded} px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab.key
                    ? 'text-emerald-600 border-emerald-500 bg-emerald-50/50' 
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
}