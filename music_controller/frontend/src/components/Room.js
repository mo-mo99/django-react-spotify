import React, {Component} from "react";
import { Grid, Button, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Room extends Component{
    constructor(props){
        super(props);

        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };

        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    }

    getRoomDetails(){
        fetch("/api/get-room" + "?code=" + this.roomCode).
        then((response) => { 
            if (!response.ok){
                this.props.leaveRoomCallBack();
                this.props.history.push("/");
            }
            return response.json();
            }).
        then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
        
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        }

        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.leaveRoomCallBack();
            this.props.history.push("/");
        }
        );
    }

    render(){
        return (
            <Grid container spacing={12} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        code : {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Guest can pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        is host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={ this.leaveButtonPressed }>
                        Back To Home Page
                    </Button>
                </Grid>
            </Grid>
            

        );
    }
}