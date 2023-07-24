import React, { useContext, useState } from 'react';
import { Grid, IconButton, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { trueNorthAndLoan } from 'assets';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/authContext';

const Header = () => {
    const { user, doLogout } = useContext(AuthContext);
    const [anchorMenu, setAnchorMenu] = useState(null);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await doLogout();
        navigate('/login', { replace: true });
    }

    const handleOpenUserMenu = (event: any) => {
        setAnchorMenu(event.currentTarget);
    };
    return (
        <Grid container style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '.5px solid gray',
            padding: '0 10px'
        }}>
            <img src={trueNorthAndLoan} alt="loan-pro" style={{ width: '25%', maxHeight: '100%' }} />
            <IconButton onClick={handleOpenUserMenu} disableFocusRipple disableRipple>
                <Typography variant="body1" sx={{ color: 'black' }}>{user?.username || 'MENU'}</Typography>
                <MenuIcon sx={{ fontSize: 20, ml: 1 }} />
            </IconButton>
            <Menu
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '4px',
                        padding: '8px',
                    },
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'white',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
                id="menu-appbar"
                anchorEl={anchorMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorMenu)}
                onClose={() => setAnchorMenu(null)}
            >
                <MenuItem onClick={handleLogOut}>
                    <ListItemText>Log out</ListItemText>
                    <ExitToAppIcon sx={{ marginLeft: 2 }} />
                </MenuItem>
            </Menu>
        </Grid>
    )
}

export default Header