// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Image } from 'react-bootstrap';
// import { getSingleOrderDetails } from '../../../api/orderData';
// import { useAuth } from '../../../utils/context/authContext';
// import { deleteProductFromOrder } from '../../../api/orderProductData';

// export default function Cart() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const userId = user.id;
//   const { id } = router.query;
//   const orderId = id;
//   const [order, setOrder] = useState({});

//   const cartOrder = () => {
//     getSingleOrderDetails(userId, orderId).then(setOrder);
//   };
//   const handleQuantityChange = (productId, newQuantity) => {
//     const payload = {
//       productId,
//       orderId: id,
//       quantity: newQuantity,
//     };
//     updateOrderProductQuantity(payload).then(() => orderInfo());
//   };
//   const handleRemoveProduct = async (productId) => {
//     try {
//       await deleteProductFromOrder(orderId, productId);
//       const updatedOrder = await getSingleOrderDetails(user.id, orderId);
//       setOrder(updatedOrder);
//     } catch (error) {
//       console.error('Failed to remove product from order.', error);
//     }
//   };

//   useEffect(() => {
//     cartOrder();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   return (
//     <div>
//       <h1>Order Details</h1>
//       <div>
//         {!order && <h2>No Order is opened</h2>}
//         <h2>Order ID: {orderId}</h2>
//         <h3>User Information</h3>
//         <p>Name: {order?.user.firstName} {order?.user.lastName}</p>
//         <p>Email: {order?.user.email}</p>
//         <p>Address: {order?.user.address}</p>
//         <h3>Products</h3>
//         {order?.products.length > 0 ? (
//           order?.products.map((product) => (
//             <div key={product.id}>
//               <h4>{product.name}</h4>
//               <Image src={product.image} alt={product.name} />
//               <p>Category: {product?.category.name}</p>
//               <p>Description: {product.description}</p>
//               <p>Price: ${product.price}</p>
//               <button type="button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
//             </div>
//           ))
//         ) : (
//           <p>No products in the order.</p>
//         )}
//         <h3>Order Summary</h3>
//         <p>Total Products: {order.totalProducts}</p>
//         <p>Total Price: ${order.total}</p>
//       </div>

//     </div>
//   );
// }
