import { FaReact } from "react-icons/fa";
import { SiJavascript, SiPython, SiTailwindcss } from "react-icons/si";
import { BiLogoPostgresql, BiLogoJava } from "react-icons/bi";

const TechIcons = () => {
  return (
    <div>
      <div className="mt-2">
        <div className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110">
          <SiPython color="#0277BD" size="1em" />
          <p>Python</p>
        </div>
        <div className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110">
          <BiLogoPostgresql color="#2f658d" size="1em" />
          <p>PostgeSQL</p>
        </div>
        <div className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110">
          <FaReact color="#61DBFB" size="1em" />
          <p>React</p>
        </div>
        <div className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110">
          <SiJavascript color="#F0DB4F" size="1em" />
          <p>JavaScript</p>
        </div>
        <div className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110">
          <SiTailwindcss color="#2f658d" size="1em" />
          <p>Tailwind CSS</p>
        </div>
        <div className="inline-flex items-center space-x-2 mr-2 transform transition-transform duration-300 hover:scale-110">
          <BiLogoJava size="1em" />
          <p>Java</p>
        </div>
      </div>
    </div>
  );
};

export default TechIcons;
