import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import './App.css'

import { useState } from 'react';
import { useEffect } from 'react';

import SandwichCard from './components/SandwichCard';
import SandwichForm from './components/SandwichForm';

function App() {
  
  const backend_url = "http://localhost:8000/api/sandwiches";
  const [sandwiches, setSandwiches] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [updateSandwichData, setUpdateSandwichData] = useState(null);

/**********/

useEffect(() => {
    readSandwiches();
  }, []);

  const readSandwiches = async () => {
    const response = await fetch(backend_url);
    const data = await response.json();
    setSandwiches(data);
  }

  const createSandwich = async (sandwich) => {
    const response = await fetch(backend_url, {
      method: "POST",
      body: JSON.stringify(sandwich),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    
    const data = await response.json();
    if (response.ok) {
      readSandwiches();
      return true;
    } else {
      alert(data.message);
      return false;
    }
  }

  const deleteSandwich = async (id) => {
    const response = await fetch(`${backend_url}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    });
    if (response.ok) {
      readSandwiches();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  }

  const loadUpdateForm = async (id) => {
    setUpdateId(id);
  }

  const readSingleSandwich = async () => {
    const response = await fetch(`${backend_url}/${updateId}`, {
      headers: {
        Accept: "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
      setUpdateSandwichData(data);
    }
    else {
      setUpdateSandwichData(null);
      alert(data.message);
    }
  }

  const updateSandwich = async (sandwich) => {
    const response = await fetch(`${backend_url}/${updateId}`, {
      method: "PATCH",
      body: JSON.stringify(sandwich),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
      readSandwiches();
      setUpdateId(0);
      return true;
    } else {
      alert(data.message);
      return false;
    }
  }

  useEffect(() => {
    if (updateId == 0) {
      setUpdateSandwichData(null);
    } 
    else {
      readSingleSandwich();
    }
  }, [updateId]);

  return ( <main className='container'>
    <section>
      {
        updateSandwichData == null ?
        <>
          <h2>Új szendvics felvétele</h2>
          <SandwichForm onSubmit={createSandwich}/>
        </>  
        :
        <>
          <h2>{updateSandwichData.name} szendvics adatainak módosítása</h2>
          <SandwichForm onSubmit={updateSandwich} buttonText={"Módosítás"} sandwich={updateSandwichData} />
        </>
      }
      
    </section>
    <section>
      <h2>Szendvicsek listája</h2>
      <div className='row row-cols-lg-2 row-cols-1 gy-3'>
        {sandwiches.map(sandwich => <SandwichCard sandwich={sandwich} key={sandwich.id} updateClick={loadUpdateForm} deleteClick={deleteSandwich}/>)}
      </div>
    </section>
  </main> );
}


export default App
