import React from "react";

export default function List({list, setList, setListChange}) {

    let dragItem = null;
    let dropItem = null;

    function handleDragStart(e) {
        dragItem = e.currentTarget.querySelector('span');
        e.currentTarget.style.opacity = '0.4';  
      
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', dragItem.innerText);
        // return dragItem;
    }
    
    function handleDragOver(e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';  
        return false;
    }
    
    function handleDrop(e) {
        e.stopPropagation(); 
      
        dropItem = e.currentTarget.querySelector('span');
        dragItem.innerText = dropItem.innerText;
        dropItem.innerText = e.dataTransfer.getData('text/html');
        
        const listTags = Array.from(document.querySelectorAll('.dragItem'));
          const newListNumbers = list.map(item => {
            listTags.forEach((tag, i) => {
                if (tag.querySelector('span').innerHTML === item.name) {
                    item.pos = i;
                }
            })
            return item;
        })
        
        setList(newListNumbers);
        setListChange("yes");
        dropItem.innerText = dragItem.innerText;
        dragItem.innerText = e.dataTransfer.getData('text/html');
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }

    function handleChange(e, i) {
        e.target.style.opacity = '1';
    } 

    function deletePoint(i) {
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
                    onDragStart = {(e) => handleDragStart(e)}
                    onDragOver = {(e) => handleDragOver(e)}
                    onDrop = {(e) => handleDrop(e)}
                    onDragEnd = {(e) => handleDragEnd(e, i)}
                    onChange = {(e) => handleChange(e, i)}
                    className={`dragItem`}>
                        <span>{name}</span>
                        <button onClick = {() => deletePoint(i)}>x</button>
                </li>       
          ))}
      </ul>
    );
}