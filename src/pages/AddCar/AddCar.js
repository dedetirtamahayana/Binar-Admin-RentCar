import React, {useState} from "react";
import {Form, Button, Col, Container, Row} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {addData} from "../../store/actions/add-slice"
import Navbar from "../../components/Navbar/Navbar";
import iconUpload from "../../assets/image/fi_upload.svg";
import './AddCar.css'
const Carditem = () => {
    const [name,
        setName] = useState("");
    const [kategori,
        setKetegori] = useState("");
    const [price,
        setPrice] = useState("");
    const [status,
        setStatus] = useState("");
    const [image,
        setImage] = useState("");
    const dispatch = useDispatch();

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleKetegori = (e) => {
        setKetegori(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };
    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
        console.log("succes");
        dispatch(addData({name: name, category: kategori, price: price, image: image}))
            .unwrap()
            .then(() => {
                alert("succes tambah mobil")
                // setBgToast ('info') setShowMsg ('Berhasil Login') setIsToastShow (true);
                // setTimeout(() => {   navigate("/login") }, 2000);
            })
            .catch((error) => {
                // setBgToast ('danger') setShowMsg ('Silahkan di cek kembali email')
                // setIsToastShow(true);
                alert("gagal")

            });
    };
    const backToCars = () => {
      navigate("/view-car");
    };
    return (
        <Container fluid className='p-0 m-0 containerAddCar'>
            <Navbar currentPage="view-car"/>

            <Row className="m-0">
                <Col xs="auto" className='colAddcar d-none d-md-block h-100'></Col>
            </Row>
            <Form onSubmit={handleAdd}>
                <div className='car-container'>
                    <div className='row row-car'>
                        <div className="w-100 bg-white p-3">

                            <fieldset className='font-template w-100'>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="name"
                                    data-testid="wrapper-labelName">
                                    <Form.Label
                                        data-testid="label-Name"
                                        column
                                        sm="4"
                                        className="mb-0 d-flex align-items-center">
                                        Nama/Tipe Mobil
                                        <span className="text-danger" data-testid="label-SpanName">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Input Nama/Tipe Mobil"
                                            className='forminput'
                                            onChange={handleName}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="price"
                                    data-testid="wrapper-labelPrice">
                                    <Form.Label
                                        data-testid="label-Price"
                                        column
                                        sm="4"
                                        className="mb-0 d-flex align-items-center">
                                        Harga
                                        <span className="text-danger" data-testid="label-SpanPrice">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Input Harga Sewa Mobil"
                                            className='forminput'
                                            onChange={handlePrice}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="image"
                                    data-testid="wrapper-Photo">
                                    <Form.Label
                                        data-testid="label-Photo"
                                        column
                                        sm="4"
                                        className="mb-0 d-flex align-items-center">
                                        Foto
                                        <span className="text-danger" data-testid="label-SpanPhoto">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Col sm="8" className="position-relative">
                                        <img
                                            src={iconUpload}
                                            alt=""
                                            className="position-absolute"
                                            style={{
                                            right: "21px",
                                            top: "9px"
                                        }}/>
                                        <Form.Control
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            className='forminput'
                                            onChange={handleImage}/>
                                        <p
                                            className="mb-0"
                                            style={{
                                            lineWeight: 300,
                                            fontSize: "10px",
                                            lineHeight: "14px",
                                            color: "#8A8A8A"
                                        }}>
                                            File size max. 2MB
                                        </p>
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="category"
                                    data-testid="wrapper-Category">
                                    <Form.Label
                                        data-testid="label-Category"
                                        column
                                        sm="4"
                                        className="mb-0 d-flex align-items-center">
                                        Kategori
                                        <span className="text-danger" data-testid="label-SpanCategory">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Select className='forminput' onChange={handleKetegori}>
                                            <option hidden>Pilih Kategori Mobil</option>
                                            <option value="small">2 - 4 orang</option>
                                            <option value="medium">4 - 6 orang</option>
                                            <option value="large">6 - 8 orang</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <div className="formInfo">
                                    <Row className="mb-3">
                                        <Col sm="4" className="mb-0">
                                            Created at
                                        </Col>
                                        <Col sm="8">-</Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4" className="mb-0">
                                            Updated at
                                        </Col>
                                        <Col sm="8">-</Col>
                                    </Row>
                                </div>
                            </fieldset>
                        </div>
                        <div
                            className="d-flex"
                            style={{
                            marginTop: "40px"
                        }}>
                            <Button
                                className='d-flex align-items-center me-3 btnCancel'
                                onClick={backToCars}>
                                Cancel
                            </Button>
                                    <Button
                                        type="submit"
                                        className='d-flex align-items-center text-white btnSave'>
                                        Save
                                    </Button>
                        </div>

                    </div>
                </div>
            </Form>
        </Container>
    )
}

export default Carditem