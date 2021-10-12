import React from 'react'

import s from './Table.module.scss'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface IProps {
  data: any
}

export const Table = ({data}: IProps) => {
  console.log(`data`, data)
  const {month, index} = data
  return (
    <section className={s.tableWrapper}>
      <table className={s.table}>
        <thead>
          <tr>
            {days.map((d, i) => <th>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {month[index].days.map((row: any, i: any) => <tr>{row.map((col: any, i: any) => <td>{col.date}</td>)}</tr>)}
        </tbody>
      </table>
    </section>
  )
}
