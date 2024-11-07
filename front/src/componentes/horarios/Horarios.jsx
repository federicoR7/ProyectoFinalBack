import "./Horarios.css"
import { useEffect } from "react";

function Horarios() {
    useEffect(() => {
        let dayIx = new Date().getDay(); // 0 is Sunday
        dayIx = dayIx === 0 ? 6 : dayIx - 1; // Monday (0) is first in week
  
        let rows = document.querySelector('#calendar').querySelectorAll('tbody tr');
        let rowIx = 0;
        rows.forEach(row => {
           if (rowIx === dayIx)
           row.classList.add('table-success');
           rowIx++;
        })
     });
    return (

        <div className="container containerTabla">
            
                <table className="tabla" id="calendar">
                    <thead>
                        <tr className="fila cerrado" >

                            <th className="cerrado">Atención</th>
                            <th className="cerrado">Días</th>
                            <th className="cerrado">Horarios</th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr className="fila cerrado" >
                            <th className="cerrado">Abierto</th>
                            <td className="cerrado">Lunes</td>
                            <td className="cerrado">9:30hs - 19hs</td>

                        </tr>
                        <tr className="fila cerrado">
                            <th className="cerrado">Abierto</th>
                            <td className="cerrado">Martes</td>
                            <td className="cerrado">9:30hs - 19hs</td>

                        </tr>
                        <tr className="fila cerrado">
                            <th className="cerrado">Abierto</th>
                            <td className="cerrado">Miércoles</td>
                            <td className="cerrado">9:30hs - 19hs</td>

                        </tr>
                        <tr className="fila cerrado" >
                            <th className="cerrado">Abierto</th>
                            <td className="cerrado">Jueves</td>
                            <td className="cerrado">9:30hs - 19hs</td>

                        </tr>
                        <tr className="fila">
                            <th className="cerrado">Abierto</th>
                            <td className="cerrado">Viernes</td>
                            <td className="cerrado">9:30hs - 19hs</td>

                        </tr>
                        <tr className="fila cerrado" >
                            <th className="cerrado">Abierto</th>
                            <td className="cerrado">Sábado</td>
                            <td className="cerrado">9:30hs - 19hs</td>

                        </tr>
                        <tr className="fila cerrado">
                            <th className="cerrado">Cerrado</th>
                            <td className="cerrado">Domingo</td>
                            <td className="cerrado"> - </td>

                        </tr>
                    </tbody>
                </table>
            
        </div>

    )
}

export default Horarios;