import React from 'react'
import {Card, Button,Modal,Col, Container, Row} from 'react-bootstrap';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCarsData, deleteCarData} from "../../store/actions/view-car-slice"
import "./ViewCar.css"
import { FaTrashAlt,FaEdit,FaPlus } from "react-icons/fa";
import moment from 'moment';
import modalImage from "../../assets/image/img-BeepBeep.png"
import { useNavigate } from 'react-router';
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Dashboard.module.css";


const ViewCar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataCars = useSelector(state => state.viewcarStore.CarData)
    const [deleteId, setDeleteId]=useState()
    const [cars,setCars] = useState()
    const [show, setShow] = useState(false)
    const LoadDetail = (id)=>{
        navigate('/edit-car/'+id);
        }
    const handleTooAddCar = () =>{
        navigate('/add-car/')
    }
    const handleClose = () =>{
        setShow(false)
    }
    const handlecars = (ev) => {
        ev.preventDefault()
        setCars(ev.target.value)
    }
    const HandleDelete = (id) => {
        setDeleteId(id)
        setShow(true)
    
    }
    const handleDeleteItem = () =>{
         dispatch(deleteCarData({id: deleteId}))
            .unwrap()
             .then(() => {
                // alert ('data berhasil di hapus')
                // navigate('/view-car');
                // dispatch(getCarsData())
                handleClose()
                // dispatch(getCarsData())
        })
        .catch(() => {
            console.log('error');
        })
    }

    useEffect(() => {
        dispatch(getCarsData());
    }, [])

    useEffect(() => {
        dispatch(getCarsData({cars}));
    }, [cars])

    // useEffect(() => {
    //     console.log('ini data', dataCars.cars);
    //     dispatch(getCarsData());
    // }, [dataCars.cars])

    
    return ( 
        <> 
        <Container fluid className={`p-0 m-0 ${classes.containerDashboard}`}>
        <Navbar currentPage="view-car" />
       
        <Row className="m-0">
          <Col
            xs="auto"
            className={`${classes.colDashboard} d-none d-md-block h-100`}></Col>
        </Row>
        <div className=' container-fluid car-container'>
            <div className='row d-flex'>
                <p className="mt-4" data-testid="title-Cars">
                    <strong>Cars {">"}</strong> List Car
                </p>
                <h5 className="mt-4" data-testid="title-Cars-2">
                    <strong>List Car</strong>
                </h5>
                <div className="d-flex justify-content-end">
                <Button
                    className={`pe-3 mb-2 fw-bold ${classes.btnAddCar}`}
                    onClick={handleTooAddCar}>
                    <FaPlus className='icon-btn-add'/>
                    Add New Car
                </Button>
                </div>
            <div className="d-grid gap-2 d-md-flex mb-3">
                <Button 
                    value=''
                    className='me-3 mb-2 btn-fillter-car'
                    onClick={handlecars}>
                    All
                </Button>
                <Button 
                    value='small'
                    className='me-3 mb-2 btn-fillter-car'
                    onClick={handlecars}>
                    2 - 4 people
                </Button>
                <Button
                    value='medium'
                    className='me-3 mb-2 btn-fillter-car'
                    onClick={handlecars}>
                    4 - 6 people
                </Button>
                <Button
                    value='large'
                    className='me-3 mb-2 btn-fillter-car'
                    onClick={handlecars}>
                    6 - 8 people
                </Button>
                </div>
            {/* <Button value="small" onClick={handlecars}>2-4</Button>
            <Button value="medium" onClick={handlecars}>4-6</Button>
            <Button value="large" onClick={handlecars}>6-8</Button> */}
            {dataCars
                .cars
                .map((item) => (
                    <div key={`key-${item.id}`} className="col-12 col-lg-4 mb-3">
                        <Card className="h-100 p-4">
                            <Card.Img src={item.image} className="d-lg-block card-img-custom"/>
                            <Card.Body>
                                <div className="row">
                                    <p className="pw-medium">{item.name}</p>
                                    <strong className='pw-bold'>Rp.{item.price.toLocaleString('id-ID')}
                                        / hari</strong>
                                    <p className="pw-medium">{item.category}</p>
                                    <p className="pw-medium">Updated at {moment(item.updatedAt).format('DD-MMMM-YYYY HH:mm')}</p>
                                </div>
                                <Button
                                    className='mx-2 card-btn'
                                    variant="outline-danger"
                                    onClick={() => {
                                    HandleDelete(item.id)
                                }}>
                                    <FaTrashAlt className='btn-icon'/> Delete
                                </Button>
                                <Button className='mx-2 card-btn' variant="outline-success " 
                                onClick={()=>{LoadDetail(item.id)}}>
                                 <FaEdit className='btn-icon'/>   Edit
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            }
            </div>
        </div>
         <Modal show={show} onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className='text-center'>
                <img src={modalImage} className='image-modal'></img>
                <p className='fw-bold modal-text'>Menghapus Data Mobil</p>
                <p className='modal-text'>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
                <Button className='m-2 w-25' variant="outline-primary" onClick={handleDeleteItem}>Ya</Button>
                <Button className='m-2 w-25'variant="outline-primary" onClick={handleClose}>Tidak</Button>
            </Modal.Body>
        </Modal>

      
 
    </Container>
    </>
    )
}

export default ViewCar