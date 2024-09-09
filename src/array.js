export function binarySearch(array, target, attribute) {
  let left = 0;
  let right = array.length - 1;
  
  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (array[mid][attribute] < target) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }
  
  return left;
}

export function lowHigh(array, attribute) {
  return array.reduce((acc, element) => {
    if (acc[0] === undefined || element[attribute] < acc[0]) {
      acc[0] =  Math.floor(element[attribute] / 20) * 20;
    }

    if (acc[1] === undefined || element[attribute] > acc[1]) {
      acc[1] = Math.ceil(element[attribute] / 20) * 20;
    }
    return acc;
  }, []);
}