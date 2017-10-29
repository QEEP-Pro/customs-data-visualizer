import axios from 'axios'

const BASE_HOSTNAME = window.location.hostname;

export const fetchRange = () =>
    axios
        .get(`http://${BASE_HOSTNAME}:3001/range`)
        .then(data => data.data);

export const fetchDataList = (year, regional = true) =>
    axios
        .get(`http://${BASE_HOSTNAME}:3001/data?year=${year}&regional=${regional}`)
        .then(data => data.data);

export const fetchDataItem = (uid) =>
    axios
        .get(`http://${BASE_HOSTNAME}:3001/region?uid=${uid}`)
        .then(data => data.data);
