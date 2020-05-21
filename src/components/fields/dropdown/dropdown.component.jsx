import React from 'react';
import './dropdown.styles.scss';

const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  }

const filterFunction = () => {
    var input, filter, a, i, div, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  const domesticDropdownValue = [
    {id: 1, value: 'Value 1'}, 
    {id: 2, value: 'Value 2'}, 
    {id: 3, value: 'Value 3'}
  ]

const Dropdown = ({name = "Dropdown new", values = domesticDropdownValue}) =>{
    return(
        <div>
            <div className="dropdown">
                <button onClick={() => myFunction()} className="dropbtn">{name}</button>
                <div id="myDropdown" className="dropdown-content">
                    <input type="text" placeholder="Search.." id="myInput" onKeyUp={()=> filterFunction()} />
                    {values ? (
                      <div>
                      {values.map(({id, value}) =>(
                         <p key={id}>{value}</p>  // TODO 
                      ))}
                      </div>
                    )
                    : null}
                   
                </div>
            </div>
        </div>
    )
}

export default Dropdown;