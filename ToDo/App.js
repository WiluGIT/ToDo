import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import Heading from './components/Heading.js'
import Input from './components/Input.js'
import Button from './components/Button.js'
import TodoList from './components/TodoList.js'
import TabBar from './components/TabBar.js'

let todoIndex=0

class App extends Component{
  constructor(){
    super()
    this.state={
      inputValue: '',
      todos: [],
      type: 'All'
    }
    this.submitTodo = this.submitTodo.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.setType = this.setType.bind(this)

  }

  inputChange(inputValue){
    console.log('Input Value: ',inputValue)
    this.setState({
      inputValue: inputValue
    })
  }
  submitTodo(){
    if(this.state.inputValue.match(/^\s*$/)){
      return
    }

    const todo={
      title: this.state.inputValue,
      todoIndex,
      complete:false
    }
    todoIndex++
    const todos=[...this.state.todos,todo]
    this.setState({
      todos:todos,
      inputValue: ''
    }, ()=>{
      console.log('State: ', this.state)
    })

  }

  deleteTodo(todoIndex){
    let {todos} = this.state
    todos = todos.filter((todo)=> todo.todoIndex !==todoIndex)
    this.setState({
      todos: todos
    })
  }

  toggleComplete(todoIndex){
    let {todos} = this.state
    todos.forEach((todo) =>{
      if(todo.todoIndex===todoIndex){
        todo.complete = !todo.complete
      }
      

    })
    this.setState({
      todos: todos
    })
  }

  setType(type){
    this.setState({
      type:type
    })
  }

  render(){
    let {inputValue, todos, type} = this.state
    return(
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
          <Heading/>
          <Input 
            inputValue={inputValue} 
            inputChange={(text)=>this.inputChange(text)}/>
            <TodoList 
              todos={todos}
              toggleComplete={this.toggleComplete}
              deleteTodo={this.deleteTodo}
              type={type}/>
            <Button submitTodo={this.submitTodo}/>
        </ScrollView>
        <TabBar type={type} setType={this.setType}/>
      </View>
    )
  }
}

const styles =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#f5f5f5"
  },
  content:{
    flex:1,
    paddingTop:60
  }
})

export default App