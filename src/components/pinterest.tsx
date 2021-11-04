import React from 'react'

export const Pinterest: React.FC<{ id: string; offset: number }> = ({
  id,
  offset,
}) => {
  if (!id) {
    return null
  }

  return (
    <div className={`col-${offset} iframe-container`}>
      <iframe
        title="This is a unique title"
        src={`https://assets.pinterest.com/ext/embed.html?id=${id}`}
        scrolling="no"
      />
    </div>
  )
}
