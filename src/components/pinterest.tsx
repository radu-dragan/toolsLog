import _ from 'lodash'
import React from 'react'
import './pinterest.style.scss'

export const Pinterest: React.FC<{ id: string | string[]; offset: number }> = ({
  id,
  offset,
}) => {
  if (!id) {
    return null
  }

  return (
    <div className={`col-${offset} iframe-container`}>
      {_.isArray(id) ? (
        <>
          {id.map((itemId: string) => (
            <div className="responsive">
              <iframe
                id={itemId}
                key={itemId}
                title="This is a unique title"
                src={`https://assets.pinterest.com/ext/embed.html?id=${itemId}`}
                scrolling="no"
              />
            </div>
          ))}
        </>
      ) : (
        <div className="responsive">
          <iframe
            title="This is a unique title"
            src={`https://assets.pinterest.com/ext/embed.html?id=${id}`}
            scrolling="no"
          />
        </div>
      )}
    </div>
  )
}
