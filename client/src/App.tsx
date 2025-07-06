import './App.css';
import { useParams } from 'react-router-dom';
import useGroceries from './tools/groceriesApi';
import GroceryList from './components/GroceryList/GroceryList';
import ComboboxTextInput from './components/TextInput/ComboboxTextInput';
import TextInput from './components/TextInput/TextInput';

export default function App() {
  const { shopperId } = useParams();
  const groceriesApi = useGroceries(Number(shopperId) || 1);

  return (
    <>
      <div className="container">
        <div className="header-container">
          <div className="content">
            <div className="add-inputs">
              <div className="name-input">
                <ComboboxTextInput
                  value={groceriesApi.nameText}
                  placeholder="Type grocery here..."
                  onChange={groceriesApi.setNameText}
                  options={groceriesApi.groceries.aisles
                    .flatMap((a) => a.infos.map((info) => info.name))
                    .filter(
                      (name) =>
                        !groceriesApi.groceries.items.some(
                          (g) =>
                            g.name.trim().localeCompare(name.trim(), 'en', {
                              sensitivity: 'base',
                            }) === 0,
                        ),
                    )}
                />
              </div>
              <div className="quantity-input">
                <TextInput
                  value={groceriesApi.quantityText}
                  placeholder="1 jar"
                  onChange={groceriesApi.setQuantityText}
                />
              </div>
            </div>
            <button
              onClick={groceriesApi.addGrocery}
              tabIndex={-1}
              className="button"
              disabled={groceriesApi.nameText.trim() === ''}
            >
              Add
            </button>
          </div>
        </div>

        <div className="list-container">
          <GroceryList
            grocerySet={groceriesApi.groceries}
            onToggle={groceriesApi.toggleGrocery}
            onDelete={groceriesApi.deleteGrocery}
            onAisleSet={groceriesApi.updateGroceryAisle}
          />
        </div>

        <div className="footer">
          <div className="tools">
            <button
              onClick={groceriesApi.resetGroceries}
              disabled={
                groceriesApi.groceries.items.length == 0 ||
                !groceriesApi.groceries.items.some((g) => g.isChecked)
              }
              className="button"
            >
              Reset
            </button>
            <button
              onClick={() => {
                if (window.confirm('Clear the current list?'))
                  groceriesApi.clearGroceries();
              }}
              disabled={groceriesApi.groceries.items.length == 0}
              className="button"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
