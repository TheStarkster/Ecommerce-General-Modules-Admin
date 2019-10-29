import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LaunchIcon from '@material-ui/icons/Launch';
import MaterialTable from 'material-table';
import React, { Component } from 'react'
import axios from 'axios'
import './dist/styles/home.css'
import $ from 'jquery'
import './dist/styles/Sidebar.css'
import './dist/styles/addproduct.css'
import './dist/styles/table.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AllProduct_Panel: false,
            Show_FullRowUpdateModal: false,
            ShowMainUpdateInput: false,
            ShowKeyFeatureContent: false,
            ShowPrimaryFeatureContent: false,
            EnableSaveBtnInModal: true,
            EnableCreateNewBtnInModal: false,
            tableData: []
        }
        this.tempID = 1
        this.RowsPerPage_InDataTable = 5
        this.Operations = {
            UpdateOperation: false,
            DeleteOperation: false,
            AddOperation: false
        }
        this.JQstate = {
            SideBarCollapse: false
        }
        this.FullUpdateRowData = {
            data: []
        }
        this.NewProduct = []
        this.DeletedData = {
            Delete: []
        }
        this.UpdateData = {
            newData: [],
        }
        this.AddData = {
            AddData: []
        }
        this.EnteredNewProduct = false
        this.ProductFilledFromExisting = false
        this.NumberOfKeyFeatures = 1;
        this.NumberOfPrimaryFeatures = 1;
        this.KeyFeatures = []
        this.v_temp = []
        this.PrimaryFeatures = []
        this.RenderAllProductPanel = this.RenderAllProductPanel.bind(this)
        this.PushDeletedTableData = this.PushDeletedTableData.bind(this)
        this.PushUpdatedTableData = this.PushUpdatedTableData.bind(this)
        this.PushAddedTableData = this.PushAddedTableData.bind(this)
        this.FullEdit = this.FullEdit.bind(this)
        this.SaveChanges = this.SaveChanges.bind(this)
        this.componentDidMount = () => {
            if (window.innerWidth <= 1024) {
                $('.SideBarRoot').addClass('Collapse')
                $('.SideBarRoot').css('position', 'fixed')
            } else {
                $('.CloseBtn').css('display', 'none')
            }
            var that = this
            document.onkeyup = function (e) {
                if (e.altKey && e.which == 78) {
                    that.EnteredNewProduct = true
                    that.setState({ EnableSaveBtnInModal: true })
                    if (that.state.AllProduct_Panel) {
                        that.setState({
                            Show_FullRowUpdateModal: true,
                            ShowMainUpdateInput: true
                        })
                    }
                }
                if (e.which == 27) {
                    that.EnteredNewProduct = false
                    that.setState({
                        Show_FullRowUpdateModal: false,
                        ShowMainUpdateInput: false,
                        ShowKeyFeatureContent: false,
                        ShowPrimaryFeatureContent: false
                    })
                }
            }

        }
    }
    FullEdit(e) {
        this.FullUpdateRowData.data.push(e)
        if (e._id !== undefined || e._id !== null) {
            Array.prototype.push.apply(this.KeyFeatures, e.KeyFeatures)
            Array.prototype.push.apply(this.PrimaryFeatures, e.PrimaryFeatures)
        }
        this.setState({
            Show_FullRowUpdateModal: true,
            ShowMainUpdateInput: true,
            EnableCreateNewBtnInModal: false,
            EnableSaveBtnInModal: true
        }, () => {
            document.getElementById('PFN').value = e.name
            document.getElementById('PID').value = e._id
            document.getElementById('URI').value = e.image
            document.getElementById('PRC').value = e.price
            document.getElementById('MRP').value = e.mrp
            document.getElementById('BOP').value = e.brand
            document.getElementById('WRTY').value = e.wrty
            document.getElementById('RDL').value = e.rdl
            document.getElementById('TAGS').value = e.tags
            document.getElementById('STK').value = e.stock
        })
    }
    PushDeletedTableData(e) {
        axios.post('http://18.212.139.83:2020/product/admin-delete-product-single', e).then(response => {
        })
    }
    PushAddedTableData(e) {
        e.tempID = this.tempID
        this.tempID += 1
        var tempTableData = this.state.tableData
        tempTableData.push(e)
        this.setState({
            tableData: tempTableData
        })
        axios.post('http://18.212.139.83:2020/product/admin-add-product-single', e).then(response => {
        })
    }
    PushUpdatedTableData(newData) {
        axios.post('http://locahost:2020/product/admin-update-product-single', newData).then(response => {
        })
    }
    // DeleteTableData() {
    //     if (this.DeletedData.Delete.length === 1) {

    //     } else if (this.DeletedData.Delete.length > 1) {
    //         axios.post('http://18.212.139.83:2020/product/admin-delete-product-multiple', this.DeletedData).then(response => {
    //         })
    //     }
    // }
    AddedTableData() {
        if (this.state.tableData.length === 1) {
            axios.post('http://18.212.139.83:2020/product/admin-add-product-single', this.AddData).then(response => {
            })
        } else if (this.AddData.AddData.length > 1) {
            axios.post('http://18.212.139.83:2020/product/admin-add-product-multiple', this.AddData).then(response => {
            })
        }
    }
    // UpdateTableData() {
    //     if (this.UpdateData.newData.length === 1) {
    //         axios.post('http://localhost:2020/product/admin-update-product-multiple', this.UpdateData).then(response => {
    //             console.log(response)
    //         })
    //     } else if (this.UpdateData.newData.length > 1) {
    //         axios.post('http://localhost:2020/product/admin-update-product-multiple', this.UpdateData).then(response => {
    //             console.log(response)
    //         })
    //     }
    // }

    RenderAllProductPanel() {
        axios.get('http://18.212.139.83/:2020/product/admin-fetch-product').then(response => {
            this.setState({
                AllProduct_Panel: true,
                tableData: [...response.data]
            })
            // Hiding Id Header and Entire Column of It...
            // var ID_Header = document.getElementsByClassName('MuiTableRow-head')[0].childNodes[7]
            // ID_Header.style.display = 'none'
            // this.AppendFullEditOnTableLoad()
            // console.log(document.getElementsByClassName('MuiTablePagination-input')[0].childNodes[1])
            // document.getElementsByClassName('MuiTablePagination-input')[0].childNodes[0].setAttribute("onclick", "alert('Action Worked')")


        })
    }
    SaveChanges() {
        if (this.Operations.UpdateOperation === true) {
            // this.UpdateTableData()
        }
        if (this.Operations.DeleteOperation === true) {
            // this.DeleteTableData()
            this.DeletedData = {
                Delete: []
            }
            this.Operations.DeleteOperation = false
        }
        if (this.Operations.AddOperation === true) {
            this.AddedTableData()
            this.AddData = {
                AddData: []
            }
            this.Operations.AddOperation = false
        }
    }
    CloseSideBar = () => {
        $('.SideBarRoot').addClass('Collapse')
        if (this.state.AllProduct_Panel) {
            this.setState({
                AllProduct_Panel: true //To Resize Table... [Not Working]
            })
        }
    }
    OpenSideBar = () => {
        $('.SideBarRoot').removeClass('Collapse')
    }
    CloseModal() {
        this.setState({
            Show_FullRowUpdateModal: false
        })
        this.v_temp = []
    }
    ToggleKeyFeature() {
        this.v_temp = []
        this.v_temp.push({
            _id: document.getElementById('PID') !== null ? document.getElementById('PID').value : null,
            tableID: document.getElementById('TableID').value,
            name: document.getElementById('PFN').value,
            brand: document.getElementById('BOP').value,
            wrty: document.getElementById('WRTY').value,
            image: document.getElementById('URI').value,
            price: document.getElementById('PRC').value,
            mrp: document.getElementById('MRP').value,
            rdl: document.getElementById('RDL').value,
            stock: document.getElementById('STK').value,
            tags: document.getElementById('TAGS').value,
            CreatedBy: this.props.location.state.details.data.e_id
        })
        this.setState({
            ShowMainUpdateInput: false,
            ShowKeyFeatureContent: true
        }, () => {
            if (this.KeyFeatures.length != 0) {
                this.NumberOfKeyFeatures = 1
                for (var i = 0; i < this.KeyFeatures.length - 1; i++) {
                    this.AddNewRowForKeyFeatures(this.KeyFeatures[i + 1])
                }
                document.getElementById('KeyFeature-1').value = this.KeyFeatures[0]
            }
        })
    }
    TogglePrimaryFeature() {
        this.v_temp = []
        this.v_temp.push({
            _id: document.getElementById('PID') !== null ? document.getElementById('PID').value : null,
            name: document.getElementById('PFN').value,
            tableID: document.getElementById('TableID').value,
            brand: document.getElementById('BOP').value,
            wrty: document.getElementById('WRTY').value,
            image: document.getElementById('URI').value,
            price: document.getElementById('PRC').value,
            mrp: document.getElementById('MRP').value,
            rdl: document.getElementById('RDL').value,
            stock: document.getElementById('STK').value,
            tags: document.getElementById('TAGS').value,
            CreatedBy: this.props.location.state.details.data.e_id
        })
        this.setState({
            ShowMainUpdateInput: false,
            ShowPrimaryFeatureContent: true
        }, () => {
            if (this.PrimaryFeatures.length != 0) {
                this.NumberOfPrimaryFeatures = 1
                for (var i = 0; i < this.PrimaryFeatures.length - 1; i++) {
                    this.AddNewRowForPrimaryFeatures(this.PrimaryFeatures[i + 1])
                }
                document.getElementById('PrimaryFeature-1').value = this.PrimaryFeatures[0]
            }
        })
    }
    AddNewRowForKeyFeatures(e = null) {
        this.NumberOfKeyFeatures += 1
        var NewRow = document.createElement('input');
        NewRow.setAttribute("class", "form-control")
        NewRow.setAttribute("type", "text")
        NewRow.setAttribute("id", "KeyFeature-" + this.NumberOfKeyFeatures)
        if (e != null) {
            NewRow.value = e
        }
        document.getElementById('Key-Feature-Col').appendChild(NewRow)

        var NewRemoveBtn = document.createElement("button")
        NewRemoveBtn.setAttribute("class", "NewRowCancelationBtn")
        NewRemoveBtn.setAttribute("onclick", "document.getElementById('KeyFeature-" + this.NumberOfKeyFeatures + "').remove();this.remove()")
        NewRemoveBtn.innerHTML = "Remove"
        document.getElementById("Key-Feature-Col-Cross").appendChild(NewRemoveBtn)
    }
    AddNewRowForPrimaryFeatures(e = null) {
        this.NumberOfPrimaryFeatures += 1
        var NewRow = document.createElement('input');
        NewRow.setAttribute("class", "form-control")
        NewRow.setAttribute("type", "text")
        NewRow.setAttribute("id", "PrimaryFeature-" + this.NumberOfPrimaryFeatures)
        if (e != null) {
            NewRow.value = e
        }
        document.getElementById('Key-Feature-Col').appendChild(NewRow)

        var NewRemoveBtn = document.createElement("button")
        NewRemoveBtn.setAttribute("class", "NewRowCancelationBtn")
        NewRemoveBtn.setAttribute("onclick", "document.getElementById('PrimaryFeature-" + this.NumberOfPrimaryFeatures + "').remove();this.remove()")
        NewRemoveBtn.innerHTML = "Remove"
        document.getElementById("Key-Feature-Col-Cross").appendChild(NewRemoveBtn)
    }
    SaveKeyFeatures() {
        if (this.KeyFeatures.length != 0) {
            this.KeyFeatures = []
        }
        for (var i = 0; i <= this.NumberOfKeyFeatures; i++) {
            if (document.getElementById("KeyFeature-" + i) != null) {
                this.KeyFeatures.push(document.getElementById("KeyFeature-" + i).value)
            }
        }
    }
    SavePrimaryFeatures() {
        if (this.PrimaryFeatures.length != 0) {
            this.PrimaryFeatures = []
        }
        for (var i = 0; i <= this.NumberOfPrimaryFeatures; i++) {
            if (document.getElementById("PrimaryFeature-" + i) != null) {
                this.PrimaryFeatures.push(document.getElementById("PrimaryFeature-" + i).value)
            }
        }
    }
    CloseFeatures() {
        this.setState({
            ShowKeyFeatureContent: false,
            ShowPrimaryFeatureContent: false,
            ShowMainUpdateInput: true
        }, () => {
            if (this.v_temp[0] != null) {
                document.getElementById('TableID').value = this.v_temp[0].tableID
                document.getElementById('PID').value = this.v_temp[0]._id
                document.getElementById('PFN').value = this.v_temp[0].name
                document.getElementById('BOP').value = this.v_temp[0].brand
                document.getElementById('URI').value = this.v_temp[0].image
                document.getElementById('PRC').value = this.v_temp[0].price
                document.getElementById('MRP').value = this.v_temp[0].mrp
                document.getElementById('WRTY').value = this.v_temp[0].wrty
                document.getElementById('RDL').value = this.v_temp[0].rdl
                document.getElementById('STK').value = this.v_temp[0].stock
                document.getElementById('TAGS').value = this.v_temp[0].tags
            }
        })
    }
    CreateNewProductInModal() {
        document.getElementById('PFN').value = ""
        document.getElementById('BOP').value = ""
        document.getElementById('URI').value = ""
        document.getElementById('PRC').value = ""
        document.getElementById('MRP').value = ""
        document.getElementById('RDL').value = ""
        document.getElementById('STK').value = ""
        document.getElementById('TAGS').value = ""
        document.getElementById('WRTY').value = ""

        this.KeyFeatures = []
        this.PrimaryFeatures = []

        this.setState({
            EnableSaveBtnInModal: true,
            EnableCreateNewBtnInModal: false
        })
    }
    SaveNewProduct() {
        this.setState({
            EnableSaveBtnInModal: false,
            EnableCreateNewBtnInModal: true
        })
        this.v_temp = []
        this.v_temp.push({
            _id: document.getElementById('PID') !== null ? document.getElementById('PID').value : null,
            name: document.getElementById('PFN').value,
            brand: document.getElementById('BOP').value,
            wrty: document.getElementById('WRTY').value,
            image: document.getElementById('URI').value,
            price: document.getElementById('PRC').value,
            mrp: document.getElementById('MRP').value,
            rdl: document.getElementById('RDL').value,
            stock: document.getElementById('STK').value,
            tags: document.getElementById('TAGS').value,
            tableID: document.getElementById('TableID').value,
            CreatedBy: this.props.location.state.details.data.e_id
        })
        this.v_temp[0].KeyFeatures = this.KeyFeatures
        this.v_temp[0].PrimaryFeatures = this.PrimaryFeatures

        var tempTableData = this.state.tableData
        tempTableData.splice(this.v_temp[0].tableID, 1)
        tempTableData.push(this.v_temp[0])
        if (this.v_temp[0]._id !== "") {
            axios.post('http://18.212.139.83:2020/product/admin-update-product-single', this.v_temp[0]).then(response => {
            }).then(() => {
                this.setState({
                    tableData: tempTableData
                })
            })
        } else {
            axios.post('http://18.212.139.83:2020/product/admin-add-product-single', this.v_temp[0]).then(response => {
            }).then(() => {
                this.setState({
                    tableData: tempTableData
                })
            })
        }

        this.v_temp = []
    }
    render() {
        return (
            <div className="HomeRoot">
                {
                    this.state.Show_FullRowUpdateModal ?
                        <div className="Background-Modal">
                            <div className="FullUpdateRowModal">
                                {
                                    this.state.ShowMainUpdateInput ?
                                        <div className="col-12 main-input-root">
                                            <div className="row">
                                                <div className="col-6 Full-edit-inputs">
                                                    <input type="hidden" className="form-control" id="TableID"></input>
                                                    <input type="hidden" className="form-control" id="PID"></input>
                                                    <input type="text" className="form-control" id="PFN" placeholder="Product Full Name"></input>
                                                    <input type="text" className="form-control" id="URI" placeholder="Image Uri"></input>
                                                    <input type="text" className="form-control" id="BOP" placeholder="Brand of Product"></input>
                                                    <input type="text" className="form-control" id="PRC" placeholder="Price"></input>
                                                    <input type="text" className="form-control" id="MRP" placeholder="MRP"></input>
                                                    <input type="number" className="form-control" id="STK" placeholder="Stock"></input>
                                                    <input type="number" className="form-control" id="RDL" placeholder="Return Day Limit"></input>
                                                </div>
                                                <div className="col-6 Full-edit-inputs">
                                                    <input type="number" className="form-control" id="WRTY" placeholder="Warranty Period"></input>
                                                    <input type="text" className="form-control" id="TAGS" placeholder="Tags"></input>
                                                    <center><h6 className="FeatureTag">Features</h6></center>
                                                    <div className="row">
                                                        <div className="Primary-Feature-Btn col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => this.TogglePrimaryFeature()}>Primary Features</button>
                                                        </div>
                                                        <div className="Key-Feature-Btn col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => this.ToggleKeyFeature()}>Key Features</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        {
                                                            this.state.EnableSaveBtnInModal ?
                                                                <div className="Primary-Feature-Btn col-6 d-flex justify-content-center align-items-center flex-column">
                                                                    <button onClick={() => this.SaveNewProduct()} id="SaveModalBtn">Save</button>
                                                                </div>
                                                                :
                                                                <div className="Primary-Feature-Btn col-6 d-flex justify-content-center align-items-center flex-column">
                                                                    <button id="SaveModalBtn" disabled>Save</button>
                                                                </div>
                                                        }
                                                        <div className="Key-Feature-Btn col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => { this.setState({ Show_FullRowUpdateModal: false, ShowMainUpdateInput: false }); this.KeyFeatures = []; this.PrimaryFeatures = [] }}>Close</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        {
                                                            this.state.EnableCreateNewBtnInModal ?
                                                                <div className="Primary-Feature-Btn col-12 d-flex justify-content-center align-items-center flex-column">
                                                                    <button onClick={() => this.CreateNewProductInModal()} id="CreateNewProductBtn">Create New + </button>
                                                                </div>
                                                                :
                                                                <div className="Primary-Feature-Btn col-12 d-flex justify-content-center align-items-center flex-column">
                                                                    <button id="CreateNewProductBtn" disabled>Create New + </button>
                                                                </div>
                                                        }
                                                    </div>
                                                    {/* <div className="row Other-Chk">
                                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                                            <center><h6 className="FeatureTag">Other</h6></center>
                                                        </div>
                                                        <div className="col-4 Warranty-Chk">
                                                            <input type="checkbox" className="form-control"></input> Warranty
                                                        </div>
                                                        <div className="col-4 Cod-Chk">
                                                            <input type="checkbox" className="form-control"></input> COD
                                                        </div>
                                                        <div className="col-4 Return-Chk">
                                                            <input type="checkbox" className="form-control"></input> Return
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    this.state.ShowKeyFeatureContent ?
                                        <div className="col-12 Key-feature-input-root">
                                            <div className="row">
                                                <div className="col-12 Full-edit-inputs">
                                                    <div className="row">
                                                        <div className="col-10 d-flex justify-content-center align-items-center flex-column" id="Key-Feature-Col">
                                                            <input className="form-control" placeholder="(Mandatory) Key Feature" id="KeyFeature-1"></input>
                                                        </div>
                                                        <div className="Add-New-Row col-2 d-flex align-items-center flex-column" id="Key-Feature-Col-Cross">
                                                            <button onClick={() => this.AddNewRowForKeyFeatures()}>Add</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="Key-Feature-Btn-Save col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => this.SaveKeyFeatures()}>Save</button>
                                                        </div>
                                                        <div className="Key-Feature-Btn-Close col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => this.CloseFeatures()}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    this.state.ShowPrimaryFeatureContent ?
                                        <div className="col-12 Key-feature-input-root">
                                            <div className="row">
                                                <div className="col-12 Full-edit-inputs">
                                                    <div className="row">
                                                        <div className="col-10 d-flex justify-content-center align-items-center flex-column" id="Key-Feature-Col">
                                                            <input className="form-control" placeholder="(Mandatory) Primary Feature" id="PrimaryFeature-1"></input>
                                                        </div>
                                                        <div className="Add-New-Row col-2 d-flex align-items-center flex-column" id="Key-Feature-Col-Cross">
                                                            <button onClick={() => this.AddNewRowForPrimaryFeatures()}>Add</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="Key-Feature-Btn-Save col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => this.SavePrimaryFeatures()}>Save</button>
                                                        </div>
                                                        <div className="Key-Feature-Btn-Close col-6 d-flex justify-content-center align-items-center flex-column">
                                                            <button onClick={() => this.CloseFeatures()}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        null
                }
                <div className="SidePanelOpenBtn" onClick={() => this.OpenSideBar()}>
                    <div className="MenuBtn">Menu</div><i className="fas fa-arrow-right"></i>
                </div>
                <div className="SideBarRoot pad-x">
                    <div className="CloseBtn">
                        <i className="fa fa-times" onClick={() => this.CloseSideBar()}></i>
                    </div>
                    <div className="UserCard">
                        <div className="UserAvatar">
                            <img src={require('./assets/icons/icons8-male-user-480.png')} alt="dashboard" />
                        </div>
                        <div className="UserDetailCard">
                            <div className="UserName">
                                {this.props.location.state.details.data.name}
                            </div>
                            <div>
                                {this.props.location.state.details.data.role}
                            </div>
                        </div>
                    </div>
                    <CustomExpansionPanel trigger={this.RenderAllProductPanel} />
                </div>
                <div className="w-full">
                    {this.state.AllProduct_Panel ? <MaterialTableCustom
                        triggerOnRowPerPageChange={this.OnPagePerRowIncrement}
                        triggerDeletedData={this.PushDeletedTableData}
                        triggerUpdatedData={this.PushUpdatedTableData}
                        triggerAddedData={this.PushAddedTableData}
                        triggerFullEdit={this.FullEdit}
                        data={this.state.tableData}
                        SaveChanges={this.SaveChanges}
                    />
                        : null}
                </div>
            </div>
        )
    }
}

export default Home


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function CustomExpansionPanel(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Products</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ul className="ExpandedProductOptions">
                        <li onClick={() => {
                            props.trigger()
                        }}>
                            <img src={require('./assets/icons/icons8-product-24.png')} alt="Products" />
                            Products
                        </li>
                        <li>
                            <img src={require('./assets/icons/icons8-shipping-container-24.png')} alt="Multiple Products" />
                            Add Multiple Products
                        </li>
                        <li>
                            <img src={require('./assets/icons/icons8-stacking-24.png')} alt="Stock Details" />
                            Stock Detail
                        </li>
                    </ul>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Users</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    );
}

function MaterialTableCustom(props) {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Price(Rs.)', field: 'price' },
            { title: 'MRP(Rs.)', field: 'mrp', },
            { title: 'Image Uri', field: 'image' },
            { title: 'Stock', field: 'stock', type: 'numeric' },
            { title: 'Added By', field: 'CreatedBy' },
            { title: 'id', field: '_id', hidden: true },
        ],
        data: props.data
    });
    return (
        <div>
            <MaterialTable
                options={{ pageSize: 10 }}
                onChangeRowsPerPage={props.triggerOnRowPerPageChange}
                title="Products"
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        icon: () => <LaunchIcon />,
                        tooltip: 'Full Edit',
                        onClick: (event, rowData) => {
                            props.triggerFullEdit(rowData)
                        }
                    }
                ]}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data.push(newData);
                                props.triggerAddedData(newData)
                                setState({ ...state, data });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data[data.indexOf(oldData)] = newData;
                                props.triggerUpdatedData(newData)
                                setState({ ...state, data });
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                var DeletedData = data.splice(data.indexOf(oldData), 1);
                                props.triggerDeletedData(DeletedData[0])
                                setState({ ...state, data });
                            }, 600);
                        }),
                }}
            />
            <button className="btn btn-primary save-changes" onClick={() => props.SaveChanges()}>Save Changes!</button>
        </div>
    );
}