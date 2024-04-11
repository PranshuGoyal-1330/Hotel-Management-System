import React from 'react';
import { Box, Stack, styled, Accordion, AccordionSummary, AccordionDetails, Avatar } from '@mui/material';
import { Add, AutoGraph, CalendarToday, CalendarTodayOutlined, ExpandMore, Home, HomeOutlined, PersonOutline, ViewList, ViewListOutlined } from '@mui/icons-material';
import RightSection from './RightSection';
import { Link, useParams } from 'react-router-dom';

const Component = styled(Box)(({ theme }) => ({
	padding: '50px 10px',
	[theme.breakpoints.down('md')]: {
		padding: '50px 0px 0px 0px',
	},
}));

const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	[theme.breakpoints.down('md')]: {
		display: 'flex',
		flexDirection: 'column',
	},
}));

const Left = styled(Box)(({ theme }) => ({
	width: '15%',
	fontWeight:"500",
	[theme.breakpoints.down('md')]: {
		width: '100%',
		display: 'none',
	},
}));

const LeftWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
`;

const HomeButton = styled(Stack)`
	background-color: #f0f0f0;
	padding: 10px 30px;
	border-bottom: 5px solid #dc5b19;
`;

const Right = styled(Box)(({ theme }) => ({
	width: '85%',
	marginLeft: '30px',
	[theme.breakpoints.down('md')]: {
		width: '100%',
		marginLeft: '0px',
		marginBottom: '200px',
	},
}));

const MobileWrapper = styled(Box)(({ theme }) => ({
	position: 'fixed',
	left: '0',
	bottom: '0',
	width: '100%',
	clear: 'both',
	display: 'none',
	// borderTop: '1px solid black',
	marginTop: '20px',
	borderRadius: '6px',
	boxShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 12px',
	// transform: "translateY('100%')",
	backgroundColor: '#ffffff',
	[theme.breakpoints.down('md')]: {
		display: 'grid',
	},
}));

const Footer = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	justify-content: space-between;
	padding: 10px 80px;
`;

const FooterLeft = styled(Box)``;

const FooterCenter = styled(Box)`
	position: relative;
	bottom: 35px;
`;

const FooterRight = styled(Box)``;

const Icon = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FooterText = styled(Box)`
	text-align: center;
	font-size: 12px;
`;

const AddTaskButton = styled(Box)`
	/* padding: 0px 30px; */
`;

const AvatarAdd=styled(Avatar)`
	background-color: #5f69c7;
	width: 50px;
	height: 50px;
	transition: 0.2s ease;
	&:hover{
		background-color: #4754c6;
	}
`
const Section = () => {
	const { status } = useParams();

	return (
		<>
			<Component>
				<Wrapper>
					<Left>
						<LeftWrapper>
							<Link to="/" style={{textDecoration:"none",color:"inherit"}}>
								<HomeButton direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
									<HomeOutlined />
									<Box>Home</Box>
								</HomeButton>
							</Link>
							<Box style={{ marginTop: '10px', padding: '0px 30px', margin: '0px' }}>
								<Accordion style={{ background: '#ffffff', padding: '0px', margin: '0px', boxShadow: '0px 0px 0px' }}>
									<AccordionSummary
										style={{ background: '#ffffff', borderBottom: '0px', padding: '0px', margin: '10px 0px' }}
										expandIcon={<ExpandMore />}
										aria-label="Expand"
										aria-controls="-content"
										id="-header"
									>
										<Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
											<ViewListOutlined />
											<Box>Console</Box>
										</Stack>
									</AccordionSummary>
									<AccordionDetails style={{ padding: '0px', margin: '0px 6px' }}>
										<Stack direction="column" spacing={4}>
											<Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
												<CalendarTodayOutlined />
												<Box>Attendance</Box>
											</Stack>

											<Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
												<AutoGraph />
												<Box>Overview</Box>
											</Stack>

											<Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
												<PersonOutline />
												<Box>Staff</Box>
											</Stack>
										</Stack>
									</AccordionDetails>
								</Accordion>
							</Box>
						</LeftWrapper>
					</Left>
					<Right>
						<RightSection qStatus={status} />
					</Right>

					<MobileWrapper>
						<Footer>
							<FooterLeft>
								<Stack direction="column" spacing={0.5} style={{ display: 'flex', alignItems: 'center' }}>
									<Icon>
										<HomeOutlined style={{color:"#5f69c7"}}/>
									</Icon>
									<FooterText style={{color:"#5f69c7"}}>Home</FooterText>
								</Stack>
							</FooterLeft>
							<FooterCenter>
								<AddTaskButton>
									<Link to="/add-task" style={{textDecoration:"none",color:"inherit"}}>
										<AvatarAdd>
											<Add style={{fontSize:"30px"}}/>
										</AvatarAdd>
									</Link>
								</AddTaskButton>
							</FooterCenter>
							<FooterRight>
								<Stack direction="column" spacing={0.5} style={{ display: 'flex', alignItems: 'center' }}>
									<Icon>
										<ViewListOutlined />
									</Icon>
									<FooterText>Console</FooterText>
								</Stack>
							</FooterRight>
						</Footer>
					</MobileWrapper>
				</Wrapper>
			</Component>
		</>
	);
};

export default Section;
