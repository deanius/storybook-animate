import React, { useEffect, useState } from "react"
import { after } from "polyrhythm"
import { repeat } from "rxjs/operators"
import { concat } from "rxjs"
/**
 * Rerenders a component each time an Observable of props (propStream)
 * yields a new value
 */
export const Animate = ({
  propStream = after(0, {}),
  component,
  loop = false
}) => {
  const [props, setProps] = useState({})

  const propChanges = loop
    ? concat(propStream, after(1000, null)).pipe(repeat())
    : propStream
  useEffect(() => {
    let sub = propChanges.subscribe((newProps = {}) => setProps(newProps))
    return () => sub && sub.unsubscribe()
  }, [])
  return React.createElement(component, props)
}
