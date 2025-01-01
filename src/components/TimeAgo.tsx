import React from 'react'
import { format } from "timeago.js"
interface TimeAgoProp {
    date: string
}
export default function TimeAgo({ date }: TimeAgoProp) {
  return (<span>{format(date)}</span>)
}
