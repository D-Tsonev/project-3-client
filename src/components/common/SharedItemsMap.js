import React, { useEffect, useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'

import { getSharedInventoryItems } from '../../lib/api'
import ItemInfo from './map/ItemInfo'
import Pins from './map/Pins'
const mapBoxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const bounds = [
  // southwest
  [51.271051, -0.515036],
  // northeast
  [51.662160, 0.250806]
]

function SharedItemsMap() {
  const [viewport, setViewport] = useState({
    latitude: 50.3647,
    longitude: -355.5811,
    altitude: 0,
    zoom: 6,
    bearing: 0,
    pitch: 0,
  })
  const [sharedItems, setSharedItems] = useState([])
  const [popupInfo, setPopupInfo] = useState(null)

  const [filterValues, setFilterValues] = useState('')
  // const [selectedSharedItems, setSelectedSharedItems] = useState(null)
  const selectedSharedItems = sharedItems.map((sharedItemsSubArray) => {
    if (filterValues) {
      return sharedItemsSubArray.filter((sharedItem) => {
        console.log('shared item:', sharedItem.item.name.toLowerCase().includes(filterValues.toLowerCase()))
        return sharedItem.item.name.toLowerCase().includes(filterValues.toLowerCase())
      })
    } else {
      return sharedItemsSubArray
    }
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSharedInventoryItems()
        console.log('data fetched:', data)
        setSharedItems(data)
        // setSelectedSharedItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  console.log('original state', sharedItems)
  console.log('filtered state', selectedSharedItems)


  const searchTyping = (e) => {
    setFilterValues(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <div className="columns is-centered mt-4">
        <div className="field is-horizontal column is-half">
          <div className="field-label is-normal">
            <label className="label">Search Item:</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className="input" type="search" placeholder="e.g. tomato" onKeyUp={searchTyping} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="map-container">
        <ReactMapGl
          mapboxApiAccessToken={mapBoxAccessToken}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="100%"
          height="100%"
          onViewportChange={(viewport => setViewport(viewport))}
          {...viewport}
          className="is-fullheight-with-navbar"
        >

          {selectedSharedItems && <Pins sharedItemsProp={selectedSharedItems} onClick={setPopupInfo} />}

          {popupInfo && (
            <Popup
              tipSize={5}
              anchor="top"
              longitude={Number(popupInfo[0].user.coordinates[1])}
              latitude={Number(popupInfo[0].user.coordinates[0])}
              closeOnClick={false}
              onClose={setPopupInfo}
              key={popupInfo[0].user._id}
              captureScroll={true}
            >
              <div
                className="content"
                id="items-info"
              >
                <h6>Items {popupInfo[0].user.username.charAt(0).toUpperCase() + popupInfo[0].user.username.slice(1)} is sharing:</h6>
                <ItemInfo key={`${popupInfo[0].user.username}`} items={popupInfo} />
              </div>
            </Popup>
          )}
        </ReactMapGl>
      </div>
    </>
  )
}

export default SharedItemsMap