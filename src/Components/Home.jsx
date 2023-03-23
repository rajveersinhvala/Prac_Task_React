import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";

const Home = () => {
  const [data, setData] = useState([]);

  const [pagedata, setPagedata] = useState([]);
  const [page, setPage] = useState(1);
  const [pagecount, setPagecount] = useState(0);
  const [searchInput, setsearchInput] = useState("");
  const [filterdata, setFilterdata] = useState([]);
  const [showdata, setShowdata] = useState([]);

  const handleNext = () => {
    if (page === pagecount) {
      return page;
    } else {
      setPage(page + 1);
    }
  };

  const handlePre = () => {
    if (page === 1) {
      return page;
    } else {
      setPage(page - 1);
    }
  };

  const getdata = async () => {
    const responce = await axios.get("https://dummyjson.com/products");
    setData(responce.data.products);
    setFilterdata(responce.data.products);
  };

  const handlesearch = (e) => {
    const inputdata = e.target.value;
    setsearchInput(inputdata);

    if (inputdata.length > 0) {
      const searchdata = filterdata.filter((curEle) => {
        return curEle.title.toLowerCase().includes(inputdata);
      });
      setPagedata(searchdata);
    } else {
      setPagedata(showdata);
    }
  };

  useEffect(() => {
    getdata();
  }, [page]);

  useEffect(() => {
    const pagedatacount = Math.ceil(data.length / 5);
    setPagecount(pagedatacount);
    if (page) {
      const limit = 5;
      const skip = limit * page;
      const dataskip = data.slice(page === 1 ? 0 : skip - limit, skip);
      setPagedata(dataskip);
      setShowdata(dataskip);
    }
  }, [data, page]);

  return (
    <>
      <div className="container">
        <h1>UserData</h1>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="SEARCH"
              type="search"
              value={searchInput}
              onChange={(e) => handlesearch(e)}
            />
          </form>
        </div>
        <div className="table_div mt-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Brand Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {pagedata.length > 0 ? (
                pagedata.map((curEle, index) => {
                  return (
                    <tr key={index}>
                      <td>{curEle.id}</td>
                      <td>{curEle.title}</td>
                      <td>{curEle.brand}</td>
                      <td>
                        <img
                          style={{ width: 60, height: 60 }}
                          src={curEle.images[0]}
                          alt="product"
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div
                  className="d-flex justify-content-center mt-4"
                  style={{ color: "black" }}
                >
                  Loading... <Spinner animation="border" variant="danger" />
                </div>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePre()}
              disabled={page === 1}
            />

            {Array(pagecount)
              .fill(null)
              .map((curEle, index) => {
                return (
                  <Pagination.Item
                    active={page === index + 1 ? true : false}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              })}
            <Pagination.Next
              onClick={() => handleNext()}
              disabled={page === pagecount}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Home;
