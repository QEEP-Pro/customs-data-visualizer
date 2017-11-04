import * as React from 'react'
import { Link, Route, match as Match } from 'react-router-dom'
import { css } from 'emotion'

import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'

import Industry from './Industry'
import Totals from './Totals'

import Category from '../model/Category'

import { fetchCategories } from '../utils/api/detail'


interface Props {
    match: Match<{
        cityName: string
        cityId: number
    }>
}

interface LocalState {
    categories: Category[]

    categoryFilter: string
}

export default class Detail extends React.Component<Props, LocalState> {

    state = {
        categories: [],
        categoryFilter: '',
    } as LocalState

    componentWillMount() {
        fetchCategories(this.props.match.params.cityId)
            .then((categories: Category[]) => this.setState({categories}))
    }

    render() {
        const { match } = this.props

        const { categories, categoryFilter } = this.state

        return (
            <div className={containerStyle}>
                <div className={menuStyle}>
                    <Card>
                        <CardTitle title={match.params.cityName} />
                        <List>
                            <ListItem
                                primaryText={'Общие данные по региону'}
                                containerElement={<Link to={`${match.url}`}  />}
                            />
                            <Divider />
                        </List>

                        <CardActions>
                            <TextField
                                hintText={'Фильтрация'}
                                onChange={(_: any, v: string) => this.setState({categoryFilter: v})}
                                fullWidth
                            />
                        </CardActions>

                        <List>
                            {categories && categories
                                .filter((c: Category) => 
                                    c.name && c.name.toLowerCase().includes(categoryFilter.toLowerCase())
                                )
                                .map((category: Category, i: number) =>
                                    <ListItem
                                        key={i}
                                        primaryText={category.name}
                                        containerElement={<Link to={`${match.url}/${category.uid}-${category.name}`} />}
                                    />
                            )}
                        </List>
                    </Card>
                </div>
                
                <div className={mainStyle}>
                    <Route exact path={`${match.url}`} render={() => <Totals cityId={match.params.cityId} />} />
                    <Route path={`${match.url}/:industryId-:industryName`} component={Industry} />
                </div>
            </div>
        )
    }
}

const containerStyle = css`
    padding: 2rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const menuStyle = css`
    width: calc(30% - 1rem);
`
const mainStyle = css`
    width: calc(70% - 1rem);
`
