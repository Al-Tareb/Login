import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Deregister from "../components/Deregister";
import UsersData from "../components/UsersData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa } from '@fortawesome/free-solid-svg-icons'

const Products = props => {
    const [firstName, setFirstName] = useState("");
    const [productName, setProductName] = useState("");
    const [productNumber, setProductNumber] = useState("");
    const [ExpireDate, setExpireDate] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const settings = {                
                credentials: "include"
            }
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}`, settings);
            const parsedRes = await response.json();
            try {
                if (response.ok) {
                    console.log("Server response", parsedRes);
                    setFirstName(parsedRes.firstName);
                    setProducts(parsedRes.products);
                    setIsAdmin(parsedRes.isAdmin);
                  
                } else {
                    throw new Error(parsedRes.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }

        fetchUserData();
    }, [props.currentUserId])

   
    const updateData = event => {
        switch (event.target.name) {
            case "productName":
                setProductName(event.target.value);
                break;
            case "productNumber":
                setProductNumber(event.target.value);
                break;
            case "ExpireDate":
                setExpireDate(event.target.value);
                break;
            case "productPrice":
                setProductPrice(event.target.value);
                break;
            case "productDescription":
                setProductDescription(event.target.value);
                break;     
            default:
                break;
        }
    }

    const submitProduct = async event => {
        event.preventDefault();

        const newProduct = {
            productName: productName,
            productNumber: productNumber,
            ExpireDate: ExpireDate,
            productPrice: productPrice,
            productDescription: productDescription
        }
 
        const settings = {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/products`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                const settings = {
                    method: "PATCH",
                    body: JSON.stringify({ id: parsedRes.id }),
                    headers: {
                        "Content-Type": "application/json",         
                    },
                    credentials: "include"
                }
                const secondResponse = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/products`, settings);
                const secondParsedRes = await secondResponse.json();
                if (secondResponse.ok) {
                    setProducts(secondParsedRes.products);
                    setProductName("");
                    setProductNumber("");
                    setExpireDate("");
                    setProductPrice("");
                    setProductDescription("");
                } else {
                    throw new Error(secondParsedRes.message);    
                }
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const deleteAllProducts = async event => {
        const settings = {
            method: "DELETE",
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/products`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                setProducts(parsedRes);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const deleteOneProduct = async event => {
        const productId = event.target.parentElement.id;
        const settings = {
            method: "DELETE",
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/products/${productId}`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                setProducts(parsedRes.albums);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div>
        <div className="addPageProduct">
            <h2 className="grettingProduct" id="greeting">Welcome:  {firstName}</h2>
            
            <Logout  logout={props.logout} />
          
            { isAdmin && <UsersData currentUserId={props.currentUserId} token={props.token}/> }

           
            
            <h1 className="addNewProduct">Add new Product</h1>
            <form className="addFrameProduct" onSubmit={submitProduct}>
                <div className="productDiv">
                    <label className="productLabel">Product Name</label>
                    <input className="Product ProductName" name="productName" onChange={updateData} value={productName} />
                </div>
                <div className="productDiv">
                    <label className="productLabel">Product Number</label>
                    <input className="Product ProductNumber" name="productNumber" onChange={updateData} value={productNumber} />
                </div>
                <div className="productDiv">
                    <label className="productLabel">Expire Date</label>
                    <input className="Product ProductDate" name="ExpireDate" onChange={updateData} value={ExpireDate} />
                </div>
                <div className="productDiv">
                    <label className="productLabel">Product Price</label>
                    <input className="Product ProductPrice" name="productPrice" onChange={updateData} value={productPrice} />
                </div>
                <div className="productDiv">
                    <label className="productLabel">Product Description</label>
                    <textarea className="ProductDescription" name="productDescription" onChange={updateData} value={productDescription} rows="6" cols="35" />
                </div>
                <button className="submitProduct">Add New Product</button>
            </form>
            <button className="deleteAllProduct" onClick={deleteAllProducts}>Delete All Products</button>

            
        </div>

        <div className="contentContiner">
               
                <ul className="General">
                    {
                        products.map(product => {
                            return <li className="content" key={product._id} id={product._id}>
                            <span className="deleteSpan" onClick={deleteOneProduct}>X</span>
                            Name: {product.productName} {<br></br>} Number: {product.productNumber} {<br></br>} ExpireDate: {product.ExpireDate}
                            Price: {product.productPrice} {<br></br>} Description: {product.productDescription} 
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Products;