import React from "react"
import { formatNumber } from "../../utils/index"
import style from "./Thumbnail.module.css"
import PropTypes from "prop-types"

const Thumbnail = ({ productName, productPrice, productImage }) => {
  return (
    <div className={style.thumbnail}>
      <div>
        <div className={style.imageContainer}>
          <img
            src={productImage}
            alt="Thumbnail preview"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
        <div className={style.container}>
          <div>
            <h4>
              <b>{productName}</b>
            </h4>
          </div>
          <div>
            <p>${formatNumber(productPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

Thumbnail.defaultProps = {
  productName: "Lorem ipsum",
  productPrice: "100",
}

Thumbnail.propTypes = {
  productName: PropTypes.string,
  productPrice: PropTypes.any,
  productImage: PropTypes.string,
}

export default Thumbnail
