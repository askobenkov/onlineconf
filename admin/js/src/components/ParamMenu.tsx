import * as React from 'react';
import { Theme, createStyles, IconButton, withStyles, WithStyles, Dialog, Slide } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import NotesIcon from '@material-ui/icons/Notes';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

import { IParamNode } from './common';
import IconButtonProgress from './IconButtonProgress';

const styles = (theme: Theme) => createStyles({
	root: {
		position: 'absolute',
		top: 'auto',
		bottom: 'auto',
		left: 'auto',
		right: 0,
		marginTop: -68,
		marginBottom: -68,
	},
	paper: {
		borderRadius: '32px',
	},
	paperScrollBody: {
		marginLeft: 48,
		marginRight: 0,
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap-reverse',
		placeContent: 'space-between',
		padding: theme.spacing.unit / 2,
		'& > *': {
			margin: theme.spacing.unit / 2,
		},
	},
});

export interface ParamMenuProps {
	param: IParamNode;
	userIsRoot: boolean;
	onClose: () => void;
	onView: () => void;
	onEdit: () => void;
	onNotification: () => void;
	onAccess: () => void;
	onLog: () => void;
	onAddChild: () => void;
	onReload: () => void;
	onDelete: () => void;
	onMove: () => void;
	onDescribe: () => void;
}

const ParamMenu = (props: ParamMenuProps & WithStyles<typeof styles>) => (
	<Dialog
		open
		onClose={props.onClose}
		disablePortal
		classes={{
			root: props.classes.root,
			paper: props.classes.paper,
			paperScrollBody: props.classes.paperScrollBody
		}}
		TransitionComponent={Slide}
		TransitionProps={{ direction: 'left' } as any}
		maxWidth={false}
		scroll="body"
	>
		<div className={props.classes.content}>
			<IconButtonProgress loading={props.param.state === 'loading'}>
				<IconButton onClick={props.onReload}><RefreshIcon/></IconButton>
			</IconButtonProgress>
			<IconButton onClick={props.onNotification} disabled={props.param.rw !== true}><NotificationsIcon/></IconButton>
			<IconButtonProgress loading={props.param.accessLoading}>
				<IconButton onClick={props.onAccess} disabled={props.param.rw !== true && !props.userIsRoot}><LockOpenIcon/></IconButton>
			</IconButtonProgress>
			<IconButtonProgress loading={props.param.logLoading}>
				<IconButton onClick={props.onLog}><HistoryIcon/></IconButton>
			</IconButtonProgress>
			<IconButton onClick={props.onDescribe} disabled={props.param.rw !== true}><InsertCommentIcon/></IconButton>
			<IconButton onClick={props.onView}><NotesIcon/></IconButton>
			<IconButton onClick={props.onEdit} disabled={props.param.rw !== true}><EditIcon/></IconButton>
			<IconButton onClick={props.onMove} disabled={props.param.rw !== true}><LowPriorityIcon/></IconButton>
			<IconButton onClick={props.onDelete} disabled={props.param.rw !== true || props.param.num_children !== 0}><DeleteIcon/></IconButton>
			<IconButton onClick={props.onAddChild} disabled={props.param.rw !== true || props.param.mime === 'application/x-symlink'}><PlaylistAddIcon/></IconButton>
			<IconButton onClick={props.onClose}><CloseIcon/></IconButton>
		</div>
	</Dialog>
);

export default withStyles(styles)(ParamMenu);
