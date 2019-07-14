import React, { useState, useEffect } from "react"
import fetch from "cross-fetch"
import MainLayout from "../layouts/MainLayout"
import SEO from "../components/SEO"
import Section from "../components/Section"
import SectionThumbnails from "../components/SectionThumbnails"
import Thumbnail from "../components/Thumbnail"
import Form from "../components/Form"
global.Headers = fetch.Headers

const IndexPage = () => {
  let [param, setParam] = useState("")
  let [searchesDonePrevious, setSearchesDonePrevious] = useState([])
  let [msg, setMsg] = useState("")
  let [data, setData] = useState(null)
  let [visible, setVisible] = useState(false)

  useEffect(() => {
    setSearchesDonePrevious(
      localStorage.getItem("searches-previous")
        ? JSON.parse(localStorage.getItem("searches-previous"))
        : []
    )
  }, [])

  useEffect(() => {
    visible && setTimeout(() => setVisible(!visible), 3000)
  }, [visible])

  const handleChange = event => {
    setParam(event.target.value)
  }

  const handleSubmit = event => {
    fetch(
      `http://www.liverpool.com.mx/tienda?s=${param}&d3106047a194921c01969dfdec083925=json`
    )
      .then(res => {
        if (res.status >= 400) {
          console.log(res.json())
          throw new Error("Bad response from server")
        }
        return res.json()
      })
      .then(result => {
        setData(result.contents[0].mainContent[3].contents)
      })
      .catch(err => {
        setMsg(err.message)
        setVisible(!visible)
        console.log("error", err.message)
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

  return (
    <MainLayout>
      <SEO title="Home" />
      <h1>Hi there!</h1>
      <p>Welcome to the search product project.</p>
      <Section>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          currentValue={param}
          msg={msg}
          visible={visible}
        />
      </Section>
      <Section>
        {searchesDonePrevious.length > 0 && (
          <div>
            <div>
              <p>Your last 5 searches</p>
            </div>
            <ul>
              {searchesDonePrevious.map((value, index) => (
                <li key={index}>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {data !== null && (
        <React.Fragment>
          <Section>
            <h3>We found {data[0].totalNumRecs} products</h3>
          </Section>
          <SectionThumbnails>
            {data[0].records.map((record, index) => {
              return (
                <Thumbnail
                  key={index}
                  productName={record.productDisplayName[0]}
                  productPrice={record.productPrice[0]}
                  productImage={record.thumbnailImage[0]}
                />
              )
            })}
          </SectionThumbnails>
        </React.Fragment>
      )}
    </MainLayout>
  )
}

export default IndexPage
