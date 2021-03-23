import { Provider } from 'react-redux';
import './styles/index.css';
import { store } from './state';
import { CellList } from './components/CellList';

const App = () => {
    return (
        <Provider store={store}>
            <div className="bg-gray-800 text-gray-200">
                <CellList />
            </div>
        </Provider>
    );
};

export default App;
