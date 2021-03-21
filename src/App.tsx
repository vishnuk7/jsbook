import './styles/index.css';
// import CodeCell from './components/CodeCell';
import { TextEditor } from './components/TextEditor';

const App = () => {
    return (
        <div className='bg-gray-800 text-gray-200' >
            <TextEditor />
            {/* <CodeCell /> */}
        </div>
    );
};

export default App;
