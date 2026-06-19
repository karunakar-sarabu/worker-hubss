import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-14">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}

          <div className="grid-cols-1 md:grid-cols-4">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Daily Wage Connect
            </h2>

            <p className="text-gray-400">
              Connecting workers and employers across Telangana.
            </p>
          </div>

          {/* Quick Links */}

          <div className="grid-cols-1 md:grid-cols-4">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Find Jobs</li>
              <li>Browse Workers</li>
              <li>Post Jobs</li>
              <li>Register</li>
            </ul>
          </div>

          {/* Contact */}

          <div className="grid-cols-1 md:grid-cols-4">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">
              Contact
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Hyderabad, Telangana</li>
              <li>support@dailywageconnect.com</li>
              <li>+91 XXXXX XXXXX</li>
            </ul>
          </div>

          {/* Social */}

          <div className="grid-cols-1 md:grid-cols-4">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              Follow Us
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>WhatsApp</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center grid-cols-1 md:grid-cols-4">

          <p className="text-gray-400">
            © 2026 Daily Wage Connect. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;