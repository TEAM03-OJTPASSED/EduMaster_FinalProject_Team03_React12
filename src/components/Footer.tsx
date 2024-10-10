import mainImage from "../assets/EduMaster-mainBackground.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquarePinterest } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="w-full bg-gray-100 p-4">
      {/* Center container for the footer content */}
      <div
        className="flex justify-between items-start mx-auto"
        style={{ width: "90%" }}
      >
        {/* Column 1 */}
        <div className="flex-1 mr-2">
          <img
            src={mainImage}
            alt="main image"
            style={{
              objectFit: "cover",
              width: "300px",
              paddingBottom: "30px",
            }} // Adjusted width for the image
          />
          <div style={{ paddingLeft: "25px", fontSize: "14px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            consectetur quos. Ab explicabo accusamus hic blanditiis voluptatibus
            non suscipit ex?
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1 mx-2 pt-5 ml-3">
          <div className="flex flex-col">
            <div className="text-2xl font-medium pb-5">GET HELP</div>
            <a href="/contact" className="p-1 pb-2">
              Contact Us
            </a>
            <a href="/" className="p-1 pb-2">
              Latest Articles
            </a>
            <a href="/FAQs" className="p-1 pb-2">
              FAQ
            </a>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex-1 mx-2 pt-5 ml-3">
          <div className="flex flex-col">
            <div className="text-2xl font-medium pb-5">PROGRAMS</div>
            <a href="/" className="p-1 pb-2">
              Art & Design
            </a>
            <a href="/" className="p-1 pb-2">
              Business
            </a>
            <a href="/" className="p-1 pb-2">
              IT & Software
            </a>
            <a href="/" className="p-1 pb-2">
              Languages
            </a>
            <a href="/" className="p-1 pb-2">
              Programming
            </a>
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex-1 mx-2 pt-5 ml-3">
          <div className="flex flex-col">
            <div className="text-2xl font-medium pb-5">CONTACT US</div>
            <span className="p-1 pb-5">
              Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA{" "}
            </span>
            <span className="p-1 pb-5">
              Tel: + (123) 2500-567-8988 Mail: supportlms@gmail.com
            </span>
          </div>
          <span className="flex items-center space-x-4 p-1 pb-5">
            <FaFacebookSquare />
            <FaSquarePinterest />
          </span>
        </div>
      </div>
      <div
        className="border-t border-primary mt-5 flex justify-center items-center"
        style={{ padding: "30px" }}
      >
        Copyright © {new Date().getFullYear()} Let Learn At Edu Master for your
        future | Powered by Team 3
      </div>
    </div>
  );
};

export default Footer;
