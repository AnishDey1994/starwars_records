import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import UXTable from '../../components/UX-Table/UXTable';
import UXLoader from '../../components/UX-Loader/UXLoader';
import UXSelect from '../../components/UX-Select/UXSelect';
import UXTextBox from '../../components/UX-TextBox/UXTextBox';
import UXButton from '../../components/UX-Button/UXButton';
import UXAlertBox from '../../components/UX-AlertBox/UXAlertBox';
import data from './configString.json';
import './showRecords.scss';
const configString = data;

const ShowRecords = () => {
    const [isLoading, setLoader] = useState(false);
    const [records, setRecords] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [sortField, setSortField] = useState('');
    const [pageNo, setPageNo] = useState(1);

    const getRecords = () => {
        setLoader(true);
        axios.get(`https://swapi.dev/api/people/?search=${searchText}&page=${pageNo}`)
            .then((res) => {
                setRecords(res.data && res.data.results);
            }).catch((err) => {
                setFetchError(err.message);
            }).finally(() => {
                setLoader(false);
            })
    }
    const handleSort = (field) => {
        setSortField(field);
        let tempRecords = [...records];
        let subStr = field.trim().split('-');
        let sortedData;
        if (subStr[1] === 'ascending') {
            if (subStr[0] === 'name') {
                sortedData = tempRecords.sort(function (a, b) {
                    if (a[subStr[0]] < b[subStr[0]]) { return -1; }
                    if (a[subStr[0]] > b[subStr[0]]) { return 1; }
                    return 0;
                });
            } else {
                sortedData = tempRecords.sort((a, b) => {
                    return a[subStr[0]] - b[subStr[0]]
                });
            }
        } else {
            if (subStr[0] === 'name') {
                sortedData = tempRecords.sort(function (a, b) {
                    if (a[subStr[0]] > b[subStr[0]]) { return -1; }
                    if (a[subStr[0]] < b[subStr[0]]) { return 1; }
                    return 0;
                });
            } else {
                sortedData = tempRecords.sort((a, b) => {
                    return b[subStr[0]] - a[subStr[0]]
                });
            }
        }
        setRecords(sortedData);
        console.log(sortedData, records);
    }
    const handleSearch = () => {
        setSortField('');
        getRecords();
    }
    const handlePagination = (direction) => {
        if (direction === 'prev') {
            if (pageNo > 1) {
                setPageNo(pageNo - 1);
            }
        } else {
            if (pageNo < 10) {
                setPageNo(pageNo + 1);
            }
        }
    }
    useEffect(() => {
        getRecords();
    }, [pageNo])
    return (
        <div className='container showRecordWrapper'>
            <div className='tableController'>
                <div className='sortingController'>
                    <UXSelect
                        id='selectSorting'
                        class='selectSorting'
                        value={sortField}
                        optionArray={configString.sortOption}
                        onSelect={(e) => handleSort(e.target.value)}
                    ></UXSelect>
                </div>
                <div className='offsetCon'></div>
                <div className='searchController'>
                    <UXTextBox
                        id='searchTextBox'
                        class='searchTextBox'
                        type='search'
                        value={searchText}
                        placeHolder='type here'
                        onEnter={(e) => setSearchText(e.target.value)}
                    >
                    </UXTextBox>
                    <UXButton
                        id='searchButton'
                        type='button'
                        class='btn-primary'
                        value='search'
                        onTap={() => handleSearch()}
                    >
                    </UXButton>
                </div>
            </div>

            {
                isLoading ? <UXLoader loaderType='img' />
                    : records ?
                        <UXTable
                            tableHeader={configString.recordData.tableHeader}
                            tableBody={records}
                        >
                        </UXTable>
                        : fetchError ?
                            <UXAlertBox alertMessage={fetchError} alertType='error' />
                            : <UXAlertBox alertMessage={'Some Error Occured'} alertType='error' />
            }
            <div className='paginationWrapper'>
                <div onClick={() => handlePagination('prev')}><FaAngleLeft /> Prev</div>
                <div onClick={() => handlePagination('next')}> Next <FaAngleRight /></div>
            </div>

        </div>
    );
};

export default ShowRecords;