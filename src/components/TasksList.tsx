import React from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';


import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import TaskItem from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask:(id:number,newTitle?:string)=>void;
}

export interface editTaskProps{
  editTask:(id:number,newTitle?:string)=>void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      //para permitir cliques quando o teclado estiver aberto
      keyboardShouldPersistTaps='handled'
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem removeTask={removeTask} editTask={editTask} toggleTaskDone={toggleTaskDone} item={item} index={index} />

            {/* <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={()=>removeTask(item.id)}
              //TODO - use onPress (remove task) prop
            >
              <Image source={trashIcon} />
            </TouchableOpacity> */}
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

