import { Searcher } from 'fast-fuzzy'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RequiredRowNewLight } from '../../pages/RequiredToolsPage/row'
import './fuzzyStyle.scss'

export const FuzzyContainer: React.FC = () => {
  const superData: any = []
  const storeData: any = useSelector((state) => state)
  Object.keys(storeData).forEach((x: string) => {
    if (['A', 'BK', 'CX', 'Z', 'X'].indexOf(x) !== -1) {
      Object.keys(storeData[x]).forEach((x2: string) => {

        superData.push({
          id: `${x}-${x2}`,
          data: `${x}-${x2} ${JSON.stringify(Object.values(storeData[x][x2]))}`,
        })
      })
    }
  })

  const [inputV, setInputV] = useState('')
  const searchData = new Searcher(superData, {
    keySelector: (obj: any) => obj.data,
  })

  const searchOutput: any = searchData
    .search(inputV)
    .reduce((total: any, current: any) => {
      return [...total, current.id]
    }, [])

  return (
    <div className="container" id="block-fuzzy">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for tool"
          onChange={(e: any) => {
            setInputV(e?.target?.value)
          }}
        />
      </div>
      {!!searchOutput.length && (
        <div>
          <ul className="list-group list-group-flush">
            {searchOutput.map((key: string) => {
              return <RequiredRowNewLight id={key} key={key} />
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
