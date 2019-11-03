import React from 'react';
import MaterialTable from 'material-table';
import Switch from '@material-ui/core/Switch';
import axios from 'axios'

export default function Promocode() {
    const [state, setState] = React.useState({
        data: [],
    })
    const ChangeState = (params) => {
        state.data.find(x => x._id === params).status = state.data.find(x => x._id === params).status === "active" ? "Inactive" : "active"
        setState({
            data: state.data
        })
    }
    if (state.data.length === 0) {
        axios.post('http://18.212.139.83:2020/load-promo')
            .then(response => {
                setState({
                    data: [...response.data]
                })
            })
    }
    return (
        <MaterialTable
            title="Promocodes"
            data={state.data}
            columns={[
                { title: 'Created For', field: 'createdfor' },
                { title: 'Code', field: 'code' },
                { title: 'discount', field: 'discount' },
                {
                    title: 'Status',
                    field: 'status',
                    initialEditValue: "active",
                    render: rowData => <h6 style={{ color: rowData.status === "active" ? "#20bb26" : "#ee5050" }}>{rowData.status === "active" ? "Active" : "Inactive"}</h6>
                },
                {
                    title: 'Switch',
                    render: rowData => <Switches data={rowData} ChangeState={ChangeState}></Switches>
                }
            ]}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                console.log(newData.code)
                                if (newData.code.length === 12) {
                                    axios.post('http://18.212.139.83:2020/create-promo', {
                                        code: newData.code,
                                        createdfor: newData.createdfor,
                                        discount: newData.discount
                                    })
                                        .then(response => {
                                            if (response.data.message === "Already Exists") {
                                                alert("That Code Already Exists, Try With a different one!")
                                            } else {
                                                data.push(newData)
                                            }
                                        })
                                } else {
                                    alert("Please Set Length of Code Equals 12")
                                }
                                return { ...prevState, data }
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                axios.post('http://18.212.139.83:2020/update-promo', {
                                    id: newData._id,
                                    code: newData.code,
                                    createdfor: newData.createdfor,
                                    discount: newData.discount
                                })
                                    .then(response => {
                                        if (response.data.message === "Updated") {
                                            setState(prevState => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                return { ...prevState, data };
                                            })
                                        }
                                    })
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            axios.post('http://18.212.139.83:2020/delete-promo', {
                                id: oldData._id
                            })
                                .then(response => {
                                    if (response.data.message === "Deleted") {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data }
                                        })
                                    }
                                })
                        }, 600);
                    }),
            }}
        />
    );
}

function Switches(props) {
    console.log(props)
    const [state, setState] = React.useState({
        checkedB: props.data === undefined ? true : props.data.status === "active" ? true : false,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        console.log(props.data._id)
        axios.post('http://18.212.139.83:2020/change-status', { id: props.data._id })
            .then(response => {
                props.ChangeState(props.data._id)
            })
    }

    return (
        <div>
            <Switch
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value="checkedB"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    );
}