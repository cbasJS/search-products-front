import React from "react"
import Emoji from "../Emoji"
import PropTypes from "prop-types"

const Form = ({ handleChange, handleSubmit, currentValue, msg, visible }) => {
  return (
    <form>
      <div>
        <label>
          Now type something <Emoji label="sheep" symbol="🤭" />{" "}
          <Emoji label="sheep" symbol="⤵" />:<br></br>
          <input
            type="text"
            name="param"
            value={currentValue}
            onChange={handleChange}
          ></input>
        </label>
      </div>
      <div>
        <input type="submit" value="Search" onClick={handleSubmit}></input>
      </div>
      {visible && (
        <div>
          <p style={{ color: "red" }}>Ups! Something went wrong! {msg}</p>
        </div>
      )}
    </form>
  )
}

Form.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default Form
