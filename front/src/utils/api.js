import axios from 'axios'


export const fetchRange = () =>
    axios
        .get('http://localhost:3001/range')
        .then(data => data.data);

export const fetchDataList = (year, regional = true) =>
    axios
        .get(`http://localhost:3001/data?year=${year}&regional=${regional}`)
        .then(data => data.data);
