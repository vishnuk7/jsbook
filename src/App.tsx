import { Provider } from 'react-redux';
import './styles/index.css';
import { store } from './state';
import { CellList } from './components/CellList';

const App = () => {
    return (
        <Provider store={store}>
            <div className="bg-gray-800 text-gray-200">
                <div className="flex mt-5 items-center">
                    <div className="inline-flex justify-end w-full">
                        <span className="font-bold py-2 px-4 text-xl border-red-500 ">
                            <span className="text-red-600 text-2xl bg-gray-300 px-1 rounded-md">
                                JS
                            </span>
                            Paper
                        </span>
                    </div>
                    <div className="inline-flex justify-end w-10/12 mr-2">
                        <a
                            href="https://www.npmjs.com/package/jspaper"
                            className="bg-blue-600 py-2 px-3 hover:bg-blue-700"
                        >
                            👉 Full Version
                        </a>
                    </div>
                </div>
                <CellList />
            </div>
        </Provider>
    );
};

export default App;
