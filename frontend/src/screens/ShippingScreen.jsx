import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { ShippingAddress } = cart;

    const [address, setAddress] = useState(ShippingAddress?.address || '');
    const [city, setCity] = useState(ShippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(
      ShippingAddress?.postalCode || ''
    );
    const [country, setCountry] = useState(ShippingAddress?.country || '');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
    
  }
  return (
    <div>
        <FormContainer>
            <CheckoutSteps step1 step2  />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address" className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
            <Form.Group className='my-2' controlId='city'>
            < Form.Label>City</Form.Label>
            <Form.Control
            type='text'
             placeholder='Enter city'
             value={city}
             required
             onChange={(e) => setCity(e.target.value)}
             ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>

            </Form>
        </FormContainer>
    </div>

  )
};

export default ShippingScreen;
