
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import XIcon from '../assets/icons/X.png';
import EditIcon from '../assets/icons/edit.png';
import trashIcon from '../assets/icons/trash/trash.png'

interface taskItemProps{
    toggleTaskDone:(item:number)=>void;
    item:Task;
    index:number;
    editTask:(id:number,newTitle?:string)=>void;
    removeTask:(id: number) => void;
}

export default function TaskItem({toggleTaskDone,item,index,editTask, removeTask}:taskItemProps) {

    const [taskState, setTaskState] = useState<Boolean>(false);
    const [editedTask, setEditedTask] = useState<string>(item.title);
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
        <View style={styles.taskContainer} >
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

                {/* <Text 
                  //TODO - use style prop
                  style={ item.done ? styles.taskTextDone : styles.taskText}
                > */}
                

                   {/* {item.title}
                 </Text> */}
                 <TextInput value={editedTask}
                 onChangeText={setEditedTask}
                  editable={true} onSubmitEditing={handleSubmitEditing}
                  style={item.done ? styles.taskTextDone : styles.taskText}
                  ref={textInputRef}
                   />
                   <View style={styles.divider} >

                   </View>
              </TouchableOpacity>
              <View style={styles.iconsConatiner} >
                  {taskState ? <TouchableOpacity onPress={handleCancelEditing} >
                      <Image source={XIcon}/>
                      </TouchableOpacity>
                         :
                         <TouchableOpacity onPress={handleStartEditing} >
                             <Image source={EditIcon}/>
                          </TouchableOpacity>}
                          <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={()=>removeTask(item.id)}
              //TODO - use onPress (remove task) prop
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
              </View>
            </View>
    )
}

const styles = StyleSheet.create({
    taskContainer:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
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
    },
    iconsConatiner:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    divider:{
        width: 1,
        height: 24,
        backgroundColor:'rgba(196,196,196,0.24)'
    }
  })
