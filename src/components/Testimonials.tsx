import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminReviews } from "@/services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchAdminReviews,
  });

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="section-container text-center">
          Loading reviews...
        </div>
      </section>
    );
  }

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
            {testimonials
              .filter((item) => !item.isInactive)
              .map((t) => (
                <SwiperSlide key={t.id}>
                 <div className="bg-card border rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= (t.rating || 0)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>

                    {/* Review Text */}
    <div className="flex-1 overflow-y-auto pr-2">
  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
    "{t.review || "No review provided"}"
  </p>
</div>

                    {/* Customer Info */}
                    <div>
                      <p className="font-bold text-foreground">
                        {t.reviewer || "Anonymous"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Verified Customer
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