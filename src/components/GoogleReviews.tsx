import { useEffect, useState } from "react";

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
}

const GOOGLE_API_KEY = "AIzaSyB2Dp5Vu2FTVPrlK-H0-E45Ohu8iT1PPNw";
const PLACE_ID = "ChIJx4vqV4tKgQYRIV41-q3kU0o";

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://places.googleapis.com/v1/places/ChIJx4vqV4tKgQYRIV41-q3kU0o?fields=displayName,rating,reviews&key=${GOOGLE_API_KEY}`
        );

        const data = await response.json();

        if (data.result?.reviews) {
          setReviews(data.result.reviews);
        }
      } catch (error) {
        console.error("Google Reviews Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading Reviews...
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">
            Google Reviews
          </h2>

          <p className="text-gray-600">
            Trusted by our happy customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {review.author_name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;