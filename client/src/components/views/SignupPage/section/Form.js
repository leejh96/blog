import React, { useState} from 'react';
import { Button, TextField, Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { registerUser } from '../../../../actions/UserAction';
const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    login : {
        textDecoration : 'none',
        color : '#757575',
        '&:hover' : {
            textDecoration : 'underline',
            color : '#ababab'
        }
    },
}));

function Form() {
    const [username, setUsername] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitSignup = (e) => {
        e.preventDefault();
        const data = {
            username, nick, email, password
        }
        dispatch(registerUser(data))
        .then(res => {
            if(res.data){
                return history.push('/login');
            }
            return alert(res.data.message);
        })
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangeNick = (e) => {
        setNick(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const classes = useStyles();
    return (
        <Box>
            <form className={classes.form} onSubmit={onSubmitSignup}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined" //네모칸 만들기
                        required
                        fullWidth
                        id="username"
                        label="이름"
                        name="username" //querystring값
                        autoComplete="username"
                        onChange={onChangeUsername}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        id="nick"
                        label="닉네임"
                        name="nick"
                        autoComplete="nick"
                        onChange={onChangeNick}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        onChange={onChangeEmail}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangePassword}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit} 
                >
                    회원가입
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link to="/login" className={classes.login}>
                        로그인
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Form
