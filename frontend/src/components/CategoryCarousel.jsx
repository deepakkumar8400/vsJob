import React from "react";
import { Button } from "@/components/ui/button"; // Corrected Button import
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Corrected Carousel imports

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Graphic Designer",
  "Fullstack Developer",
  "Data Scientist",
  "Product Manager",
];

const CategoryCarousel = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-1 p-6">
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 mb-8">
        Explore Job Categories 🚀
      </h2>

      {/* Carousel Component */}
      <Carousel className="relative w-full">
        <CarouselContent className="flex gap-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="flex justify-center">
                <Button className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl rounded-xl transition-transform transform hover:scale-105 active:scale-95">
                  {category}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-0 bg-gray-800/60 text-white p-3 rounded-full hover:bg-gray-900 transition-all" />
        <CarouselNext className="absolute right-0 bg-gray-800/60 text-white p-3 rounded-full hover:bg-gray-900 transition-all" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
