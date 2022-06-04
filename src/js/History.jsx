import React, { useState, useRef } from 'react';
import {
    List,
    ListItem,
    BlockTitle,
  } from 'framework7-react';

export default function History(){
    return (
        <>
        <BlockTitle>Suchverlauf</BlockTitle>
        <List>
            <ListItem>Köln</ListItem>
            <ListItem>Melbourne</ListItem>
            <ListItem>Stuttgart</ListItem>
            <ListItem>Bergen</ListItem>
        </List>
        </>
    )
}