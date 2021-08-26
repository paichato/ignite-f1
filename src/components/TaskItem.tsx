import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';

interface taskItemProps{
    toggleTaskDone:(item:number)=>void;
    item:Task;
    index:number;
    editTask:(taskId:number,taskNewTitle?:string)=>void;
}

export default function TaskItem({toggleTaskDone,item,index,editTask}:taskItemProps) {

    const [taskState, setTaskState] = useState<Boolean>(false);
    const [editedTask, setEditedTask] = useState(item.title);
    const textInputRef=useRef<TextInput>(null);

    const handleStartEditing=()=>{
        setTaskState(true);
    }

    const handleCancelEditing=()=>{
        setEditedTask(item.title);
        setTaskState(false);
    }

    const handleSubmitEditing=()=>{
        editTask(item.id);
        setTaskState(false);
    }

    useEffect(()=>{
        if(textInputRef.current){
            if(taskState){
                textInputRef.current.focus();
            }else{
                textInputRef.current.blur();
            }
        }
        
    },[taskState])

    return (
        <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={()=>toggleTaskDone(item.id)}
                //TODO - use onPress (toggle task) prop
              >
                <View 
                  testID={`marker-${index}`}
                  //TODO - use style prop 
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker }
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <Text 
                  //TODO - use style prop
                  style={ item.done ? styles.taskTextDone : styles.taskText}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })
