import React from 'react';
import {Card, Button,Modal,Col, Container, Row, Form} from 'react-bootstrap';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCarsData, deleteCarData} from "../../store/actions/view-car-slice";
import "./ViewCar.css";
import { FaTrashAlt,FaEdit,FaPlus } from "react-icons/fa";
import moment from 'moment';
import modalImage from "../../assets/image/img-BeepBeep.png";
import { useNavigate } from 'react-router';
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Dashboard.module.css";


const ViewCar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataCars = useSelector(state => state.viewcarStore.CarData);
    const [deleteId, setDeleteId]=useState();
    const [cars,setCars] = useState('');
    const [show, setShow] = useState(false);
    const LoadDetail = (id)=>{
        navigate('/edit-car/'+id);
        };
    const handleTooAddCar = () =>{
        navigate('/add-car/');
    };
    const handleClose = () =>{
        setShow(false);
    };
    const handlecars = (ev) => {
        ev.preventDefault();
        setCars(ev.target.value);
    };
    const HandleDelete = (id) => {
        setDeleteId(id);
        setShow(true);
    
    };
    const handleFilterData = () =>{
        dispatch (getCarsData({cars}));
    };
    const handleDeleteItem = async () => {
        try {
            await dispatch(deleteCarData({id: deleteId}));
            handleClose();
            handleFilterData();
        } catch (error) {
            console.log('error');
        }
    };

    useEffect(() => {
        handleFilterData();
    }, [cars]);

    
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
                     <Form onSubmit={handleFilterData}>
                        <Button 
                            value=''
                            type="submit"
                            className='me-3 mb-2 btn-fillter-car'
                            onClick={handlecars}>
                            All
                        </Button>
                        <Button 
                            value='small'
                            type="submit"
                            className='me-3 mb-2 btn-fillter-car'
                            onClick={handlecars}>
                            2 - 4 people
                        </Button>
                        <Button
                            value='medium'
                            type="submit"
                            className='me-3 mb-2 btn-fillter-car'
                            onClick={handlecars}>
                            4 - 6 people
                        </Button>
                        <Button
                            value='large'
                            type="submit"
                            className='me-3 mb-2 btn-fillter-car'
                            onClick={handlecars}>
                            6 - 8 people
                        </Button>
                    </Form>
                </div>
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
                                    HandleDelete(item.id);
                                }}>
                                    <FaTrashAlt className='btn-icon'/> Delete
                                </Button>
                                <Button className='mx-2 card-btn' variant="outline-success " 
                                onClick={()=>{LoadDetail(item.id);}}>
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
                <img src={modalImage} className='image-modal' alt='modal_image'></img>
                <p className='fw-bold modal-text'>Menghapus Data Mobil</p>
                <p className='modal-text'>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
                <Button className='m-2 w-25' variant="outline-primary" onClick={handleDeleteItem}>Ya</Button>
                <Button className='m-2 w-25'variant="outline-primary" onClick={handleClose}>Tidak</Button>
            </Modal.Body>
        </Modal>

      
 
    </Container>
    </>
    );
};

export default ViewCar;