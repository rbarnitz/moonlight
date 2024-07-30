import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// shortened book file for testing
import testJSON from './testfile.json';

// Initializing fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;

//creating preferred fonts for text and headers
pdfMake.fonts = {
  merriweather: {
    normal: 'Merriweather-Regular.ttf',
    bold: 'Merriweather-Regular.ttf',
    italics: 'Merriweather-Regular.ttf',
    bolditalics: 'Merriweather-Regular.ttf',
  },
  montserrat: {
    normal: 'Montserrat-Regular.ttf',
    bold: 'Montserrat-Bold.ttf',
    italics: 'Montserrat-VariableFont_wght.ttf',
    bolditalics: 'Montserrat-VariableFont_wght.ttf',
  },
};
// Optional: Set Roboto as the default font
pdfmake.defaultFont = 'merriweather';

function PDFMake({ jsonData }) {
  //altering code to accept testJSON file instead of jasonData imported through state:

  // Declare metadata state
  const [metadata, setMetadata] = useState(null);
  const [data, setData] = useState(null);
<<<<<<< HEAD
  //parsing test data
  console.log('testJSON', testJSON);
=======
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projects);
>>>>>>> 4b3dc00f29d772737d91a21b0ad86af9eb765407

  useEffect(() => {
    if (jsonData) {
      //This line is switching out the state data to instead use the testfile.json linked above
      const data = testJSON;
      //typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

      // Check if metadata exists in parsed data
      if (data && data.metadata) {
        // Set metadata
        setMetadata(data.metadata);
        setData(data);
      }
    }
  }, [jsonData]);

  // If metadata is not yet available, return null
  if (!metadata) {
    return null;
  }

  // Document definition
  const documentDefinition = {
    content: [],

    header: function (currentPage) {
      if (currentPage > 3) {
        return {
          font: 'merriweather',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20, 0, 0],
          text: currentPage % 2 ? metadata.author : metadata.bookTitle,
        };
      }
      return null;
    },

    // header: {
    //   text: metadata.author,
    //   font: 'montserrat',
    //   fontSize: 10,
    //   alignment: 'center',
    //   margin: [0, 20, 0, 0],
    // },

    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [40, 60, 40, 60],
    defaultStyle: {
      font: 'merriweather',
    },
    pageSize: {
      //page size is in 'points', where 1 inch = 72 points.
      //will need to add other page sizes to accommodate gutters
      width: 432,
      height: 648,
    },

    // Footer
    footer: (currentPage, pageCount) => {
      // Exclude page numbers from the first three pages
      if (currentPage <= 2) {
        return null; // Return null to exclude page number
      } else {
        // Adjust page number to start from 1 after the third page
        const adjustedPageNumber = currentPage - 2;

        return {
          //text: `Page ${currentPage} of ${pageCount}`,
          text: `${adjustedPageNumber} `,
          alignment: 'center',
          fontSize: 10,
          margin: [0, 30, 0, 0],
        };
      }
    },
  };

  console.log(documentDefinition.pageCount);

  // Title page
  const titlePage = {
    text: metadata.bookTitle,
    fontSize: 24,
    font: 'montserrat',
    bold: true,
    alignment: 'center',
    margin: [0, 100, 0, 0],
  };
  documentDefinition.content.push(titlePage);

  const authorTitle = {
    text: metadata.author,
    fontSize: 20,
    font: 'montserrat',
    bold: false,
    alignment: 'center',
    margin: [0, 20, 0, 0],
  };
  documentDefinition.content.push(authorTitle);
  documentDefinition.content.push({ text: '', pageBreak: 'before' });

  // Table of Contents
  const tocTitle = {
    text: 'Table of Contents',
    fontSize: 18,
    font: 'montserrat',
    alignment: 'center',

    bold: true,
    margin: [0, 20, 0, 20], // Top margin
  };
  documentDefinition.content.push(tocTitle);

  //create table of contents
  const TOC = {
    toc: {
      // id: 'mainToc'  // optional
    },
  };
  documentDefinition.content.push(TOC);
  documentDefinition.content.push({ text: '', pageBreak: 'before' });

  // variable chapter page numbers
  const chapterPageNumbers = [];

  // Iterate over each question in the JSON data to populate TOC and chapters
  data.questions.forEach((question, index) => {
    // Add page break before starting a new chapter
    if (index !== 0) {
      documentDefinition.content.push({ text: '', pageBreak: 'before' });
    }

    // Add ID for linking from TOC
    const chapterId = `Chapter${index + 1}`;

    const chapterTitle = {
      text: question.title,
      fontSize: 14,
      alignment: 'center',
      font: 'montserrat',
      bold: false,
      margin: [30, 20, 30, 0], // Bottom margin
      id: chapterId, // Set ID for linking from TOC
      tocItem: true,
    };
    documentDefinition.content.push(chapterTitle);

    console.log(chapterTitle);

    // Record the page number for the current chapter
    chapterPageNumbers.push({ chapterId: chapterId, pageNumber: '?' });
    console.log('chapter page numbers', chapterPageNumbers);

    // Iterate over each element in the chapter
    question.elements.forEach((element) => {
      if (element.type === 'text') {
        const textContent = {
          text: element.value,
          alignment: 'justify',
          fontSize: 10.5,
          margin: [30, 20, 30, 0], // Text margins
        };
        documentDefinition.content.push(textContent);
      } else if (element.type === 'image') {
        const imageContent = {
          image: element.value,
          width: 150, // Adjust the width as needed
        };
        documentDefinition.content.push(imageContent);
      }
    });

    // Add spacing between chapters
    documentDefinition.content.push({
      text: '',
      margin: [0, 0, 0, 20],
    });
  });

  // Create PDF
  var pdfDoc = pdfmake.createPdf(documentDefinition);
  //opens pdf in a new tab
  pdfDoc.open();
  pdfDoc.download(`${metadata.bookTitle}`); // Download the generated PDF

  return null; // Placeholder return statement
}

