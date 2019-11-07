import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, GeoObject } from "react-yandex-maps";
import './App.css';
import List from './components/List';
import Details from './components/Details';

function App() {
    const [info, setInfo] = useState({ id: null , name: null, coords: [], pos: null});
    const [list, setList] = useState([]);
    const [isListChange, setListChange] = useState("");
    const [ballonContent, setBallonContent] = useState("");
    const [hintContent, setHintContent] = useState("");
    const [center, setCenter] = useState([55.751574, 37.573856]);
    
    console.log(list, 'list')
  
    useEffect(() => {
        if (!info.id) return;  
            const isId = list.filter(item => item.id === info.id);
        if (isId.length !== 0) {
            const newList = list.map(item => item.id === info.id ? info : item);
            setList(newList);
        } else {
            setList([...list, info]);
        }        
    }, [info.id, info.coords]);  

// =========================================================================
    const mapData = {
        center: center,   
        zoom: 5,
    };

    const placeMark = {
        properties: {
            hintContent: hintContent,
            balloonContent: ballonContent,
        }, 

        options: {
            preset: 'islands#redCircleDotIconWithCaption',
            draggable: true,
        }
    }  

    const line = {
        geometry: {
            type: "LineString", 
            coordinates: (isListChange !== "yes") ? list.map(item => item.coords) : list.sort((a, b) => a.pos - b.pos).map(item => item.coords),
        },
        options: {
            draggable: true,
            strokeColor: '#0E4779',
            strokeWidth: 4,
        }
    }
// ===========================================================================
    const getCenterMap = (event) => {
        const newCenter = event.get('newCenter');
        setCenter(newCenter);
        console.log(center, 'center')
    }

    const changeCoords = (event, currentCoord) => {
        const target = event.get('target');
        const newCoords = target.geometry.getCoordinates();
        const newList = list.filter(item => item.coords === currentCoord)
        
        setInfo({ id: newList[0].id , name: newList[0].name, coords: newCoords, pos: newList[0].pos});
       
        target.properties.set(newCoords);
        newHintContent(newCoords);
    }
    
    const onBallonClick = (content) => {
        setBallonContent(content)
    }

    const newHintContent = (content) => {
        setHintContent(content)
    }

    const baloonSet = (event) => {
        event.get('target').options.set('preset', 'islands#greenIcon');
    }

    const baloonUnset = (event) => {
        event.get('target').options.unset('preset');
    }

    return (
      <div className="App">
        <YMaps>
            <Details info={info} setInfo={setInfo} center={center} list={list}/>
            <List list={list} setList={setList} setListChange={setListChange}/>
            <div className="map">
                <Map modules={["geolocation", "geocode"]} onBoundsChange={(event) => getCenterMap(event)} defaultState={mapData}>
                  {list.map((item) => (
                      <Placemark {...placeMark} 
                                onClick={() => onBallonClick(item.name)}
                                onMouseEnter={() => newHintContent(item.coords)}
                                onDragEnd={(event) => changeCoords(event, item.coords)} 
                                BalloonClose={(event) => baloonUnset(event)} 
                                BalloonOpen={(event) => baloonSet(event)}  
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']} 
                                geometry={item.coords} key={item.id}/>
                  ))}
                  {(list.length > 1 ) && <GeoObject {...line}></GeoObject>}
                </Map>
            </div>
        </YMaps>
      </div>
    );
}
export default App;
