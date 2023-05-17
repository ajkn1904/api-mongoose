import './App.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

function App() {

  //const [data, setData] = useState([]);
  const { register, formState: { errors }, handleSubmit } = useForm()
  const [processing, setProcessing] = useState(false)

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/students')
      const data = await res.json()
      return data
    }
  })

  if (isLoading) {
    return <p>Loading ...</p>
  }


  const handleAddStudent = (data) => {
    setProcessing(true)

    const stu = {
      name: data.name,
      age: data.age,
      sec: data.sec,
      roll: data.roll,
      grade: data.grade,
    }

    fetch('http://localhost:5000/addStudent', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(stu)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        refetch()
        toast.success('Student added Successfully')
        setProcessing(false)
      })

  }


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




      <div>
        <h2 className='text-2xl my-4 font-bold text-center'>Insert Students</h2>

        <div className='card border shadow-xl w-96 mx-auto bg-slate-100 p-7'>
          <form onSubmit={handleSubmit(handleAddStudent)}>

            <div className='flex justify-between items-center'>
              <label className="label">
                <span className="w-[20px] mr-3 label-text font-bold">Name</span>
              </label>
              <input type="text" placeholder='name' className="w-[250px] my-2 p-3 rounded-xl border"  {...register("name")} />

            </div>

            <div className='flex justify-between items-center'>
              <label className="label">
                <span className="w-[20px] mr-3 label-text font-bold">Age</span>
              </label>
              <input type="text" placeholder='10' className="w-[250px] my-2 p-3 rounded-xl border"  {...register("age")} />

            </div>


            <div className='flex justify-between items-center'>
              <label className="label">
                <span className="w-[20px] mr-3 label-text font-bold">Section</span>
              </label>
              <input type="text" placeholder='A' className="w-[250px] my-2 p-3 rounded-xl border"  {...register("sec")} />

            </div>



            <div className='flex justify-between items-center'>
              <label className="label">
                <span className="w-[20px] mr-3 label-text font-bold">Roll</span>
              </label>
              <input type="text" placeholder='10001' className="w-[250px] my-2 p-3 rounded-xl border"  {...register("roll")} />

            </div>



            <div className='flex justify-between items-center'>
              <label className="label">
                <span className="w-[20px] mr-3 label-text font-bold">Grade</span>
              </label>
              <input type="text" placeholder='3rd' className="w-[250px] my-2 p-3 rounded-xl border"  {...register("grade")} />

            </div>



            <div className="flex flex-col w-full border-opacity-50">

              <button className="w-[200px] mx-auto p-3 my-8 rounded-lg bg-blue-500 text-white" type="submit" disabled={processing}>{processing ? 'Processing' : 'Add Student'}</button>

            </div>

          </form>

        </div>
      </div>


    </div >
  );
}

export default App;
