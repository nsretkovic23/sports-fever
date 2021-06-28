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
import '@reach/combobox/styles.css'
import { IconButton } from '@material-ui/core'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import useStyles from './styles'

export function Search({ panTo, nameForClass }) {
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
      <Combobox
        onSelect={handleSelect}
        className={
          nameForClass ? classes.searchLocation : classes.searchLocation2
        }
      >
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

export function Locate({ panTo, nameForClass }) {
  const classes = useStyles()
  return (
    <IconButton
      className={nameForClass ? classes.geolocation : classes.geolocation2}
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
