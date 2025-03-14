'use client';
import React from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Testimonial {
  name: string;
  title: string;
  testimonial: string;
  image: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: 'Jean Dupont',
    title: 'PDG, Entreprise X',
    testimonial: 'MyBoltVision a transformé notre façon de travailler. Nous avons gagné en efficacité et en productivité.',
    image: '/icons/stars.svg',
  },
  {
    name: 'Marie Martin',
    title: 'Directrice Marketing, Société Y',
    testimonial: 'La plateforme est intuitive et facile à utiliser. Nous recommandons vivement MyBoltVision.',
    image: '/icons/stars.svg',
  },
  {
    name: 'Pierre Durand',
    title: 'Développeur, Startup Z',
    testimonial: 'Nous avons intégré MyBoltVision dans notre flux de travail et les résultats sont impressionnants.',
    image: '/icons/stars.svg',
  },
];

export const Testimonials = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    className: "testimonial-slider"
  };

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Témoignages</h2>
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="p-6">
              <div className="flex flex-col items-center rounded-lg shadow-md p-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mb-4" />
                <p className="text-gray-700 italic text-center mb-4">{testimonial.testimonial}</p>
                <p className="font-semibold">{testimonial.name}, {testimonial.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
