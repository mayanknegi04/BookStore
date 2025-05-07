import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BookyVerse</h1>
          <p className="text-lg mb-8">
            A place where stories come to life. Explore, discover, and dive into the world of books.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-600 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-8">
            At BookyVerse, we are passionate about providing a space for book lovers of all kinds. Our mission is to offer a carefully curated collection of books that inspire, educate, and entertain. Whether you're a fiction enthusiast or looking for academic texts, our store is the place where your next adventure begins.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-teal-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-600 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-8">
            Have a question about our bookstore or a specific book? Feel free to reach out to us, and we'll be happy to assist you!
          </p>
          <a
            href="mailto:contact@booyVerse.com"
            className="inline-block bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
