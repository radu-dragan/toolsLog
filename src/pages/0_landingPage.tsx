import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FuzzyContainer } from '../components/fuzzySearch/container'
import { AddBar } from '../components/landing_page_bar'

export const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Tool WareHouse'
  }, [])

  return (
    <div id="landing-page" className="level-0">
      <AddBar />
      <FuzzyContainer />
      <div className="landing-page-map">
        <Link to="/LandingTool/" className="link-unstyled">
          <b>List view</b>
        </Link>
      </div>
      )
    </div>
  )
}
