import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import reviewsData from "@/data/googleReviews.json"; // Importamos el JSON directamente

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex gap-1 text-yellow-500">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={16} fill="#FFD700" stroke="none" />;
        } else if (i === fullStars && hasHalfStar) {
          return <Star key={i} size={16} fill="url(#half)" stroke="none" />;
        } else {
          return <Star key={i} size={16} fill="#E5E7EB" stroke="none" />;
        }
      })}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#E5E7EB", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const ReviewsSummary = ({ rating, totalReviews }) => {
  return (
    <div className="flex items-center gap-2">
      <StarRating rating={rating} />
      <span className="text-gray-700 text-lg">{rating.toFixed(1)}</span>
      <span className="text-gray-500 text-sm">({totalReviews} reseñas)</span>
    </div>
  );
};
ReviewsSummary.propTypes = {
  rating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);

  useEffect(() => {
    // Como el JSON ya está importado, lo usamos directamente sin fetch
    setReviews(reviewsData.reviews || []);

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setReviewsPerPage(1); // 1 columna
      } else if (window.innerWidth < 1024) {
        setReviewsPerPage(2); // 2 columnas
      } else {
        setReviewsPerPage(4); // 4 columnas
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamar al cargar la página

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const googleMapsReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"; // Reemplaza con el placeid correcto de tu empresa

  return (
    <section className="bg-gray-100 text-center p-0 border-r border-l pt-8 pb-4 pl-8 pr-8 shadow-md relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold">Opiniones de los clientes</h3>
        <ReviewsSummary rating={reviewsData.rating} totalReviews={reviewsData.user_ratings_total} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentReviews.map((review, index) => (
          <Card key={index} className="shadow-lg rounded-xl p-4 flex flex-col h-full bg-white">
            <CardContent className="flex flex-col h-full">
              <div className="flex items-center gap-4">
                <img
                  src={review.profile_photo_url || "/default-user.png"}
                  alt={review.author_name || "Usuario desconocido"}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review.author_name || "Anónimo"}</h3>
                  <StarRating rating={review.rating || 0} />
                  <p className="text-xs text-gray-500">{review.relative_time_description || "Fecha desconocida"}</p>
                </div>
              </div>
              <p className="text-gray-600 mt-2 flex-grow">{review.text || "Sin comentario."}</p>
              {review.photos && review.photos.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {review.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo.photo_reference ? `https://example.com/photo/${photo.photo_reference}` : "/placeholder.jpg"}
                      alt="Review Image"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-lg leading-none text-center disabled:opacity-50"
        >
          ⟨
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-800 bg-opacity-70 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:bg-opacity-100 hover:shadow-lg hover:scale-110 text-white text-lg leading-none text-center disabled:opacity-50"
        >
          ⟩
        </button>
      </div>

      <div className="mt-6">
        <a
          href={googleMapsReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-blue-600"
        >
          <div className="flex items-center">
            <div className="OyjIsf zemfqc"></div>
            <span className="Cw1rxd google-symbols" aria-hidden="true" style={{ fontSize: "18px" }}></span>
            <span className="GMtm7c fontTitleSmall ml-2">Escribir una reseña</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Reviews;