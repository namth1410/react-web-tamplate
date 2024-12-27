import { Nullable } from "types/common";

export function compareArrays(array1: any[], array2: any[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (JSON.stringify(array1[i]) !== JSON.stringify(array2[i])) {
      return false;
    }
  }

  return true;
}

export const isOutDated = (
  startDate: string | undefined,
  endDate: string | undefined
): boolean => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Chỉ lấy ngày hiện tại

  if (!startDate || !endDate) {
    return true;
  }

  const start = new Date(
    new Date(startDate).getFullYear(),
    new Date(startDate).getMonth(),
    new Date(startDate).getDate()
  );
  const end = new Date(
    new Date(endDate).getFullYear(),
    new Date(endDate).getMonth(),
    new Date(endDate).getDate()
  );

  return today < start || today > end;
};

export const areObjectsDeepEqual = (obj1: any, obj2: any): boolean => {
  // Nếu một trong hai đối tượng không phải là object hoặc null thì trả về so sánh trực tiếp
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // Nếu là mảng, kiểm tra mảng không quan tâm thứ tự
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // Sắp xếp các phần tử trong mảng theo key hoặc bất kỳ thuộc tính nào để so sánh
    obj1 = obj1.sort((a, b) => (a.key > b.key ? 1 : -1)); // Sắp xếp theo key
    obj2 = obj2.sort((a, b) => (a.key > b.key ? 1 : -1)); // Sắp xếp theo key

    // So sánh từng phần tử trong mảng
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item: any, index: any) =>
      areObjectsDeepEqual(item, obj2[index])
    );
  }

  // Nếu là object, so sánh keys và values
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(
    (key) => keys2.includes(key) && areObjectsDeepEqual(obj1[key], obj2[key])
  );
};

export const areStringArraysEqual = (
  arr1: string[] | undefined | null,
  arr2: string[] | undefined | null
): boolean => {
  // Chuyển undefined hoặc null thành mảng rỗng
  const safeArr1 = arr1 ?? [];
  const safeArr2 = arr2 ?? [];

  if (safeArr1.length !== safeArr2.length) return false;

  // Sắp xếp cả hai mảng và so sánh từng phần tử
  const sortedArr1 = [...safeArr1].sort();
  const sortedArr2 = [...safeArr2].sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

export const areArraysDeepEqualUnordered = (
  array1: Nullable<any[]>,
  array2: Nullable<any[]>
): boolean => {
  // Nếu cả hai đều là null hoặc undefined, coi như bằng nhau
  if (array1 == null && array2 == null) {
    return true;
  }

  // Nếu một trong hai là null hoặc undefined, trả về false
  if (array1 == null || array2 == null) {
    return false;
  }

  // Nếu không phải mảng, hoặc độ dài khác nhau, trả về false
  if (
    !Array.isArray(array1) ||
    !Array.isArray(array2) ||
    array1.length !== array2.length
  ) {
    return false;
  }

  // Tạo bản sao và sắp xếp từng phần tử theo JSON.stringify (để xử lý thứ tự)
  const sortedArray1 = [...array1].sort((a, b) =>
    JSON.stringify(a) > JSON.stringify(b) ? 1 : -1
  );
  const sortedArray2 = [...array2].sort((a, b) =>
    JSON.stringify(a) > JSON.stringify(b) ? 1 : -1
  );

  // So sánh từng phần tử trong hai mảng đã sắp xếp
  return sortedArray1.every((item, index) =>
    areObjectsDeepEqual(item, sortedArray2[index])
  );
};
