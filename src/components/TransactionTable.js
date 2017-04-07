import React from 'react';
import {Table} from "semantic-ui-react";

export default function(props){
  return     (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Datum</Table.HeaderCell>
        <Table.HeaderCell>Von</Table.HeaderCell>
        <Table.HeaderCell>Zu</Table.HeaderCell>
        <Table.HeaderCell>Betrag</Table.HeaderCell>
        <Table.HeaderCell>Saldo</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.transactions.map(t => (
        <Table.Row>
          <Table.Cell>{t.date}</Table.Cell>
          <Table.Cell>{t.from}</Table.Cell>
          <Table.Cell>{t.target}</Table.Cell>
          <Table.Cell>{t.amount}</Table.Cell>
          <Table.Cell>{t.total}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    </Table>
  )
}