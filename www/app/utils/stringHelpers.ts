export function toCamelCase(text:string = '') {
    return text
        // Split the string into words using a regular expression
        .split(/\s+|_|-|(?=[A-Z])/)
        // Iterate over each word
        .map((word, index) => {
            // Lowercase all letters in the first word
            // Uppercase the first letter of subsequent words and lowercase the rest
            if (index === 0) {
                return word.toLowerCase();
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        })
        // Join all the words to get the CamelCase string
        .join('');
}

export function undoCasing(text: string = '') {
    // Insert a space before uppercase letters, lowercase the result, then trim leading/trailing spaces
    const spaced = text.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
    return spaced
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export  function toKebabCase(inputString: string = '') {
    // Step 1: Insert a hyphen before all capital letters and convert the entire string to lowercase
    let hyphenated = inputString.replace(/([A-Z])/g, '-$1').toLowerCase();
    
    // Step 2: Replace any spaces with hyphens (to handle space-separated strings)
    hyphenated = hyphenated.replace(/\s+/g, '-');
    
    // Step 3: Ensure the string doesn't start or end with a hyphen
    hyphenated = hyphenated.replace(/^-|-$/g, '');
  
    return hyphenated;
  }

  export function normalizePath(path: string) {
    return path.replace(/(?<!:\/)\/+/g, '/');
  }