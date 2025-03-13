import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Ce que nos clients disent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-md rounded-md">
            <p className="text-gray-700 italic mb-4">
              "BoltVision a transformé notre façon de travailler. Nous avons gagné en efficacité et en clarté."
            </p>
            <p className="text-right">- Client 1</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-md">
            <p className="text-gray-700 italic mb-4">
              "L'interface est intuitive et les fonctionnalités sont puissantes. Je recommande BoltVision à tous."
            </p>
            <p className="text-right">- Client 2</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
