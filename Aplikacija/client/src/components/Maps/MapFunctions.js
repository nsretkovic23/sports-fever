import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import { makeStyles } from '@material-ui/core/styles'
import '@reach/combobox/styles.css'
import { IconButton } from '@material-ui/core'
import MyLocationIcon from '@material-ui/icons/MyLocation'

const useStyles = makeStyles((theme) => ({
  geolocation: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: '10',
    right: '70px',
    top: '107px',
    width: '35px',
    height: '35px',
    boxShadow: '0 0 0 3px #a1a19f',
  },
  searchLocation: {
    position: 'absolute',
    zIndex: '10',
    left: '57%',
    marginTop: '5px',
  },
  searchLocationInput: {
    border: '4px solid #04ECF0',
    width: '200px',
    height: '25px',
    boxShadow: '0 8px 12px 0 rgba(0,0,0,0.24)',
    fontSize: '16px',
    padding: '2px',
  },
}))

export function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.320904, lng: () => 21.89576 },
      radius: 200000,
    },
  })
  const classes = useStyles()
  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <div>
      <Combobox onSelect={handleSelect} className={classes.searchLocation}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder='Enter a location'
          className={classes.searchLocationInput}
        ></ComboboxInput>
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={description} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export function Locate({ panTo }) {
  const classes = useStyles()
  return (
    <IconButton
      className={classes.geolocation}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => null
        )
      }}
    >
      <MyLocationIcon></MyLocationIcon>
    </IconButton>
  )
}
