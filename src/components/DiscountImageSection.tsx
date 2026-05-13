type DiscountImageSectionProps = {
  imageUrl: string;
  imageAlt?: string;
};

const DiscountImageSection = ({ imageUrl, imageAlt }: DiscountImageSectionProps) => {
  return (
    <section className="section-padding pt-8 pb-0">
      <div className="section-container">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt ?? "Discount offer"}
            className="h-[320px] w-full object-contain sm:h-[420px] md:h-[520px] lg:h-[620px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default DiscountImageSection;
