import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);


  
  useEffect(() => {
     fetch('http://localhost:3000/students')
     .then(res => res.json())
     .then(result => {
      console.log(result);
      setData(result)
     })
  })



  return (
    <div className="App">
      

      <h2 className='text-2xl my-4 font-bold text-center'>All Students</h2>


      <div className="overflow-x-auto">
                <table className="table w-[95vw] mx-auto">

                    <thead>
                        <tr className='border'>
                            <th></th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sec</th>
                            <th>Roll</th>
                            <th>Grade</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data &&
                            data?.map((student, i) => <tr key={student._id} className="hover border">
                                <th className='border'>{[i + 1]}</th>
                                <td className='border'>{student.name}</td>
                                <td className='border'>{student.age}</td>
                                <td className='border'>{student.sec}</td>
                                <td className='border'>{student.roll}</td>
                                <td className='border'>{student.grade}</td>
                                
                                <td className='border'><button className='btn btn-error btn-sm' onClick={() => 'handleDelete(student._id)'}>Delete</button></td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>



    </div>
  );
}

export default App;
