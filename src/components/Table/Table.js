import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTable } from '../../store/actions/table-slice';
import moment from 'moment';
import Pagination from 'react-bootstrap/Pagination';
import { Col, Form } from 'react-bootstrap';
import './Table.css';
import titlesquare from '../../assets/image/title-square.png';

const Table = () => {
  const dispatch = useDispatch();
  const tabledata = useSelector(state => state.tableStore.tableData);
  const limits = [10, 15, 20, 25, 30];
  const [pagesize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(dataTable({ pagesize, page }));
  }, [pagesize, page]);

  const handlepageSizeChange = ev => {
    ev.preventDefault();
    setPageSize(ev.target.value);
  };

  const handlePage = ev => {
    ev.preventDefault();
    setPage(parseInt(ev.target.text));
  };

  const items = Array.from({ length: 10 }).map((_, index) => (
    <Pagination.Item onClick={handlePage} key={index + 1} active={index + 1 === page}>
      {index + 1}
    </Pagination.Item>
  ));

  return (
    <div className='section-table'>
      <div className='row row-table'>
        <Col>
          <p className='title-dashboard'>Dashboard</p>
          <img className='text-img ' src={titlesquare} alt='title-img'></img>
          <p className='fw-bold title-img'>List Order</p>
          <div className='main-table'>
            <table className='table '>
              <thead>
                <tr>
                  <th>No</th>
                  <th>User Email</th>
                  <th>Car</th>
                  <th>Start Rent</th>
                  <th>Finish Rent</th>
                  <th>Price</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.User.email}</td>
                    <td>{item.Car || 'Unknown'}</td>
                    <td>{moment(item.start_rent_at).format('DD-MM-YYYY HH:mm')}</td>
                    <td>{moment(item.finish_rent_at).format('DD-MM-YYYY HH:mm')}</td>
                    <td>Rp.{item.total_price.toLocaleString('id-ID')}</td>
                    <td>{item.Status || 'Null'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='table-footer d-flex'>
              <div className='table-limit col-2'>
                <Form.Select onChange={handlepageSizeChange} aria-label='Default select example'>
                  {limits.map((item, index) => (
                    <option key={`key-${index}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className='table-pagination col-10'>
                <Pagination>
                  <Pagination.First />
                  {items}
                  <Pagination.Last />
                </Pagination>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Table;
