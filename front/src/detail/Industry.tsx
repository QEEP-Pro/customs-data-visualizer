import * as React from 'react'
import { match as Match } from 'react-router-dom'

interface Props {
    match: Match<{
        industryName: string
        industryId: number
    }>
}


export default (props: Props) => (
    <p>{props.match.params.industryName}</p>
)
