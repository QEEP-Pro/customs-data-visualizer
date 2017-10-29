import axios from 'axios'


export const fetchRange = () =>
    axios
        .get('http://localhost:3001/range')
        .then(data => data.data);
