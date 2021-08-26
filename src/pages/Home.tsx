
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTaskData={
      id:new Date().getTime(),
      title:newTaskTitle,
      done:false,
    }
    if(tasks.find((task)=>task.title ===newTaskTitle)){
Alert.alert('Tag ja cadastrada','Você não pode cadastrar uma task com o mesmo nome');
    }else{
      setTasks((oldTasks)=>[...oldTasks,newTaskData])
    }
    
  }

  const handleEditTask=(taskId:number,taskNewTitle:string)=>{
    tasks.map((task)=>{
      if(task.id){
        task.title=taskNewTitle
      }
    })
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    let selectedTask=tasks.findIndex((task)=>task.id===id );
    console.log(tasks[selectedTask].done);


    tasks.map(task=>{
      if(task.id ===id){
        task.done=!task.done
      }
      setTasks([...tasks])

    })

    console.log(tasks);
    

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    // const data=tasks;
    Alert.alert('Remover item','Tem certeza que você deseja remover esse item?',[
      {text:'Sim',
       onPress:()=>setTasks((oldTasks)=>oldTasks.filter((task)=>task.id !=id)),
       
      },
      {
        text:'Não',
        onPress:()=>null,
        style:'cancel'
    }

    ])
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})