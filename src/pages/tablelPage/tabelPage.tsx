import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from '../Skaffolding/container'
import { allHeaderkeys, translateToolCode } from './tablePageHelpers'
import './tablePageStyles.scss'

export const tablePage: React.FC = () => {
  const storeData: any = useSelector((state) => state)
  const keys = Object.keys(
    _.omit(storeData, [
      'logTools',
      'allTools',
      'allConsumables',
      'allBike',
      'allStorage',
    ])
  ).sort()

  return (
    <>
      {keys.map((item: string, key: number) => {
        const subItems = Object.keys(storeData[item])
        const header = allHeaderkeys(storeData[item])
        const keyIndex = `${item}${key}`

        return (
          <Container
            title={item}
            subTitle={translateToolCode(item)}
            key={keyIndex}
            fluid
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  {header.map((i: string) => (
                    <th key={i}>{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subItems.sort().map((id: string) => (
                  <tr key={id}>
                    <td>
                      <pre className="no-brake">
                        <b>
                          <Link to={`/${item}-${id}`}>
                            {item}-{id}
                          </Link>
                        </b>
                      </pre>
                    </td>
                    {header.map((i: string) => {
                      const valueOfItem = JSON.stringify(
                        _.get(storeData, `[${item}][${id}][${i}]`),
                        null,
                        2
                      )
                      return (
                        <td
                          className={[valueOfItem ? '' : 'no-data', i].join(
                            ' '
                          )}
                          key={i}
                        >
                          <pre>{valueOfItem || i}</pre>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        )
      })}
    </>
  )
}
