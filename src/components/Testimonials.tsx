import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    text: "CoolAirPro installed our new split system in no time. The team was professional, clean, and the price was very competitive. Highly recommend!",
  },
  {
    name: "James L.",
    role: "Restaurant Owner",
    text: "They've been maintaining our coolroom for over 3 years now. Reliable, quick to respond, and they always go above and beyond.",
  },
  {
    name: "Priya K.",
    role: "Office Manager",
    text: "Our office AC broke down mid-summer and they had it fixed within hours. Excellent service and fair pricing.",
  },
  {
    name: "Michael T.",
    role: "Property Manager",
    text: "Outstanding workmanship and communication from start to finish. Highly satisfied with the installation.",
  },
  {
    name: "David R.",
    role: "Business Owner",
    text: "Fast response, quality workmanship, and very friendly technicians. I would definitely recommend them.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            What Our Customers Say
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-12">
          {/* Left Arrow */}
          <button
            className="testimonial-prev absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-background border shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow */}
          <button
            className="testimonial-next absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-background border shadow-lg rounded-full w-11 h-11 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full min-h-[260px] flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    "{t.text}"
                  </p>

                  {/* Customer Info */}
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;