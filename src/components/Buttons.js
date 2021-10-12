import { useGlobalContext } from '../context';

const Buttons = () => {
  const { page, togglePages } = useGlobalContext();
  return (
    <div className="btn-container">
      <button className="decrease" onClick={togglePages}>
        prev
      </button>
      <p>{page + 1} of 50</p>
      <button onClick={togglePages} className="increase">
        next
      </button>
    </div>
  );
};

export default Buttons;
