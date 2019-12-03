import React, { useState } from "react";

export default function List({list, setList, setListChange}) {
    const [draggablePos, setDraggablePos] = useState(null);
    const mutableList = list.slice();

    const handleDragStart = (i) => {
        setDraggablePos(i); 
    }
    
    const handleDragOver = (e) => {
        e.preventDefault();   
        return false;
    }
    
    const handleDrop = (i) => {
        const droppablePos = i; 
        const newList = mutableList.map(item => {
            if (item.pos === droppablePos) {
                item.pos = draggablePos;
            } else if (item.pos === draggablePos) {
                item.pos = droppablePos;
            }
            return item;
        })

        setList(newList);
        setListChange("yes");
    }

    const deletePoint = (i) => {
        const withoutDeleted = list.filter((item) => item.pos !== i);
        const normPosition = withoutDeleted.map((item, i) => {
            item.pos = i;
            return item;
        });
        setList(normPosition);
    }
    
    return (
      <ul className="list">
          {list !== undefined && list.map(({id, name}, i) => (               
                <li key={`${id}${name}`} 
                    draggable={true}
                    onDragStart = {() => handleDragStart(i)}
                    onDragOver = {(e) => handleDragOver(e)}
                    onDrop = {() => handleDrop(i)}
                    className={`dragItem`}>
                        <span>{name}</span>
                        <button onClick = {() => deletePoint(i)}>x</button>
                </li>       
          ))}
      </ul>
    );
}