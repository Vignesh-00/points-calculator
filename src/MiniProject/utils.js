import axios from 'axios'

// const SHEET_ID = '1V8otKvnMSlYfQltT-8lRmdqgNWpwZaQkjW2AMincuyI'
// const API_KEY = 'AIzaSyAqcm9664nbTLSilnZ90i3h6gbGF-Mdjhw'

const SHEET_ID = '1rwpbsxMHg63u0UgMvNXtFJU3Hhh9MXiBSZwTxuY_UKE'
const API_KEY = 'AIzaSyB0OENwPY2oePIPGvmaNTlTroEL0ifbsX4'

function toPascalCase(string) {
  const words = string.split(' ');
  const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return pascalCaseWords.join('');
}

function formatResponse(response) {
  const keys = response.values[0];
  const data = response.values.slice(1);
  const obj = data.map(arr => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
  return obj
}


function getSheetData(sheetName = "") {

  const SHEET_NAME = sheetName;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

  return axios.get(url)
    .then(function (response) {
      return formatResponse(response.data);
    })
    .catch(function (error) {
      console.log(error)
    })
}

const getLastRow = async (sheetName = "") => {
  try {
    const SHEET_NAME = sheetName;
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A1:A`,
      {
        params: {
          majorDimension: 'ROWS',
          key: API_KEY,
        },
      }
    );
    return response.data.values.length + 1;
  } catch (error) {
    console.error('Error getting last row:', error);
    return 1; // Default to start from row 1 if there's an error
  }
};

const appendData = async (sheetName = "", lastRow = 1) => {
  const SHEET_NAME = sheetName;
  const response = await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A${lastRow}:append?valueInputOption=RAW&majorDimension=ROWS&key=${API_KEY}`,
    {
      values: [['q1']],
    },
  );
  return response.data
}


const animationStyle = () => {
  return `fadeIn 1s ease forwards`
}

export {
  toPascalCase,
  formatResponse,
  getSheetData,
  animationStyle,
  getLastRow,
  appendData
}