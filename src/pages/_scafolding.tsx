import React from 'react'

export const DT: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <>
      <dt className="col-sm-4">{title}</dt>
      <dd className="col-sm-8">{value}</dd>
    </>
  )
}
