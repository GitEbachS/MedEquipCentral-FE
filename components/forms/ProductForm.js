import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { createProduct, updateProduct } from '../../api/productData';
import getCategories from '../../api/categoryData';

const intitialState = {
  name: '',
  image: '',
  price: 0,
  description: '',
  categoryId: -1,
};
const ProductForm = ({ productObj }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState(intitialState);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productObj.id) {
      updateProduct(productObj.id, formInput).then(() => router.push(`/product/${productObj.id}`));
    } else {
      createProduct(formInput)?.then((product) => router.push(`/product/${product.id}`));
    }
  };

  useEffect(() => {
    if (productObj.id) setFormInput(productObj);
    getCategories().then(setCategories);
  }, [productObj]);

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{productObj.id ? 'Update' : 'Create'} Product</h2>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="name"
          placeholder="Add product's name..."
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="image"
          placeholder="Add product's image Url..."
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="number"
          name="price"
          placeholder="Add product's price $..."
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          name="description"
          value={formInput.description}
          placeholder="Add description..."
          onChange={handleChange}
          rows={3}
          required
        />
      </Form.Group>

      {categories ? (
        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Category"
            name="categoryId"
            value={formInput.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category Type</option>
            {categories.map((category) => (

              <option key={category.id} value={category.id}>{category.name}</option>
            ))}

          </Form.Select>
        </Form.Group>
      ) : null}

      <button type="submit">{productObj.id ? 'Update' : 'Create'} Product</button>
    </Form>
  );
};

ProductForm.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    categoryId: PropTypes.number,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
};
ProductForm.defaultProps = {
  productObj: intitialState,
};
export default ProductForm;
