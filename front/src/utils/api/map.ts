import axios from 'axios'

import MapDataItem from '../../model/MapDataItem'

import { HOSTNAME, PORT } from './settings'


export const fetchMapData = (year: number, regional: boolean) =>
    axios.get(`http://${HOSTNAME}:${PORT}/data?year=${year}&regional=${regional}`)
        .then(data => data.data.map((item: any) => new MapDataItem(item)))