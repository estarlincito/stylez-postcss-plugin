import crypto from 'crypto';

/**
 * Generates a unique ID using an MD5 hash.
 *
 * @param {string} content - The content to hash.
 * @param {string} label - A prefix label for the generated ID.
 * @returns {string} The generated unique ID.
 */
const generateID = (content: string, label: string): string => {
  return `${label}${crypto
    .createHash('md5')
    .update(`stylez${content}`)
    .digest('hex')
    .slice(0, 8)}`;
};

export default generateID;
