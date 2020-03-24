import React from 'react'

import classNames from 'classnames'

interface SectionProps {
  id: string
  className?: string
  skew?: boolean
  arrow?: boolean
  orientation?: string[]
}

const Section: React.FC<SectionProps> = ({
  id,
  className,
  skew,
  arrow,
  orientation,
  children,
}) => {
  const orientationModifier = orientation && orientation.filter(Boolean).join('-')
  const sectionClass = classNames('section', className, {
    [`separator-skew-${orientationModifier}`]: skew && orientation,
    [`separator-arrow`]: arrow,
  })

  return (
    <section id={id} className={sectionClass}>
      {children}
    </section>
  )

}

export default Section
