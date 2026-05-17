type DiscountImageSectionProps = {
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
};

const DiscountImageSection = ({ imageUrl, imageAlt, videoUrl }: DiscountImageSectionProps) => {
  return (
    <section className="section-padding pt-8 ">
      <div className="section-container">
        <div className="overflow-hidden">
          {videoUrl ? (
            <div className="w-full overflow-hidden rounded-md border border-border bg-black/5">
              <video
                controls
                src={videoUrl}
                className="h-[320px] w-full object-contain sm:h-[420px] md:h-[520px] lg:h-[620px]"
                aria-label={imageAlt ?? "Discount video"}
              />
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? "Discount offer"}
              className="h-[320px] w-full object-contain sm:h-[420px] md:h-[520px] lg:h-[620px]"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DiscountImageSection;
