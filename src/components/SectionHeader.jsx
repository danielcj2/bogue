import React from 'react'

const SectionHeader = ({name, heading, paragraph}) => {
  return (
    <div className={name + "__header"}>
      <h1 className="upp">{heading}</h1>
      <p>{paragraph}</p>
    </div>
  )
}

export default SectionHeader
