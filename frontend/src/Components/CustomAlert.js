import React from 'react';

function CustomAlert(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <p className="mb-4">{props.message}</p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={props.onOK}
          >
            OK
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
