import React, { Fragment } from 'react'

interface SuperProps {
  data?: any
}

export const RqguieTool: React.FC<SuperProps> = () => {
    // bombine super props with the item in redux
    // use the decode
  return (
    <Fragment>
      <h1>SubTools</h1>
      <div className="row">
        <hr />

        <div className="col-4">
          {/* {subToolList.map((key: string) => (
              <Link
                to={`../${encodeURIComponent(key)}`}
                className="link-unstyled"
                key={key}
              >
                {key}&nbsp;
              </Link>
            ))} */}
        </div>
      </div>
    </Fragment>
  )
}
