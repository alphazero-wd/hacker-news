import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { changeQuery } = useGlobalContext();
  return (
    <form className="search-form">
      <h2>search hacker news</h2>
      <input className="form-input" type="text" onChange={changeQuery} />
    </form>
  );
};

export default SearchForm;
