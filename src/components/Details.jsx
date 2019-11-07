import React, { useEffect, useState } from "react";
import nanoid from "nanoid";

export default function Details({ info, setInfo, center, list }) {
        const [data, setData] = useState("");

        useEffect(() => {
            if (!info.id) return;    
        }, [info.id]);  

        const onSubmit = (event) => {
            event.preventDefault();
            setInfo({id: nanoid(), name: data, coords: center, pos: list.length});
            event.target.querySelector("input").value = "";
            setData("");
        }
        
        const onChangeInput = (event) => {
            const {value} = event.target;
            setData(value);
        }
     
        return (
            <form onSubmit={(event) => onSubmit(event)} className="catalog-search-form form-inline">
                <input type="text" onChange={(event) => onChangeInput(event)} className="form-control" placeholder="Новая точка маршрута"/>
            </form>
        )
}