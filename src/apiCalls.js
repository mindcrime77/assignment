import axios from 'axios'

export const currencyList = async () => {
    const { data } = await axios.get("https://api.exchangerate-api.com/v4/latest/EUR");
    return data
}

export const accomodationsList = async () => {
    const { data } = await axios.get("https://5ddbbbd5041ac10014de14d7.mockapi.io/accommodations/prices");
    return data
}