type DiscountImageSectionProps = {
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
};

const DiscountImageSection = ({ imageUrl, imageAlt, videoUrl }: DiscountImageSectionProps) => {
  return (
    <section className="section-padding pt-6 ">
      <div className="section-container">
       <div className="flex justify-center  rounded-2xl">
          {videoUrl ? (
           <div className="flex justify-center bg-[#e9eef5] rounded-2xl">
  <video
    controls
    src={videoUrl}
    className="w-full max-w-4xl h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] object-contain rounded-2xl shadow-2xl"
    aria-label={imageAlt ?? "Discount video"}
  />
</div>
          ) : imageUrl ? (
            <div className="flex justify-center bg-[#e9eef5] rounded-2xl "> <img src={imageUrl} alt={imageAlt ?? "Discount offer"} className="w-full max-w-4xl h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] object-contain rounded-2xl shadow-2xl" loading="lazy" /> </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DiscountImageSection;
