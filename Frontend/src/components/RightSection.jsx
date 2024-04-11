import React, { useEffect, useState } from 'react';
import {
	Box,
	Stack,
	Avatar,
	Button,
	Accordion,
	AccordionActions,
	AccordionSummary,
	AccordionDetails,
	Collapse,
	Popper,
	Fade,
	styled,
} from '@mui/material';
import { statusData } from '../assets/data';
import {
	AccessTime,
	Add,
	CalendarToday,
	FiberManualRecord,
	LocalDining,
	Repeat,
	ExpandMore,
	PersonPinCircle,
	Star,
	CheckCircleOutlineRounded,
	LooksOneOutlined,
} from '@mui/icons-material';
import { indigo } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { getItems } from '../services/api';
import Countdown from 'react-countdown';

/* <Icon><LocalDining style={{fontSize:"15px"}}/></Icon> */


const RightWrapper = styled(Box)`
	display: flex;
	justify-content: space-between
`;

const AddTaskButton = styled(Box)(({theme})=>({
	padding: "0px 30px",
	[theme.breakpoints.down('md')]:{
		display:"none"
	}
}))


const AvatarAdd=styled(Avatar)`
	background-color: #5f69c7;
	transition: 0.2s ease;
	&:hover{
		background-color: #4754c6;
	}
`

const RightHeader=styled(Box)(({theme})=>({
	fontSize:"25px",
	fontWeight:"500",
	[theme.breakpoints.down('md')]:{
		padding:"0px 20px"
	}
}))
	

const StatusButtonWrapper=styled(Box)(({theme})=>({
	display:"flex",
	flexWrap:"wrap",
	alignItems: 'center', 
	margin: '20px 0px',
	[theme.breakpoints.down('md')]:{
		padding:"0px 20px",
	}
}))
	

const StatusButton = styled(Box)(({theme})=>({
	border: "1px solid #b8b8b8",
	padding: "4px 8px",
	borderRadius: "14px",
	fontSize: "14px",
	color: "#767676",
	marginRight:"10px",
	[theme.breakpoints.down('md')]:{
		marginBottom:"12px",
	}
}))

// const TasksWrapper = styled(Box)`
// 	display: grid;
// 	grid-template-columns: repeat(3, 1fr);
// `;

const TasksWrapper=styled(Box)(({theme})=>({
	display:"grid",
	gridTemplateColumns: "repeat(3,1fr)",
	[theme.breakpoints.down('lg')]:{
	  gridTemplateColumns: "repeat(2,1fr)",
	},
	[theme.breakpoints.between('lg', 'md')]: {
		gridTemplateColumns: "repeat(2,1fr)",
	},
	[theme.breakpoints.down('md')]:{
	  gridTemplateColumns: "repeat(1,1fr)",
	},
  }))

// const Card = styled(Box)`
// 	border: 0.5px solid #b8b8b8;
// 	/* margin: 20px; */
// 	margin:20px 30px 10px 0px;
// 	padding: 8px 6px;
// 	border-radius: 14px;
// `;

const Card=styled(Box)(({theme})=>({
	border: "0.5px solid #b8b8b8",
	margin:"20px 30px 10px 0px",
	padding: "8px 6px",
	borderRadius: "14px",
	[theme.breakpoints.down('md')]:{
		// marginRight:"30px"
		margin:"20px 10px 10px 10px",
	},
}))
	

const CardWrapper = styled(Box)`
	/* display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; */
`;

const Icon = styled(Box)`
	display: flex;
	align-items: center;
	color: #5f69c7;
`;
const NameWrapper = styled(Stack)`
	padding: 4px 8px;
	border-radius: 6px;
	font-size: 12px;
	background-color: #f7f7f7;
	border: none;
`;

const RatingWrapper = styled(Stack)`
	padding: 4px 8px;
	border-radius: 6px;
	font-size: 12px;
	border: none;
`;

const RoomNumberWrapper = styled(Stack)`
	padding: 3px 6px;
	border-radius: 6px;
	font-size: 12px;
	background-color: #f7f7f7;
	border: none;
`;

