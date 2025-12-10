import {useState} from "react"

export default function TaskForm()
{
    const [taskName, setTaskName] = useState("");
    const [floorName, setFloorName] = useState("");
    const [tasks, setTasks] = useState([])
    const [floors, setFloors] = useState([])

    function addItemToStorage(item, itemKey, setItem)
    {
        if (item.name.length === 0)
        {
            return;
        }

        const itemListJson = localStorage.getItem(itemKey);
        const itemList = JSON.parse(itemListJson ?? "[]");
        itemList.push(item)
        setItem(itemList);
        localStorage.setItem(itemKey, JSON.stringify(itemList));
    }

    return <div>
            <input value = {taskName} type = "text" placeholder = "Digite o nome da tarefa" onChange={(e) =>{setTaskName(e.target.value)}}/><button onClick={() =>{
                addItemToStorage({name: taskName, done: false, xp: 10}, "tasks", setTasks);

            }}>Add</button>
            <input value = {floorName} type = "text" placeholder = "Digite o nome do andar" onChange = {(e)=>{setFloorName(e.target.value)}}/><button onClick={() =>
            {
                addItemToStorage({name: floorName, index: 0}, "floors", setFloors);
            }
            }>Add</button>
            <button onClick={() => {localStorage.clear(); setTasks([]); setFloors([])}}>Limpar localStorage</button>

            {
                tasks.map((task, index) =>
                {
                    return <div key = {index}>
                        <h1>{task.name}</h1>
                    </div>
                })
            }
            {
                floors.map((floor, index) =>
                {
                    return <div key = {index}>
                        <h1>{floor.name}</h1>
                    </div>
                })
            }
        </div>
}
