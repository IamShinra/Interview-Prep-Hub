import React, { useState } from 'react';
import { DownIcon } from './Icon';
import { useRouter } from 'next/router';

function Navigation() {
  const router = useRouter();
  
  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      downIcon: false,
    },
    {
      name: "Blogs",
      downIcon: false,
    },
    {
      name: "Paid Meetings",
      downIcon: false,
    },
    {
      name: "Data Structure Algorithm",
      image: "network_8833068.png",
      downIcon: true,
      sectionVisibility: false,
      section: ["Solve Problem", "Learning"],
    },
    {
      name: "Web Development",
      image: "webdev.png",
      downIcon: false,
    },
    {
      name: "Mobile Development",
      image: "mobiledev.png",
      downIcon: false,
    },
    {
      name: "Machine Learning",
      image: "ml.png",
      downIcon: false,
    },
    {
      name: "Deep Learning",
      image: "ai.png",
      downIcon: false,
    },
    {
      name: "Database (DBMS)",
      image: "database.png",
      downIcon: false,
    },
    {
      name: "Computer Networking",
      image: "computerNetworking.png",
      downIcon: false,
    },
    {
      name: "Aptitude",
      image: "aptitude.png",
      downIcon: false,
    },
  ]);

  const handleClick = (currTab) => {
    const routes = {
      "Home": "/",
      "Blogs": "/section/blog",
      "Paid Meetings": "/section/appointments",
      "Data Structure Algorithm": "/section/dsa",
      "Web Development": "/section/webdev",
      "Aptitude": "/section/aptitude",
      "Solve Problem": "/section/dsa/practice",
      "Learning": "/section/dsa/",
      "Mobile Development": "/section/mobiledev",
      "Deep Learning": "/section/deeplearning",
      "Machine Learning": "/section/machinelearning",
      "Database (DBMS)": "/section/dbms",
      "Computer Networking": "/section/computernetworking",
    };

    const path = routes[currTab.name? currTab.name : currTab];
    if (path) router.push(path);
  };

  const toggleSectionVisibility = (index) => {
    const updatedMenuItems = menuItems.map((item, i) => (
      i === index ? { ...item, sectionVisibility: !item.sectionVisibility } : item
    ));
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className='w-[300px]'>
      <div className='h-screen ml-3'>
        <div className='p-2'>
          <img src='/parul-logo-black.png' alt='Parul Logo' />
        </div>
        <div className='flex flex-col space-y-5 justify-center mt-10'>
          {menuItems.map((ele, i) => (
            <React.Fragment key={i}>
              <div
                className='w-full h-10 px-4 hover:scale-110 transition duration-500'
                onClick={() => {
                  if (ele.downIcon) {
                    toggleSectionVisibility(i);
                  } else {
                    handleClick(ele);
                  }
                }}
              >
                <h1 className='items-center h-full px-5 border-2 rounded-lg bg-[#EEECFF] text-theme-primary flex justify-between'>
                  {ele.image && <span className='w-5'><img src={`/Navigation/${ele.image}`} alt={ele.name} /></span>}
                  {ele.name}
                  {ele.downIcon && <DownIcon className="w-4" />}
                </h1>
              </div>

              {ele.sectionVisibility &&
                ele.section.map((section, j) => (
                  <div
                    key={j}
                    className='w-full h-10 px-4 hover:scale-110 transition duration-500'
                    onClick={() => handleClick(section)}
                  >
                    <h1 className='items-center h-full px-5 border-2 rounded-lg bg-[#EEECFF] text-theme-primary flex justify-between'>
                      {section}
                    </h1>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
