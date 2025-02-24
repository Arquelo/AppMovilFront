import React from 'react';
import './EditNote.css'; // Importa el archivo de estilos

function EditNote() {
  return (
    <div className="edit-note-container">
      <h2>Editar Nota</h2>

      <div className="form-group">
        <label htmlFor="taskName">Nombre de la tarea:</label>
        <input type="text" id="taskName" placeholder="Ej: Estudiar para examen" />
      </div>

      <div className="form-group">
        <label htmlFor="taskDescription">Descripción de la tarea:</label>
        <textarea id="taskDescription" placeholder="Ej: Estudiar los temas mas importante vistos en clase"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="taskDate">Fecha de la tarea:</label>
        <input type="date" id="taskDate" />
      </div>

      <div className="form-group">
        <label htmlFor="taskPriority">Prioridad de la tarea:</label>
        <select id="taskPriority">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      <div className="button-group">
        <button className="update-button">Actualizar</button>
        <button className="delete-button">Eliminar</button>
      </div>
    </div>
  );
}

export default EditNote;