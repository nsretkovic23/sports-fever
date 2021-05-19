import React from 'react'
export const options = [
  { value: 'fudbal', label: 'Fudbal' },
  { value: 'kosarka', label: 'Kosarka' },
  { value: 'odbojka', label: 'Odbojka' },
  { value: 'hokej', label: 'Hokej' },
]

export const Form = ({
  event,
  handleChange,
  handleSubmit,
  longitude,
  latitude,
}) => {
  return (
    <>
      <form>
        <div className='form-element'>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={event.title}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            name='description'
            value={event.description}
            onChange={handleChange}
            rows='6'
            cols='50'
          >
            Enter description...
          </textarea>
        </div>
        <div className='form-element'>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            name='date'
            value={event.date}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='free_spots'>Available spots:</label>
          <input
            type='number'
            id='free_spots'
            name='free_spots'
            value={event.free_spots}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='sport'>Choose a sport:</label>
          <select
            name='sport'
            id='sport'
            onChange={handleChange}
            value={event.sport}
          >
            {options.map((el) => {
              return (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              )
            })}
          </select>
        </div>
        <div className='form-element'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            name='price'
            value={event.price}
            onChange={handleChange}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='lat'>Latitude: {latitude}</label>
        </div>
        <div className='form-element'>
          <label htmlFor='lng'>Longitude: {longitude}</label>
        </div>
        <button type='submit' className='submitBtn' onClick={handleSubmit}>
          Create
        </button>
      </form>
    </>
  )
}
