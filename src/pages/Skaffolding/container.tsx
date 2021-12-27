import React from 'react'
import { Link } from 'react-router-dom'
import { AddBar } from '../../components/landing_page_bar'

export const Container: React.FC<{
  addBar?: boolean
  title?: string
  subTitle?: string
  children?: any
  sidebar?: any
  back?: boolean
  fluid?: boolean
}> = ({
  addBar = true,
  title = 'Lorem Ipsum',
  children,
  sidebar,
  subTitle,
  back = true,
  fluid = false,
}) => {
  return (
    <>
      {back && (
        <Link className="container-back" to="/">
          &lsaquo;
        </Link>
      )}
      {addBar && <AddBar />}
      <div className={fluid ? 'container-fluid' : 'container'}>
        <div className="row">
          <h1>{title}</h1>
          {subTitle && <h2>{subTitle}</h2>}
          <div className={sidebar ? 'col-8' : 'col-12'}>{children}</div>
          {sidebar && <div className="col-4">{sidebar}</div>}
        </div>
      </div>
    </>
  )
}
