import React, { useState, useEffect } from "react"
import fetch from "cross-fetch"
import MainLayout from "../layouts/MainLayout"
import SEO from "../components/SEO"
import Emoji from "../components/Emoji"
global.Headers = fetch.Headers

const IndexPage = () => {
  const [param, setParam] = useState("")
  const [searchesDonePrevious, setSearchesDonePrevious] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    setSearchesDonePrevious(
      localStorage.getItem("searches-previous")
        ? JSON.parse(localStorage.getItem("searches-previous"))
        : []
    )
  }, [])

  const handleChange = event => {
    setParam(event.target.value)
  }

  const handleSubmit = event => {
    fetch(
      `http://www.liverpool.com.mx/tienda?s=${param}&d3106047a194921c01969dfdec083925=json`
    )
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server")
        }
        return res.json()
      })
      .then(result => {
        setData(result.contents[0].mainContent[3].contents)
      })
      .catch(err => {
        console.error(err)
      })
    if (searchesDonePrevious.length >= 5) {
      searchesDonePrevious.shift()
    }
    searchesDonePrevious.push(param)
    localStorage.setItem(
      "searches-previous",
      JSON.stringify(searchesDonePrevious)
    )
    event.preventDefault()
  }
  console.log(data)

  return (
    <MainLayout>
      <SEO title="Home" />
      <h1>Hi there!</h1>
      <p>Welcome to the search product project.</p>
      <p>
        Now type something <Emoji label="sheep" symbol="🤭" />{" "}
        <Emoji label="sheep" symbol="⤵" />:
      </p>
      <form>
        <div>
          <label>
            <input
              type="text"
              name="param"
              value={param}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div>
          <input type="submit" value="Search" onClick={handleSubmit}></input>
        </div>
      </form>
      {searchesDonePrevious.length > 0 && (
        <div>
          <p>Tus ultimas 5 busquedas</p>
          {searchesDonePrevious.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default IndexPage
