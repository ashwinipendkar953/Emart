import { useEffect, useState } from "react";
import { Dialog, DialogContent, Button, Rating } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import AddReviewForm from "./AddReviewForm";
import { formatDate } from "../../../utils/helpers";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductReviews } from "../productSlice";
import ProductReviewsLoader from "./ProductReviewsLoader";

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const { productReviews, isLoading } = useSelector((state) => state?.products);
  console.log(productReviews);

  useEffect(() => {
    dispatch(fetchAllProductReviews(product?._id));
  }, [dispatch, product]);

  const handleOpenReviewDialog = () => {
    if (user === null) {
      toast.error("Please Login...!");
    } else {
      setOpenReviewDialog(true);
    }
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  return (
    <div className="px-4">
      {isLoading ? (
        <ProductReviewsLoader />
      ) : (
        <div className="row g-3">
          {productReviews?.length > 0 ? (
            productReviews?.map((el, index) => (
              <div className="col-lg-6" key={index}>
                <div className="review-item card pb-0 h-100">
                  <div className="p-3">
                    <div className="d-flex d-grid pb-2 gap-2 align-items-center">
                      {el?.userId?.profilePic ? (
                        <img
                          className="img-fluid rounded-circle user-profile"
                          src={el?.userId?.profilePic}
                          alt={el?.userId?.name}
                          style={{ width: "40px", height: "40px" }}
                        />
                      ) : (
                        <FaRegCircleUser size={25} />
                      )}
                      <p className="mb-0 text-capitalize">{el?.userId?.name}</p>
                    </div>
                    <div className="d-md-flex justify-content-between align-items-center">
                      <Rating
                        name="read-only"
                        value={el?.rating}
                        readOnly
                        precision={0.5}
                      />
                      <h6 className="mb-0 pb-0 fw-bold">{el?.headline}</h6>
                    </div>
                    <p
                      className="fw-semibold mb-0 pb-0"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                    >
                      Reviewed on {formatDate(el?.createdAt)}
                    </p>
                    <p className="mb-0">{el.review}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      )}

      <Button
        variant="contained"
        className="btn-pink text-capitalize my-3"
        onClick={handleOpenReviewDialog}
      >
        Add Review
      </Button>

      <Dialog
        open={openReviewDialog}
        onClose={handleCloseReviewDialog}
        PaperProps={{
          style: {
            maxWidth: "900px",
            width: "900px",
            padding: "25px",
            zIndex: 2000,
          },
        }}
      >
        <Button className="close_" onClick={handleCloseReviewDialog}>
          <IoMdClose />
        </Button>

        <DialogContent>
          <AddReviewForm onClose={handleCloseReviewDialog} product={product} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviews;
