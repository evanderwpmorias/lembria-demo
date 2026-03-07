import expand from 'emmet';

/**
 * Converts Emmet abbreviation to template nodes for the component builder
 * @param emmetString - The Emmet abbreviation string
 * @returns Array of template nodes
 */
export const parseEmmetToTemplateNodes = (emmetString: string): any[] => {
  try {
    // Generate HTML from Emmet using the expand function
    const html = expand(emmetString);
    
    // Parse the HTML into a DOM structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Convert DOM nodes to componentTemplateNode format
    const convertNode = (node: Element): any => {
      const templateNode = {
        kind: 'element',
        tag: node.tagName.toLowerCase(),
        classes: {},
        style: {},
        attributes: {},
        children: [] as any[][],
        content: '',
        source: '',
        repeatSource: false
      };

      // Extract classes
      if (node.className) {
        const classArray = node.className.split(' ').filter(cls => cls.trim());
        classArray.forEach(cls => {
          templateNode.classes[cls] = true;
        });
      }

      // Extract attributes (excluding class which we handle separately)
      Array.from(node.attributes).forEach(attr => {
        if (attr.name !== 'class') {
          templateNode.attributes[attr.name] = attr.value;
        }
      });

      // Extract text content (if no child elements)
      if (node.children.length === 0 && node.textContent?.trim()) {
        templateNode.content = node.textContent.trim();
      }

      // Convert child elements
      if (node.children.length > 0) {
        const childNodes: any[] = [];
        Array.from(node.children).forEach(child => {
          if (child instanceof Element) {
            childNodes.push(convertNode(child));
          }
        });
        if (childNodes.length > 0) {
          templateNode.children = childNodes;
        }
      }

      return templateNode;
    };

    // Extract all elements from body
    const bodyElements = Array.from(doc.body.children);
    return bodyElements.map(element => convertNode(element as Element));

  } catch (error) {
    console.error('Error parsing Emmet:', error);
    throw new Error('Invalid Emmet syntax');
  }
};