export default PDFMake;





<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>Prime Solo Project</title>
  </head>
  <body>
    <script src="node_modules/pdfmake/build/pdfmake.min.js"></script>
    <script src="src/components/PDFMake/vfs_fonts.js"></script>
    <script src="src/components/PDFMake/PDFMake.jsx"></script>
    <noscript> You need to enable JavaScript to run this app. </noscript>
    <div id="react-root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>










const fs = require('fs');

const vfsBefore = "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = ";
const vfsAfter = ";";
const sourcePath = process.argv[2];
const vfsFilename = process.argv[3] ? process.argv[3] : './build/vfs_fonts.js';

var vfs = {};

if (sourcePath === undefined) {
	console.error('Usage: node build-vfs.js path [filename]');
	console.log('');
	console.log('Parameters:');
	console.log('  path      Source path with fonts.');
	console.log('  filename  Optional. Output vfs file. Default: ./build/vfs_fonts.js');
	console.log('');
	console.log('Examples:');
	console.log('  node build-vfs.js "examples/fonts"');
	console.log('  node build-vfs.js "examples/fonts" "./build/vfs_fonts.js"');
	return;
}

if (!fs.existsSync(sourcePath)) {
	console.error('Source path "' + sourcePath + '" not found.');
	return;
}

console.log('Source path:', sourcePath);
console.log('');

var files = fs.readdirSync(sourcePath);

files.forEach(function (file) {
    // Skip directories
    if (fs.lstatSync(sourcePath + '/' + file).isDirectory()) {
        return;
    }

	if (file !== '.DS_Store') { // Skip reading .DS_Store file
		var fileBase64 = fs.readFileSync(sourcePath + '/' + file).toString('base64');
		console.log('FILE:', file);

		vfs[file] = fileBase64;
	}
});

const vfsFileContent = vfsBefore + JSON.stringify(vfs, null, 2) + vfsAfter;
fs.writeFileSync(vfsFilename, vfsFileContent);

console.log('');
console.log('Builded ' + Object.keys(vfs).length + ' files to ' + vfsFilename + '.');










vfs_fonts.js

