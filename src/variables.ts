const initialData = {
    "Parameter": "",
    "Weights": 0,
    "PreferredCountry": "",
    "USPoints": 0,
    "IndiaPoints": 0
}

const PrimaryColor = "#009CFF"

const Countries = ["India", "US"]

const headerStyle = {
    fontWeight: 550,
    fontSize: 22,
    backgroundColor: 'skyblue'
}

const tableInputStyle = {
    fontSize: 20,
    width: "inherit",
    textAlign: 'center',
    padding: '0',
    '& .MuiInputBase-formControl': {
        height: 33,
        fontSize: 20,
    },
    '& .MuiOutlinedInput-input': {
        textAlign: 'center',
        fontSize: 20,
    }
}

const tabledropdownStyle = {
    width: "inherit",
    height: 33,
    boxSizing: "border-box",
    fontSize: 20,
}

export {
    initialData,
    Countries,
    headerStyle,
    tableInputStyle,
    tabledropdownStyle,
    PrimaryColor
}