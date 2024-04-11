import React from 'react';
import { Avatar, Badge, Box, Stack, styled } from '@mui/material';
import { NotificationsNone, NotificationsNoneSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Component=styled(Box)(({theme})=>({
	padding: "20px 40px",
    borderBottom: "1px solid #b8b8b8",
	[theme.breakpoints.down('md')]:{
		padding:"20px 20px"
	}
}))

const Wrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Left = styled(Box)`
	font-size: 26px;
	font-weight: 500;
`;

const Right = styled(Box)`
    display: flex;
    align-items: center;
`;

const Navbar = () => {
	return (
		<>
			<Component>
				<Wrapper>
					<Link to="/" style={{textDecoration:"none",color:"inherit"}}>
						<Left>ABCHotel</Left>
					</Link>
					<Right>
						<Stack direction="row" spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
							<Badge color="error" variant="dot">
								<NotificationsNoneSharp style={{ fontSize: '28px',cursor:"pointer" }} />
							</Badge>
							<Avatar
								alt="Remy Sharp"
								sx={{ width: 40, height: 40,cursor:"pointer" }}
								src="https://i.pinimg.com/236x/2c/ab/8f/2cab8f96fb6fdcdee8bb8ea93aaa96ee.jpg"
							/>
						</Stack>
					</Right>
				</Wrapper>
			</Component>
		</>
	);
};

export default Navbar;
