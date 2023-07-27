import React, { FC, useState } from 'react';
import { Button, CircularProgress, FormControl, InputAdornment, LinearProgress, TextField, Tooltip, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { emailPatternValidator, emailValidationErrorText, emailValidator } from 'utils/formValidator';
import { loanPro } from 'assets';
import { Clear, Lock, Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import CentralizedContainer from 'components/common/CentralizedContainer/CentralizedContainer';
import { makeStyles } from '@mui/styles';
import { ILoginFields } from 'constants/user.constant';
import { IExtendedTheme } from 'theme/ExtendedThemeOptions';
import { useAuth } from 'hooks/useAuth';

const useStyles = makeStyles((theme: IExtendedTheme) => ({
  form: {
      display: 'flex',
      rowGap: 25
  }
  ,
  loginBtn: {
      height: 50,
      cursor: 'pointer',
  },
  imageContainer: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center'
  }
}))
const Login: FC = () => {
  const { login: { doLogin, isLoading, isRefreshLoading } } = useAuth();
  const { loginBtn, form, imageContainer } = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleSubmit, setValue, register, formState: { errors }, watch } = useForm<ILoginFields>({
    mode: 'all',
  });
  const watchUsername = watch('username', '');
  const watchPassword = watch('password', '');
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogIn = async (formData: ILoginFields) => {
    try {
      await doLogin(
        formData,
        () => navigate(state?.path || '/operation/records', { replace: true })
      );
    } catch (error: any) {
      console.error(
        `Could not login - message: ${error.message} - stack: ${error.stack}`,
      );
    }
  };

  return isRefreshLoading ? (
    <LinearProgress />
  ) : (
    <CentralizedContainer>
          <div className={imageContainer}>
            <img src={loanPro} alt="true-north-and-loan-pro" style={{ width: '30%' }} loading='lazy' />
          </div> 
          <FormControl variant="outlined" className={form}>
                  <TextField
                  {...register('username', {
                      required: emailValidationErrorText(watchUsername),
                      validate: (e: any) => emailValidator(e),
                      pattern: {
                        value: emailPatternValidator,
                        message: 'Email provided is not valid',
                      }
                  })}
                    id="username"
                    label="Username"
                    placeholder="Username"
                    style={{
                      border: errors.username ? 'gray' : 'red'
                    }}
                    
                    InputProps={{
                      endAdornment: watchUsername ? (
                        <InputAdornment position="end" onClick={() => setValue('username', "")}>
                          <Tooltip title="Clear">
                            <Clear />
                          </Tooltip>
                        </InputAdornment>
                      ) : undefined,
                      startAdornment: (
                        <InputAdornment position="start">
                            <Mail />
                        </InputAdornment>
                      )
                    }}
                  />
                  {errors.username ? (
                    <Typography style={{ color: 'red' }} variant="body2"> {errors.username.message} </Typography>
                  ) : null}
                  <TextField
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 5,
                          message: 'Password should be minimum 5 characters long',
                        },
                    })}
                    id="password"
                    label="Password"
                    placeholder='Password'
                    fullWidth
                    style={{
                      border: errors.password ? 'gray' : 'red'
                    }}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <>
                        {watchPassword ? <InputAdornment position="end" onClick={() => setValue('password', "")}>
                            <Clear />
                        </InputAdornment> : null}
                        <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                        </>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                      )
                    }}
                  />
                  {errors.password ? (
                    <Typography style={{ color: 'red' }} variant="body2"> {errors.password.message} </Typography>
                  ) : null}
            <Button
              color="primary"
              fullWidth
              className={loginBtn}
              onClick={handleSubmit(handleLogIn)}
              variant="contained"
            >
              { isLoading ? <CircularProgress /> : 'Login' }
            </Button>
          </FormControl>
    </CentralizedContainer>
  )
}

export default Login;