import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
    FaAndroid,
    FaUserCircle,
    FaQuestionCircle
} from 'react-icons/fa';
import './UXTable.scss';

const UXTable = props => {
    const getSpecies = (url) => {
        let speciesName;
        axios.get(url)
            .then((res) => {
                let response = res.data;
                if (response && response.name) {
                    console.log(response.name);
                    speciesName = response.name;
                }
            }).catch((err) => {
                console.log(err);
            })
        return speciesName;
    }
    return (
        <div>
            <Table responsive bordered striped hover variant='dark' id='dataTable'>
                <thead>
                    <tr className='toMiddle'>
                        <th className='toMiddle'>Icon</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Skin color</th>
                        <th>Hair color</th>
                        <th>Eye color</th>
                        <th>Created</th>
                        <th>Edited</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.tableBody && props.tableBody.length > 0 ?
                            props.tableBody.map((trItem, k) => (
                                <tr key={k} className='toMiddle'>
                                    <td>
                                        {
                                            trItem.species.length > 0 ?
                                                getSpecies(trItem.species[0])
                                                : <FaQuestionCircle />
                                        }
                                    </td>
                                    <td>{trItem.name}</td>
                                    <td>{trItem.birth_year}</td>
                                    <td>{trItem.gender}</td>
                                    <td>{trItem.height}</td>
                                    <td>{trItem.mass}</td>
                                    <td>{trItem.skin_color}</td>
                                    <td>{trItem.hair_color}</td>
                                    <td>{trItem.eye_color}</td>
                                    <td>{new Date(trItem.created).toUTCString()}</td>
                                    <td>{new Date(trItem.edited).toUTCString()}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan='11'>No records found</td>
                            </tr>
                    }
                </tbody>
            </Table>
        </div>
    );
};

UXTable.propTypes = {
    //list of heading, should be an array
    tableHeader: PropTypes.array,

    //array of object. table data
    tableBody: PropTypes.array,
};

export default memo(UXTable);