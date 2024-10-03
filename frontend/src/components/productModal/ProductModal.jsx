import { Button, Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import "../../css/productModal.css";

import ProductModalImage from "./ProductModalImage";
import ProductModalInfo from "./ProductModalInfo";

const ProductModal = ({ product, closeProductModal }) => {
  return (
    <>
      <Dialog
        open={true}
        className="product-modal"
        onClose={() => closeProductModal()}
      >
        <Button className="close_" onClick={() => closeProductModal()}>
          <IoMdClose />
        </Button>

        <div className="row g-4 productDetailsModal">
          <div className="col-md-5">
            <ProductModalImage product={product} />
          </div>
          <div className="col-md-7 ">
            <ProductModalInfo product={product} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModal;
