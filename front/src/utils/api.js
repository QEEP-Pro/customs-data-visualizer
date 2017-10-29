import axios from 'axios'


export const fetchRange = () =>
    axios
        .get('http://localhost:3001/range')
        .then(data => data.data);

export const fetchDataList = (year) =>
    axios
        .get(`http://localhost:3001/data?year=${year}`)
        .then(data => data.data);
