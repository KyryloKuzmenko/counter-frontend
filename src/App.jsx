import './App.css';
import Counter from './components/Counter/Counter';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from './components/Login/Login';
import { useState } from 'react';
import Modal from './components/Modal/Modal'

function App() {
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div>
      {!token && (
        <button
          onClick={openModal}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Control Panel
        </button>
      )}

      <Counter />

      {token && <AdminPanel token={token} />}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Login
          setToken={(token) => {
            setToken(token);
            closeModal(); 
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
