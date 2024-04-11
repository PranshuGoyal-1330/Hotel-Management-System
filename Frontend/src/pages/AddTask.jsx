import React, { useState } from 'react'
import {Box,InputBase,FormGroup,FormControlLabel,Checkbox,Stack,styled} from '@mui/material'
import { addTasks } from '../services/api';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';


const Container=styled(Box)`
    padding: 60px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper=styled(Box)`
    display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 30px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

const Heading=styled(Box)`
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 500;
`

const Form = styled('form')`
	width: 100%;
	padding: 20px 40px;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const Text = styled(Box)`
    font-size: 14px;
    color: #696969;
`;

const Input = styled(InputBase)`
	border: 1px solid lightgray;
	width: 100%;
	padding: 0px 10px;
	border-radius: 2px;
	margin: 10px 0px;
`;

const Select=styled('select')({
    border: "1px solid lightgray",
	width: "100%",
	padding: "7px 10px",
	borderRadius: "2px",
	margin: "10px 0px",
	background:"#ffffff",
	appearance:"none"
})

const Option=styled('option')({
})

const Button = styled('button')({
	background: '#5f69c7',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#ffffff',
	width: '100%',
	padding: '10px 10px',
	margin: '20px 0px',
	letterSpacing: '0.5px',
	border: 'none',
	borderRadius: '2px',
	cursor: 'pointer',
	transition:"0.2s ease",
	"&:hover":{
		background: '#4754c6'
	}
});

const CheckBoxWrapper=styled(Box)`
    display: flex;
    flex-wrap: wrap;
`

const AddTask = () => {

    // const today=new Date().toISOString().split('T')[0] + ' 00:00';
    // const time=new Date().toLocaleTimeString();

    const date=new Date().toISOString().split('T')[0].split('-').reverse().join('-');
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const time = new Date().toLocaleTimeString([], options);

    console.log(time);

    
    const navigate=useNavigate();

    const [data,setData]=useState({
        id:uniqid(),
        name:'',
        roomNumber:'',
        instructions:'',
        dateTime:{
            received_date:date,
            received_time:time
        },
        taskType:'',
        task:[],
    })
    console.log(data);

    // const handleDateTime=(e)=>{
    //     setData({...data,dateTime:{received_date:e.target.value.split('T')[0],received_time:e.target.value.split('T')[1]}})
    // }

    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleCheckbox=(e)=>{
        const {value,checked}=e.target;
        if(checked){
            // setData({...data,task:[e.target.value]});
            setData({ ...data, task: [...data.task, value] });
        }
        else{
            setData({ ...data, task: data.task.filter(e => e !== value) })
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await addTasks(data);
        navigate('/');
    }


  return (
    <>
        <Container>
            <Wrapper>
				<Heading>Schedule Task</Heading>
                <Form onSubmit={handleSubmit}>
					<Text>Name</Text>
					<Input type="text" name='name' onChange={handleChange} required/>

                    <Text>Room No.</Text>
					<Input type="text" name='roomNumber' onChange={handleChange}/>
                    
                    <Text>Instructions</Text>
					<Input type="text" name='instructions' onChange={handleChange}/>

                    <Text>Task Type</Text>
					<Select name='taskType' onChange={handleChange}>
                        <Option selected disabled hidden>Guest / Internal</Option>
                        <Option value='Guest Task'>Guest Task</Option>
                        <Option value='Internal Task'>Internal Task</Option>
                    </Select>

                    {/* <Text>Date / Time</Text> */}
					{/* <Input type="datetime-local" name='dateTime' onChange={handleDateTime} inputProps={{min:today}} required/> */}
                    
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size='small' />} value="Routine Cleaning" onChange={handleCheckbox} label="Routine Cleaning" />
                        <CheckBoxWrapper>
                            <FormControlLabel control={<Checkbox size='small' />} value="Shampoo" onChange={handleCheckbox} label="Shampoo" />
                            <FormControlLabel control={<Checkbox size='small'/>} value="Conditioner" onChange={handleCheckbox} label="Conditioner" />
                            <FormControlLabel control={<Checkbox size='small'/>} value="Towel" onChange={handleCheckbox} label="Towel" />
                        </CheckBoxWrapper>
                    </FormGroup>


					<Button>Schedule Task</Button>
                </Form>
            </Wrapper>
        </Container>
    </>
  )
}

export default AddTask