const CardName = styled(Box)`
	font-size: 14px;
`;

const CardStatus = styled(Box)`
	padding: 4px 8px;
	border-radius: 14px;
	font-size: 13px;
	/* color: #cc2610; */
	/* background-color: #f7f7f7; */
`;

const DetailsWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0px;
`;

const CardDescription = styled(Box)`
	font-size: 18px;
	font-weight: 500;
`;

const TaskType = styled(Box)`
	padding: 4px 8px;
	border-radius: 14px;
	font-size: 13px;
	color: #dc5b19;
	background-color: #f7f7f7;
`;

const DateTime = styled(Box)`
	color: #767676;
	font-size: 14px;
`;

const TaskId = styled(Box)`
	color: #767676;
	font-size: 14px;
`;

const Text = styled(Box)`
	color: #767676;
	font-size: 15px;
	font-weight: 400;
`;
const CardButton = styled(Button)`
	width: 100%;
	text-transform: capitalize;
	box-shadow: none;
	font-family: 'Ubuntu', sans-serif;
	border-radius: 18px;
	border-color: #5f69c7;
	color: #5f69c7;
	font-weight: 400;
	margin-top: 4px;
	font-size: 13px;
`

const CardButtonNotify = styled(Button)`
	width: 100%;
	text-transform: capitalize;
	box-shadow: none;
	font-family: 'Ubuntu', sans-serif;
	border-radius: 18px;
	border:none;
	background-color: #5f69c7;
	color: #5f69c7;
	font-weight: 400;
	margin-top: 4px;
	font-size: 13px;
	transition: 0.2s ease;
	&:hover{
		background-color: #4754c6;
	}
