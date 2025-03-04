/**
 * Generates a unique ID using an MD5 hash.
 *
 * @param {string} content - The content to hash.
 * @param {string} label - A prefix label for the generated ID.
 * @returns {string} The generated unique ID.
 */
declare const generateID: (content: string, label: string) => string;
export default generateID;
