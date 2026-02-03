import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Upload from './screens/Upload';
import Validation from './screens/Validation';
import Warnings from './screens/Warnings';
import Preview from './screens/Preview';
import Legal from './screens/Legal';
import Export from './screens/Export';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/warnings" element={<Warnings />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
