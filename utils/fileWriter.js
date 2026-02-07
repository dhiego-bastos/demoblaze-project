import ENV from '../config/env.js';
import fs from 'fs';
import path from 'path';

function getFormattedTimestamp() {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return {
    readable: `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`,
    fileSafe: `${month}-${day}-${year}_${hours}-${minutes}-${seconds}`
  };
}

export function writeProductsToFile(products) {
  const timestamp = getFormattedTimestamp();

  const exportsDir = path.resolve('exports');
  const fileName = `Product_List_${timestamp.fileSafe}.txt`;
  const filePath = path.join(exportsDir, fileName);

  const header = `Product List - ${timestamp.readable}\n\n`;

  const body = products
    .map(product => {
        const fullLink = new URL(product.prodLink, ENV.baseURL).href;
        return `Name: ${product.prodName}
Price: ${product.prodPrice}
Link: ${fullLink}
-----------------------------`;
    })
    .join('\n');

  const content = header + body;

  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`📄 File created at: ${filePath}`);
}

