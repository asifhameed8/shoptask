export const getObjectDiff = (oldData, newData) => {
  const data1 = {
    ...oldData
  }

  const data2 = {
    ...newData
  }
  const diff = Object.keys(data2).reduce((diff, key) => {
    if (data1[key] === data2[key]) return diff
    return {
      ...diff,
      [key]: data2[key]
    }
  }, {})

  return diff
}