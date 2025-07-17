// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import { Card, CardContent } from "./ui/card";
// import testimonials from "../lib/testimonials.json";
// // import { Card } from "./ui/card";

// const TestimonialCarousel = () => {
//   return (
//     <div className="mt-24">
//       <h2 className="text-3xl font-bold text-center text-orange-900 mb-12">
//         What Our Writers Say
//       </h2>
//       <Carousel
//         plugins={[
//           Autoplay({
//             delay: 2000,
//           }),
//         ]}
//         className="w-full mx-auto"
//       >
//         <CarouselContent>
//           {testimonials.map((testimonial, index) => (
//             <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//               <Card className="bg-white/80 backdrop-blur-sm">
//                 <CardContent className="p-6">
//                   <blockquote className="space-y-4">
//                     <p className="text-orange-700 italic">
//                       &quot;{testimonial.text}&quot;
//                     </p>
//                     <footer>
//                       <div className="font-semibold text-orange-900">
//                         {testimonial.author}
//                       </div>
//                       <div className="text-sm text-orange-600">
//                         {testimonial.role}
//                       </div>
//                     </footer>
//                   </blockquote>
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default TestimonialCarousel;

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import testimonials from "../lib/testimonials.json";

const TestimonialCarousel = () => {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-center text-rose-900 mb-12">
        What Our Writers Say
      </h2>

      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="bg-white/60 backdrop-blur-md border border-rose-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <blockquote className="space-y-4 text-left">
                    <p className="text-rose-800 italic leading-relaxed">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <footer>
                      <div className="font-semibold text-rose-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-rose-700">
                        {testimonial.role}
                      </div>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default TestimonialCarousel;
