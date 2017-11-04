import axios from 'axios'

import TimeRange from '../../model/TimeRange'

import { HOSTNAME, PORT } from './settings'

export const fetchRange = () =>
    axios.get(`http://${HOSTNAME}:${PORT}/range`)
        .then(data => ({
            start: parseInt(data.data.min, 10),
            end: parseInt(data.data.max, 10),
        } as TimeRange))
