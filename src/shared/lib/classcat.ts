interface Obj {
    [key:string]: boolean
}

export default  function cc(className: (string | Obj | undefined)[]): string {
    const style:string[] = []

    className.forEach(el=> {
      if(typeof  el === 'string') {
          style.push(el)
      }
      if(el && !!Object.values(el)?.[0] && typeof  el !== 'string'){
          style.push(Object.keys(el)?.[0])
      }
  })


    return style.join(' ')
}
