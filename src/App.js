import './App.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

function App() {

  const [editor, setEditor] = useState([]);
  const { register, formState: { errors }, handleSubmit } = useForm()
  const [processing, setProcessing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [detail, setDetail] = useState({});



  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await fetch('https://api-mongo-server.vercel.app/students')
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

    fetch('https://api-mongo-server.vercel.app/addStudent', {
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


  const handleEdit = id => {
    setIsEditing(true)

    fetch(`http://localhost:5000/students/${id}`)
      .then(res => res.json())
      .then(data => setEditor(data[0]))

  }

  const handleUpdateStudent = (event) => {
    event.preventDefault();
        
        const form = event.target;
        const age = form.age.value;
        const sec = form.sec.value;
        const roll = form.roll.value;
        const grade = form.grade.value;
    
        

    const stuId = document.getElementById('stu_id').innerHTML
    let editDetail = {age, sec, roll, grade}
    console.log(editDetail, stuId);




     fetch(`https://api-mongo-server.vercel.app/students/${stuId}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(editDetail)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount > 0) {
          toast.success('Updated successful')
          setIsEditing(false)
          refetch()
        }
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

                <td className='border'><button className='btn btn-error btn-sm' onClick={() => handleEdit(student._id)}>Edit</button></td>
              </tr>

              )
            }
          </tbody>
        </table>

        {
          isEditing && <div>
            <h2 className='text-2xl my-4 font-bold text-center'>Edit {editor.name}'s Details</h2>

            <form className='w-[90vw] sm:w-[500px] mx-auto border py-10 px-2' onSubmit={handleUpdateStudent}>


              <div id='stu_id'>{editor._id}</div>
              <div className='flex gap-3 items-center justify-between'>

                <div>
                  <label className="label">
                    <span className="mr-3 label-text font-bold">Age</span>
                  </label>
                  <input type="text" defaultValue={editor.age} className="w-[140px] my-2 px-3 rounded border"  name='age' />
                </div>

                <div>
                  <label className="label">
                    <span className="mr-3 label-text font-bold">Section</span>
                  </label>
                  <input type="text" defaultValue={editor.sec} className="w-[140px] my-2 px-3 rounded border"  name='sec' />
                </div>

              </div>



              <div className='flex gap-3 items-center justify-between'>

                <div> <label className="label">
                  <span className="mr-3 label-text font-bold">Roll</span>
                </label>
                  <input type="text" defaultValue={editor.roll} className="w-[140px] my-2 px-3 rounded border"  name='roll' />
                </div>

                <div>
                  <label className="label">
                    <span className="mr-3 label-text font-bold">Grade</span>
                  </label>
                  <input type="text" defaultValue={editor.grade} className="w-[140px] my-2 px-3 rounded border"  name='grade' />
                </div>

              </div>



              <div className="flex flex-col w-full border-opacity-50">

                <button className="w-[150px] mx-auto p-2 my-5 rounded-lg bg-green-500 text-white" type="submit" disabled={processing}>{processing ? 'Processing' : 'Edit Student'}</button>

              </div>

            </form>
          </div>
        }
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
