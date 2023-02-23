import { Button, Col, Container, Row } from "react-bootstrap";
import React , { useState } from 'react'
import FormInput from './Components/FormInput'
import { question } from './data'
import QAList from './Components/QAList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const [data , setData] =  useState(question)

    const addItem =() => {
      localStorage.setItem("items",JSON.stringify([...question]));
      setData([...question])
      notify("تم الاضافة بنجاح" , "Success")
    }

    const deleteAllItems =() => {
      localStorage.removeItem("items");
      question.splice(0 , question.length);
      //اي بمعنا امسح المصفوفة الاصلية من الاول للاخر
      setData([])
      notify("تم حذف الكل بنجاح" , "Success")
    }


    const deleteOneItem = (items) => {
      localStorage.setItem("items",JSON.stringify([...items]));
      setData([...items])
      if(items.length <= 0) {
        deleteAllItems();
        notify("تم حذف السؤال بنجاح" , "Success")
      }
    }


    const notify = (message , type) =>{
      if(type==="Error")
      toast.error(message);
      else if (type==="Success")
      toast.success(message);
    }; 




  return (
    <div className="font text-center color-body">
      <Container className="p-5">
        <Row className="justify-content-center">
          <Col className="sm-4">
            <div className="fs-3 text-center py-2">اسالة واجوبة شائعة</div>
          </Col>
          <Col className="sm-8">
            <FormInput onAdd={addItem} notify={notify}/>
            <QAList data={data} deleteOneItem={deleteOneItem} />

            {
            localStorage.getItem("items") != null? (<button onClick={deleteAllItems} className="btn-color w-100 my-3">مسح الكل</button>): null 
            }
            
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    </div>
  );
}

export default App;
