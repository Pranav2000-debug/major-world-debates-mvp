import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center text-white">About Us</h1>

        {/* Intro Section */}
        <p className="text-lg sm:text-xl text-gray-300 text-center mb-12">
          “The MVP of our debate platform allows users to select curated debate topics and engage in structured text-based debates, either against AI
          or other users. It includes a simple Cambridge-style format to guide discussions, tracks basic user performance, and provides a foundational
          community experience, proving the concept of accessible, interactive, and skill-building online debating.”
        </p>

        {/* Team Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition duration-300">
            <img src="https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg" alt="Team Member" className="mx-auto rounded-full mb-4 w-32 h-32 object-cover" />
            <h2 className="text-xl font-semibold text-white mb-2">Alice Johnson</h2>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition duration-300">
            <img src="https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg" alt="Team Member" className="mx-auto rounded-full mb-4 w-32 h-32 object-cover" />
            <h2 className="text-xl font-semibold text-white mb-2">Bob Smith</h2>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition duration-300">
            <img src="https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg" alt="Team Member" className="mx-auto rounded-full mb-4 w-32 h-32 object-cover" />
            <h2 className="text-xl font-semibold text-white mb-2">Clara Lee</h2>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg sm:text-xl">
            Our mission is to foster a community where people can debate respectfully, learn from different perspectives, and grow intellectually. We
            believe in the power of discussion to bring change and understanding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
