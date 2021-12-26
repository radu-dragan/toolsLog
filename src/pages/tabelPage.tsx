import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from './Skaffolding/container'

export const tablePage: React.FC = () => {
  const storeData: any = useSelector((state) => state)
  const keys = Object.keys(
    _.omit(storeData, ['logTools', 'allTools', 'allConsumables'])
  )
  return (
    <>
      {keys.map((item: string) => {
        const subItems = Object.keys(storeData[item])
        const header = Object.keys(storeData[item][subItems[0]])

        return (
          <Container title={item}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  {header.map((i) => (
                    <th>{i}</th>
                  ))}
                </tr>
              </thead>

              {subItems.sort().map((id: string) => (
                <tr>
                  <td>
                    <pre>
                      <b>{item}-{id}</b>
                    </pre>
                  </td>
                  {header.map((i: any) => {
                    const valueOfItem = JSON.stringify(
                      _.get(storeData, `[${item}][${id}][${i}]`),
                      null,
                      2
                    )
                    return (
                      <td className={valueOfItem ? '' : 'no-data'}>
                        <pre>{valueOfItem || i}</pre>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </table>
          </Container>
        )
      })}
    </>
  )
}
