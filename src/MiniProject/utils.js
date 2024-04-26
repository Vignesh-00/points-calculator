import axios from 'axios'

// const SHEET_ID = '1V8otKvnMSlYfQltT-8lRmdqgNWpwZaQkjW2AMincuyI'
// const API_KEY = 'AIzaSyAqcm9664nbTLSilnZ90i3h6gbGF-Mdjhw'

const SHEET_ID = '12mzZqgaXzsmTwo3CGQuVFHZaggUD_Wurd15ryNrMOLA'
const API_KEY = 'AIzaSyAqcm9664nbTLSilnZ90i3h6gbGF-Mdjhw'

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

const formatImageUrl = (url) => {
  if (url) {
    let id = url.split("https://drive.google.com/file/d/")[1]?.split('/')[0] || ""
    let formatted = `https://drive.google.com/uc?export=view&id=${id}`
    return formatted
  }
  else return ""
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


function getSheetDataCount(sheetName = "") {

  const SHEET_NAME = sheetName;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

  return axios.get(url)
    .then(function (response) {
      // if(sheetName === "Chair"){
      //   return {
      //     Chair : response?.data?.values?.filter(d => d[1] === "Chair")?.length,
      //     Co_Chair : response?.data?.values?.filter(d => d[1] === "Co-chair")?.length
      //   }
      // }
      return response?.data?.values?.length;
    })
    .catch(function (error) {
      console.log(error)
    })
}

const duration = 500; // ms
const delay = 100; // ms

const animationStyle = (i) => {
  // return ''
  return `fadeIn ${duration}ms ease-out ${delay * (i + 1)}ms forwards`;
}

function getUnique(arr) {
  let mapObj = new Map()

  arr.forEach(v => {
    let prevValue = mapObj.get(v.Theme)
    if (!prevValue) {
      mapObj.set(v.Theme, v)
    }
  })
  return [...mapObj.values()]
}

export {
  toPascalCase,
  formatResponse,
  formatImageUrl,
  getSheetData,
  getSheetDataCount,
  animationStyle,
  getUnique
}