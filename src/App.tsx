import { Provider } from 'react-redux';
import './styles/index.css';
import CodeCell from './components/CodeCell';
import { TextEditor } from './components/TextEditor';
import { store } from './state';

const App = () => {
    return (
        <Provider store={store}>
            <div className="bg-gray-800 text-gray-200">
                <TextEditor />
                <CodeCell />
            </div>
        </Provider>
    );
};

export default App;
