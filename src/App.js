import './App.css';
import Swal from 'sweetalert2';


function App() {
  const showAlert = () => {
    Swal.fire({
      title: 'My Dialog',
      text: 'Message On',
      icon:'success'
    })
  }

  const ConfirmDialog = () => {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'Delete?',
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true,
    }).then((res) => {
      if(res.isConfirmed){
        console.log('You confirmed')
      }
    })
  }

  return (
    <div >
      <button className = 'btn btn-primary me-3' onClick={showAlert}>Click This</button>
      <button className = 'btn btn-danger ' onClick={ConfirmDialog}>Confirm</button>
    </div>
  );
}

export default App;
