import React, {Component} from 'react';
import './App.css';

class ProductInventory extends Component{

  constructor(props){
    super(props);
    this.state={
      title: 'Product Inventory Application',
      act: 0,
      index: '',
      datas: []
    }
  } 
  componentDidMount(){
    this.refs.product.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let product = this.refs.product.value;
    let price = this.refs.price.value;

    if(this.state.act === 0){   //new
      let data = {
        product, price
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].product = product;
      datas[index].price = price;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.product.focus();
  }


  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.product.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.product.value = data.product;
    this.refs.price.value = data.price;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.product.focus();
  }  

    render(){
      let datas = this.state.datas;
      return (
        <div className="App">
          <h2>{this.state.title}</h2>
          <form ref="myForm" className="myForm">
            <input type="text" ref="product" placeholder="Product Name" className="formField" />
            <input type="text" ref="price" placeholder="Price" className="formField" />
            <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
          </form>
          <pre>
            {datas.map((data, i) =>
              <li key={i} className="myList">
                {i+1}. {data.product}, {data.price}
                <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
                <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
              </li>
            )}
          </pre>       
        </div>
      );
  }
}
export default ProductInventory;
