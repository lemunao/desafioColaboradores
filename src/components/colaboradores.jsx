import BaseColaboradores from './BaseColaboradores';
import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Colaboradores = () => {

    const id = Math.random();

    //Creating arrays
    const [newColaborator, setNewColaborator] = useState("")
    const [listaColaboradores, setColaborador] = useState(BaseColaboradores)

    const [nombre, setNombreColaborador] = useState("")
    const [correo, setCorreoColaborador] = useState("")

    //Busqueda
    const [busqueda, setNewBusqueda] = useState(listaColaboradores)

    //Function send form

    const captureName = (e) => {
        setNombreColaborador(e.target.value)
    }

    const captureCorreo = (e) => {
        setCorreoColaborador(e.target.value)
    }


    const enviarColaborador = (e) => {
        e.preventDefault();
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (emailRegex.test(correo)) {
            setColaborador([...listaColaboradores, { id, nombre, correo }]) //Add Colaborator
            setNewColaborator("")  //Empty form
        } else {
            alert("Ingrese correo valido")
        }
    }

    const handleChange = e => {
        setNewBusqueda(e.target.value)
        filtrar(e.target.value)
    }
    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = listaColaboradores.filter((elemento) => {
            if (elemento["nombre"].toLowerCase().includes(terminoBusqueda.toLowerCase()) || elemento["correo"].toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        })
        setNewBusqueda(resultadosBusqueda);
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className='col-6'>
                            <form>
                                <p> Nombre colaborador: <input id="nombre" name='newColaborator' onChange={captureName}></input></p>
                                <p> Correo colaborador: <input id="correo" name='newColaborator' onChange={captureCorreo}></input></p>
                                <button onClick={enviarColaborador}>Agregar colaborador</button>
                            </form>
                            <p>-</p>
                            <ul>
                                {listaColaboradores.map(number =>
                                    <li key={number["id"]}>Nombre: {number["nombre"]}
                                        <p>{number["correo"]}</p>
                                    </li>)}
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className='col-6'>
                            <p>
                                Search:
                                <input id='search'
                                    placeholder='Búsqueda por nombre o correo'
                                    onChange={handleChange}></input>
                            </p>
                            <div>
                                <ul>
                                    {busqueda.map(col =>
                                        <li>{col["nombre"]}
                                            <p> {col["correo"]}</p></li>

                                    )}
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Colaboradores;