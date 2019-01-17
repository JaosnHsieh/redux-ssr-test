import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Counter from '../components/Counter'

const App = (props) => 
  <Counter
    {...props}
  />

const mapStateToProps = (state)=>{
    console.log('state', state);
    return ({
        value:state
    });
}
const mapDispatchToProps = (dispatch)=>({
    onIncrement:()=>{
        dispatch({type:"INCREMENT"})
    }, 
    onDecrement:()=>{
        dispatch({type:"DECREMENT"})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);