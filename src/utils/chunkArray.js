
/**
 * Chunks an array so we can split it up into smaller parts.
 * @param {*} array of the content
 * @param {*} size to be chunked
 * @returns 
 */
const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
};

export default chunkArray;