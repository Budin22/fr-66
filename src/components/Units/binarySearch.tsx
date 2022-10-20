interface idI {
  id: string;
}

export const binarySearch = (arr: idI[], id: string): number => {
  let start = 0,
    end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (Number(arr[mid].id) === Number(id)) {
      return mid;
    }

    if (Number(id) < Number(arr[mid].id)) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};
