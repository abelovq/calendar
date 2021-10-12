import { useSelector } from 'react-redux';
import s from './App.module.scss';
import { Header } from './components/Header/Header';
import { Table } from './components/Table/Table';

const months = ['January', 'February', 'March', 'April', 'May',
'June', 'July', 'August', 'September', 'October', 'November', 'December']

function App() {
  const data = useSelector((state: any) => state)
  console.log(`data`, data)
  return (
    <div className={s.app}>
      <div className={s.container}>
        <Header currYear={data.currYear} currMonth={months[data.currMonth]} />
        <Table data={data} />
      </div>
    </div>
  );
}

export default App;
