// import { useHistory } from 'react-router'
import { createInventoryItem } from '../../lib/api'
import { useForm } from '../../hooks/useForm'
import React from 'react'

function ItemCard({ name, category, icon, id }) {
  // const history = useHistory()
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    quantity: '',
    expiryDate: '',
  })

  const [isAddClicked, setIsAddClicked] = React.useState(false)
  console.log('at mount', isAddClicked)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(id)
      console.log(formdata)
      const newItem = await createInventoryItem(id, formdata)
      console.log(newItem)
      // history.push('/inventoryitems')
      // ? set to true everytime clicked
      setIsAddClicked(true)
      setTimeout(() => setIsAddClicked(false), 300)
      
      console.log('after mount', isAddClicked)
    } catch (err) {
      // ! Set to BE api errors
      console.log('BE Errors: ', err.response.data.message)
      setFormErrors(err.response.data.errors)
    }
  }
  console.log(isAddClicked ? 'zoom-in' : '')

  return (
    <div 
      className="card m-5"
      id={isAddClicked ? 'zoom-in' : ''}
    >
      <div className="card-image">
        <figure className="image is-2by1">
          <img src={icon} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        <p className="mb-2 is-capitalized has-text-weight-bold">Name: <span className="has-text-weight-normal">{name}</span></p>
        <p className="mb-3 is-capitalized has-text-weight-bold">Category: <span className="has-text-weight-normal">{category}</span></p>
        <form onSubmit={handleSubmit}>
          <label className="label">Quantity:</label>
          <input 
            className ={`input mb-2 ${formErrors.quantity ? 'is-danger' : ''}`}
            type="number" 
            id="quantity"
            placeholder="e.g. 6"
            name="quantity"
            onChange={handleChange}
          />
          {formErrors.quantity && (
            <small className="help is-danger">Please enter valid quantity</small>
          )}
          <br />
          <label className="label">Expiry Date:</label>
          <input 
            className={`input mb-2 ${formErrors.expiryDate ? 'is-danger' : ''}`}
            id="expiryDate"
            type="date"
            name="expiryDate"
            min={`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + (new Date().getDate())).slice(-2)}`}
            onChange={handleChange}
          />
          {formErrors.expiryDate && (
            <small className="help is-danger">Please add an expiry date</small>
          )}
          <br />
          <button className="button is-primary has-text-weight-bold is-size-6 is-small is-fullwidth" type="submit">Add</button>
        </form>
        
        <br />
      </div>
    </div>
  )

}

export default ItemCard