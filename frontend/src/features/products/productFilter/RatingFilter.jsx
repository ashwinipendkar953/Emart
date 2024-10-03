import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRatingFilter } from "../productSlice";

const RatingFilter = ({ rating, params, handleUrlChange }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(params?.rating !== undefined){
      dispatch(setRatingFilter(params.rating))
    }
  }, [dispatch, params.rating])

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Rating</label>
      {[4, 3, 2, 1].map((el) => (
        <div className="form-check" key={el}>
          <input
            className="form-check-input"
            type="radio"
            value={el}
            id={`rating${el}AndAbove`}
            checked={rating == el || params.rating == el}
            onChange={(e) => {
              handleUrlChange("rating", e.target.value);
              dispatch(setRatingFilter(e.target.value));
            }}
          />
          <label htmlFor={`rating${el}AndAbove`}>{el} stars & above</label>
        </div>
      ))}
    </div>
  );
};

export default RatingFilter;
