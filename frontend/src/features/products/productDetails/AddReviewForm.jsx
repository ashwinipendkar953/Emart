import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import {
  addProductReview,
  fetchAllProductReviews,
  fetchProductDetails,
} from "../productSlice";
import { toast } from "react-toastify";

const AddReviewForm = ({ onClose, product }) => {
  const dispatch = useDispatch();
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);
  const productId = product?._id;

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      productId,
      headline,
      review,
      rating,
    };

    if (rating === 0) {
      setError(true);
      return; // Prevent submission if rating is not set
    }

    dispatch(addProductReview(reviewData)).then(() => {
      dispatch(fetchAllProductReviews(product?._id));
      dispatch(fetchProductDetails(product?._id));
      toast.success("Review added successfully.");
    });

    setHeadline("");
    setReview("");
    setRating(0);

    // Close the dialog if onClose is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="fw-bold border-bottom-grey  mt-0 pt-0">Create Review</h4>

      {/* Rating */}
      <div className="mb-3">
        <label className="form-label fw-bold fs-5">Overall rating</label>
        <div>
          <Rating
            name="simple-controlled rating"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
              setError(false);
            }}
            size="large"
          />
          {error && (
            <p className="text-danger fw-semibold">Rating is required.</p>
          )}
        </div>
      </div>

      {/* headline */}
      <div className="mb-3">
        <label htmlFor="headline" className="form-label fw-bold fs-5">
          Add a headline
        </label>
        <input
          id="headline"
          type="text"
          className="form-control"
          value={headline}
          placeholder="What's most important to know?"
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
      </div>

      {/* Review */}
      <div className="mb-3">
        <label htmlFor="review" className="form-label fw-bold fs-5">
          Add a written review
        </label>
        <textarea
          id="review"
          className="form-control"
          placeholder="What did you like or dislike? What did you use this product for?"
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-pink fw-semibold d-flex ms-auto">
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
