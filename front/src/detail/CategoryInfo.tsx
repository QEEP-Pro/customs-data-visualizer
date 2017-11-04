import * as React from 'react'

import { css } from 'emotion'

import { Card, CardTitle } from 'material-ui/Card'
import { Tabs, Tab } from 'material-ui/Tabs'

import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

import DetailDataItem from '../model/DetailDataItem'
import CountryDataItem from '../model/CountryDataItem'


interface Props {
    title: string
    data: DetailDataItem[]
}

export default (props: Props) => (
    <div>

        <Card>
            <CardTitle title={props.title} />
            <LineChart
                data={props.data.map((item: DetailDataItem) => ({
                    year: item.year,
                    import: item.import,
                    export: item.export,
                }))}
            />
        </Card>
    
        <Card className={css`margin-top: 2rem`}>
            <Tabs>
                {props.data.map((item: DetailDataItem, i: number) =>
                    <Tab
                        key={i}
                        label={item.year}
                    >
                    <CardTitle title={'Импорт'} />
                    <PieChart
                        data={item.countries
                                .filter((country: CountryDataItem) =>
                                    country.import > calculateMinumumValue(
                                        item.countries.map((c: CountryDataItem) => c.import), 12)
                                    )
                                .map((county: CountryDataItem) => ({
                                    country: county.name,
                                    amount: county.import,
                                }))
                        }
                    />
                    </Tab>
                )}
            </Tabs>
        </Card>
    
        <Card className={css`margin-top: 2rem`}>
            <Tabs>
                {props.data.map((item: DetailDataItem, i: number) =>
                    <Tab
                        key={i}
                        label={item.year}
                    >
                        <CardTitle title={'Экспорт'} />
                        <PieChart
                            data={item.countries
                                    .filter((country: CountryDataItem) =>
                                        country.export > calculateMinumumValue(
                                            item.countries.map((c: CountryDataItem) => c.export), 12)
                                        )
                                    .map((county: CountryDataItem) => ({
                                        country: county.name,
                                        amount: county.export,
                                    }))
                            }
                        />
                    </Tab>
                )}
            </Tabs>
        </Card>

    </div>
)

const calculateMinumumValue = (values: number[], count: number) => 
    values.length >= count ? values.sort((a: number, b: number) => b - a)[count] : 0
