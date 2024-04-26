export const checkEmptyOrNull = (arr) => {
    return arr.some((fields) => {
        return fields?.trim() == "" || fields === null || fields === undefined;
    });
};
