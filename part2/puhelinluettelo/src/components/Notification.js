import React from "react"

const Notification = ({msg}) => {
    if (msg === null){
        return null
    }
    const {notification, type} = msg
    return (
        <div className={type}> {notification}</div>
    )
  }

  export default Notification