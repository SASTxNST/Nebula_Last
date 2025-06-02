import React from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">About SAST</h3>
            <p className="text-sm leading-relaxed">
              Society for Aerospace and Space Technology (SAST) is committed to igniting curiosity, innovation, and exploration in the field of space and technology through research, hands-on projects, and community engagement.
            </p>
            <div className="mt-2 flex space-x-4">
              <a
                href="https://www.instagram.com/sast.rishihood/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-pink-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/society-for-aerospace-and-space-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-blue-500"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Our Projects
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Initiatives</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Satellite Program
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Water Rocket Launch
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  TARS
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Research & Development
                </a>
              </li>
              <li>
                <a href="#" className="transition duration-200 hover:text-white">
                  Publications
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm">
                  Rishihood University, Sonipat, Haryana, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm">sast@rishihood.edu.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm">+91 7007191498</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-6 sm:px-6 lg:px-8 md:flex-row space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2025 Society for Aerospace and Space Technology. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="transition duration-200 hover:text-white text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="transition duration-200 hover:text-white text-gray-400">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;