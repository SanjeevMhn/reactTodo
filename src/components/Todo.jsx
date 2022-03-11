import {useState,useEffect,useRef} from 'react';
const Todo = () => {
    const uInp = useRef();
    const [mark,setMark] = useState(false);
    const [edit,setEdit] = useState(false);
    const [completed,setCompleted] = useState([]);
    const [todos,setTodos] = useState([
        {
            "id": 1,
            "desc": "Paint the backyard",
            "done": false
        },
        {
            "id": 2,
            "desc": "Buy Coffee",
            "done": true
        },
        {
            "id": 3,
            "desc": "Prepare dinner",
            "done": false
        },
        {
            "id": 4,
            "desc": "Clean the car",
            "done": false
        },
        {
            "id": 5,
            "desc": "Fix the drain",
            "done": true
        },
        {
            "id": 6,
            "desc": "Do the laundry",
            "done": false
        }
    ]);

    useEffect(()=>{
        todos.map((todo)=>{
            if(todo.done){
                setCompleted([...completed,todo]);
            }
        })
    },[]);

    const addToTaskList = () => {
        if(!edit){
            let dup = checkDuplication(uInp.current.value);
            if(dup == 0){
                let newTask = {
                    "id": Date.now(),
                    "desc": uInp.current.value,
                    "done": false
                }
                setTodos([newTask,...todos]);
                uInp.current.value = "";
            }else{
                alert("Task already exists");
                uInp.current.value = "";
            }
        }else{
            if(uInp.current.value !== ""){
                let ind = todos.map((todo,index)=>{
                    if(todo.desc.toLowerCase() === uInp.current.value.toLowerCase()){
                        return index;
                    }
                })
                console.log(ind);
                console.log(uInp.current.value);
                // setTodos(todos.map((todo,index,arr)=>{
                //     if(index === ind){
                //         todo.desc = uInp.current.value;
                //     }
                // }))
                setEdit(edit => !edit);
            }else{
                alert("Please enter text");
            }
        }

    }

    const handleKeyDown = (e) => {
        if(e.keyCode == 13){
            addToTaskList();    
        }
    }

    const handleTaskMarked = (id) =>{
        setMark(mark => !mark);
        let compTask = todos.filter((todo)=>{
           return todo.id === id; 
        });
        console.log(compTask);
        setCompleted([compTask[0],...completed]);
        todos.map((todo)=>{
            if(todo.id === id){
                todo.done = !todo.done;
            }
        })
    }

    const handleTaskUnmarked = (id) => {
        setMark(mark => !mark);
        setCompleted(completed.filter((comp)=>{
            return comp.id !== id;
        })) 
        console.log(completed);
        todos.map((todo)=>{
            if(todo.id === id){
                todo.done = !todo.done;
            }
        })
    }
    
    const handleTaskEdit = (id) => {
        setEdit(edit => !edit);
        let editTask = todos.filter((todo)=>{
            if(todo.id === id){
                return todo;
            }
        });
        uInp.current.value = editTask[0].desc;
    }

    const checkDuplication = (task)=>{
        let count = 0;
        todos.map((todo)=>{
            if(todo.desc.toLowerCase() === task.toLowerCase()){
                count += 1;
            }
        });
        return count;
    }
    return (
        <div className="flex flex-col items-center px-4">
            <div className="user-input">
                <input type="text" className="p-2 border-2 border-black text-2xl rounded-tl-md rounded-bl-md" name="user-task" id="" placeholder="Enter tasks" ref={uInp} onKeyDown={(e)=>{
                    handleKeyDown(e)
                }}/>
                {!edit ? (
                    <button type="button" className="text-2xl p-2 bg-gray-400 font-semibold border-l-0 border-2 border-black rounded-tr-md rounded-br-md">Add</button>
                ):(
                    <button type="button" className="text-2xl p-2 bg-gray-400 font-semibold border-l-0 border-2 border-black rounded-tr-md rounded-br-md">Update</button>
                )}
            </div>
            <ul className="text-2xl w-[40%] p-3">
                {
                    todos.map((todo)=>{
                        return(
                            <li key={todo.id} className="flex justify-between bg-red-200 p-3 w-full border-b-2 border-black">
                                <span className={todo.done ? "line-through" : ""}>
                                    {todo.desc}
                                </span>
                                <div className="actions flex gap-1">
                                    {!todo.done ? (
                                        <button className="btn bg-slate-400 rounded-md py-1 px-2 text-xl text-white" onClick={()=>{handleTaskMarked(todo.id)}}>Mark</button>
                                    ):(
                                        <button className="btn bg-slate-400 rounded-md py-1 px-2 text-xl text-white" onClick={()=>{handleTaskUnmarked(todo.id)}}>Unmark</button>
                                    )}
                                    <button className="btn bg-slate-400 rounded-md py-1 px-2 text-xl text-white" onClick={()=>{handleTaskEdit(todo.id)}}>Edit</button>
                                    <button className="btn bg-slate-400 rounded-md py-1 px-2 text-xl text-white">Delete</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="completed-task mr-auto">
                <h2 className="text-2xl underline">Completed Tasks</h2>
                <ul className="list-decimal p-4 m-0">
                    {completed.map((comp)=>{
                        return(
                            <li key={comp.id} className="text-xl">
                                {comp.desc}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Todo;