import React from 'react'

export const SItem: React.FC<{
  title?: string
  titleExtra?: string | any
  children?: any
}> = ({ title = 'Lorem Ipsum', children, titleExtra }) => {
  return (
    <div className="sidebar-item">
      <div>
        <b>{title}</b>
        {titleExtra && <span className="pull-right">{titleExtra}</span>}
      </div>
      <hr />
      {children}
    </div>
  )
}
