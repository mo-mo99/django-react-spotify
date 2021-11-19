import React, {Component} from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
    }

    render(){
        return(
            <Grid container spacing={1}  align="center">
                <Grid item xs={12} >
                    <Typography component="h4" variant="h4">Join a Room</Typography>
                </Grid>
                <Grid item xs={12} >
                    <TextField 
                        error={this.state.error}
                        label="code"
                        placeholder="Enter a Room code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Enter the Room
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}