// @flow

import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Container, Header} from "semantic-ui-react";
import MovementTable from "./MovementTable";
import {getTransactions} from "../api"

import type {User} from '../api'
import '../react-select/react-select.css';


export type Props = {
    token: string,
    user: User,
}

class AllTransactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            month: new Date().getMonth(),
            year: new Date().getUTCFullYear()
        };
        this.optionsMonth = [
            {value: 0, label: 'Januar'},
            {value: 1, label: 'Februar'},
            {value: 2, label: 'März'},
            {value: 3, label: 'April'},
            {value: 4, label: 'Mai'},
            {value: 5, label: 'Juni'},
            {value: 6, label: 'Juli'},
            {value: 7, label: 'August'},
            {value: 8, label: 'September'},
            {value: 9, label: 'Oktober'},
            {value: 10, label: 'November'},
            {value: 11, label: 'Dezember'}];
        this.optionsYear = [{value: 2017, label: 2017}, {value: 2016, label: 2016}, {value: 2015, label: 2015}];
        this.change();
    }

    change = () => {

        var to = new Date(this.state.year, this.state.month, 31)
        var from = new Date(this.state.year, this.state.month, 1)
        getTransactions(this.props.token, from, to, 100) //get max 100 transactions
            .then(transactions => this.setState({transactions: transactions.result}))
    }
    _onSelectMonth = (val) => {
        this.state.month = val
        console.info("month " + val)
        this.change()
    }
    _onSelectYear = (val) => {
        // this.state.year = val
        console.info("year: " + val)
        this.state.year = val
        this.change()
    }
    render = () => {
        return (
            <div>
                <Container>
                    <Header as="h2">Filter</Header>
                    <Select
                        name="month"
                        value={this.state.month}
                        options={this.optionsMonth}
                        simpleValue
                        onChange={this._onSelectMonth}

                    />
                    <Select
                        name="year"
                        value={this.state.year}
                        options={this.optionsYear}
                        simpleValue
                        onChange={this._onSelectYear}
                    />

                </Container>
                <Container>
                    <Header as="h2">All Transactions</Header>
                    <MovementTable transactions={this.state.transactions}/>
                </Container>
            </div>
        )
    }
}

export default AllTransactions