`;

const RightSection = ({ qStatus }) => {
	console.log(qStatus);
	// const [status,setStatus]=useState("");
	const status = statusData;

	const [data, setData] = useState([]);

	// const [open, setOpen] = useState(Array.from({ length: 100 }, () => false));

	const handleToggle = (index) => {
		setOpen((prevCollapse) => {
			const newCollapse = [...prevCollapse];
			newCollapse[index] = !newCollapse[index];
			return newCollapse;
		});
	};

	useEffect(() => {
		getAllTasks();
	}, [qStatus]);

	const getAllTasks = async (req, res) => {
		const response = await getItems(qStatus);
		setData(response.data.reverse());
	};

	console.log(data);

	const [anchorEl, setAnchorEl] = useState(Array().fill(null));

	const handleClick = (index, event) => {
		const newAnchorEl = [...anchorEl];
		newAnchorEl[index] = newAnchorEl[index] ? null : event.currentTarget;
		setAnchorEl(newAnchorEl);
	};

	const open = (index) => Boolean(anchorEl[index]);
	const id = (index) => (open(index) ? `simple-popper-${index}` : undefined);

	const twentyMinutesFromNow = new Date();
	twentyMinutesFromNow.setMinutes(twentyMinutesFromNow.getMinutes() + 20);

	const [cardsStatus, setCardStatus] = useState('Scheduled');

	const getColor = (item) => {
		console.log(item);
		if (item == 'Delayed' || item == 'Complaint' || item == 'On - Time') {
			return '#ffffff';
		} else if (item == 'Ongoing') {
			return '#f1ae11';
		} else {
			return '#cc2610';
		}
	};

	const getBgColor = (item) => {
		if (item == 'Delayed' || item == 'Complaint') {
			return '#cc2610';
		} else if (item == 'On - Time') {
			return '#00a441';
		} else {
			return '#f7f7f7';
		}
	};

	const getBgRating = (rating) => {
		if (rating >= 4) {
			return '#00a441';
		} else if (rating == 2 || rating == 3) {
			return 'orange';
		} else {
			return '#cc2610';
		}
	};

	return (
		<>
			<RightWrapper>
				<RightHeader>Tasks of the day</RightHeader>
				<Link to="/add-task">
					<AddTaskButton>
						<AvatarAdd>
							<Add />
						</AvatarAdd>
					</AddTaskButton>
				</Link>
			</RightWrapper>
			<StatusButtonWrapper>
				{status.map((val) => {
					return (
						<>
							<Link to={`/tasks/${val}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								<StatusButton>{val}</StatusButton>
							</Link>
						</>
					);
				})}
			</StatusButtonWrapper>
			<TasksWrapper>
				{data.map((val, index) => {
					return (
						<>
							<Card key={index}>
								<CardWrapper>
									<DetailsWrapper>
										<Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
											<NameWrapper direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
												<Avatar
													variant="rounded"
													style={{
														display: 'flex',
														alignItems: 'center',
														color: '#5f69c7',
														width: '15px',
														height: '15px',
														backgroundColor: '#ffffff',
													}}
												>
													<LocalDining style={{ fontSize: '15px' }} />
												</Avatar>
												<CardName>{val.name}</CardName>
												<Icon>
													<FiberManualRecord style={{ fontSize: '12px', color: '#cc2610' }} />
												</Icon>
											</NameWrapper>
											{val.status.map((item) => {
												return (
													<>
														
															<CardStatus color={getColor(item)} bgcolor={getBgColor(item)}>
																{item}
															</CardStatus>
														
													</>
												);
											})}
											{val.status.includes('Not Accepted') && (
												<CardStatus>
													<Avatar
														variant="rounded"
														style={{
															display: 'flex',
															alignItems: 'center',
															color: '#ffffff',
															width: '16px',
															height: '16px',
															backgroundColor: '#66666e',
														}}
													>
														<Repeat style={{ fontSize: '16px' }} />
													</Avatar>
												</CardStatus>
											)}

											{(val.status.includes('Ongoing') || val.status.includes('Scheduled')) && (
												<CardStatus>
													<Icon
														variant="rounded"
														style={{
															display: 'flex',
															alignItems: 'center',
															color: '#66666e',
															width: '17px',
															height: '17px',
															backgroundColor: '#ffffff',
														}}
													>
														<LooksOneOutlined style={{ fontSize: '17px' }} />
													</Icon>
												</CardStatus>
											)}
										</Stack>
										{val.status.includes('Scheduled') && (
											<NameWrapper
												direction="row"
												spacing={0.5}
												sx={{ alignItems: 'center', background: '#d7ffe7', borderRadius: '14px' }}
											>
												<Icon>
													<AccessTime style={{ fontSize: '15px', color: '#00a441' }} />
												</Icon>
												<CardName style={{ color: '#00a441',fontSize:"14.6px" }}>20 min</CardName>
											</NameWrapper>
										)}

										{/* {val.status.includes('Scheduled') && val.taskType == 'Internal Task' && (
											<NameWrapper
												direction="row"
												spacing={0.5}
												sx={{ alignItems: 'center', background: '#f4d8d8', borderRadius: '14px' }}
											>
												<Icon>
													<AccessTime style={{ fontSize: '15px', color: '#cc2610' }} />
												</Icon>
												<CardName style={{ color: '#cc2610' }}>1 min</CardName>
											</NameWrapper>
										)} */}

										{val.status.includes('Complaint') && (
											<RatingWrapper
												direction="row"
												spacing={0.5}
												bgcolor={getBgRating(val.rating)}
												sx={{ alignItems: 'center', borderRadius: '14px' }}
											>
												<CardName style={{ color: '#ffffff' }}>{val.rating}</CardName>
												<Icon>
													<Star style={{ fontSize: '15px', color: '#ffffff' }} />
												</Icon>
											</RatingWrapper>
										)}
									</DetailsWrapper>

									<DetailsWrapper>
										<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
											{val.task.includes('Routine Cleaning') ? (
												<CardDescription>Routine Cleaning</CardDescription>
											) : (
												<CardDescription>Essentials</CardDescription>
											)}
											<RoomNumberWrapper direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
												<Avatar
													variant="rounded"
													style={{
														display: 'flex',
														alignItems: 'center',
														color: '#5f69c7',
														width: '18px',
														height: '18px',
														backgroundColor: '#ffffff',
													}}
												>
													<PersonPinCircle style={{ fontSize: '17px' }} />
												</Avatar>
												<CardName style={{ fontSize: '13.5px' }}>{val.roomNumber}</CardName>
											</RoomNumberWrapper>
										</Stack>
										{val.taskType == 'Guest Task' ? (
											<TaskType>{val.taskType}</TaskType>
										) : (
											<TaskType style={{ color: '#5f69c7' }}>{val.taskType}</TaskType>
										)}
									</DetailsWrapper>

									<DetailsWrapper>
										<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
											<Icon style={{ color: '#767676' }}>
												<CalendarToday style={{ fontSize: '15px' }} />
											</Icon>
											<DateTime>{val.dateTime.received_date + ' | ' + val.dateTime.received_time}</DateTime>
										</Stack>
										<TaskId>{'# ' + val.id}</TaskId>
									</DetailsWrapper>

									<DetailsWrapper>
										<Text>From: Reception</Text>
										<Text>To: Pantry</Text>
									</DetailsWrapper>

									{/* <DetailsWrapper key={index}>
										<Collapse in={open[index]}>
											<Text>From: Reception</Text>
											<Text>To: Pantry</Text>
										</Collapse>
									</DetailsWrapper> */}

									<Box>
										{val.task && (
											<Popper id={id(index)} open={open(index)} anchorEl={anchorEl[index]} placement={'top'}>
												{(val.task.length > 1) &&(
													<Box
														sx={{
															border: '1',
															padding: '10px 10px',
															bgcolor: '#f7f7f7',
															width: '100%',
															borderRadius: '6px',
														}}
													>
														{val.task.map((item) => {
															return (
																<>
																	<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
																		{item !== 'Routine Cleaning' && (
																			<Box style={{ fontSize: '15px', margin: '2px 0px', color: '#767676' }}>
																				{item}
																			</Box>
																		)}
																		{item !== 'Routine Cleaning' && (
																			<Box style={{ fontSize: '14px', color: '#767676' }}>{'x 1'}</Box>
																		)}
																	</Box>
																</>
															);
														})}
														{val.instructions && 
															<Box style={{ margin: '5px 0px', fontSize: '14px', color: '#767676' }}>
																Instructions: {val.instructions}
															</Box>
														}
													</Box>
												)}
											</Popper>
										)}
									</Box>

									{!val.status.includes('Scheduled') && (
										<CardButton
											variant="outlined"
											// onClick={() => handleToggle(index)}
											onClick={(e) => handleClick(index, e)}
											disableElevation
											disableTouchRipple
										>
											View Details
										</CardButton>
									)}
									{val.status.includes('Scheduled') && (
										<CardButtonNotify
											// variant="outlined"
											disableElevation
											disableTouchRipple
											
										>
											<Stack direction="row" spacing={0.6} style={{ display: 'flex', alignItems: 'center' }}>
												<Icon style={{ color: '#ffffff' }}>
													<CheckCircleOutlineRounded style={{ fontSize: '18px' }} />
												</Icon>
												<Box style={{ color: '#ffffff' }}>Notify Staff</Box>
											</Stack>
										</CardButtonNotify>
									)}

									{/* {val.status.includes('Scheduled') && val.taskType == 'Internal Task' && (
										<CardButton
											// variant="outlined"
											disableElevation
											disableTouchRipple
											style={{ backgroundColor: '#cc2610', border: 'none' }}
										>
											<Stack direction="row" spacing={0.6} style={{ display: 'flex', alignItems: 'center' }}>
												<Icon style={{ color: '#ffffff' }}>
													<CheckCircleOutlineRounded style={{ fontSize: '18px' }} />
												</Icon>
												<Box style={{ color: '#ffffff' }}>Notify Staff</Box>
											</Stack>
										</CardButton>
									)} */}
								</CardWrapper>
							</Card>
						</>
					);
				})}
			</TasksWrapper>
		</>
	);
};

export default RightSection;
