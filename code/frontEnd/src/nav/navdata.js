
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import StoreIcon from '@material-ui/icons/Store';
import {Link} from 'react-router-dom'

export const canteenListItems = (
    <div>
        <Link to="/floor/one">
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Canteen One" />
            </ListItem>
        </Link>
        <Link to="/floor/two">
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Canteen Two" />
            </ListItem>
        </Link>
        <Link to="/floor/three">
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Canteen Three" />
            </ListItem>
        </Link>
        <Link to="/floor/four">
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Canteen Four" />
            </ListItem>
        </Link>
        <Link to="/floor/five">
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Canteen Five" />
            </ListItem>
        </Link>
        <Link to="/floor/six">
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Canteen Six" />
            </ListItem>
        </Link>
    </div>
);

export const otherListItems = (

    <div>
        <Link to="/">
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
        </Link>
    </div>
);



