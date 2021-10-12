import React from 'react'
import { useDispatch } from 'react-redux'

import s from './Header.module.scss'

interface IProps {
  currMonth: string;
  currYear: number;
}

export const Header = ({currMonth, currYear}: IProps) => {
  const dispatch = useDispatch()
  return (
    <div className={s.header}>
      <button onClick={() => dispatch({type: 'nextMonth'})}>prev</button>
      <h1>{currMonth} {currYear}</h1>
      <button>next</button>
    </div>
  )
}
