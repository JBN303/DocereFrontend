import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Paper,
  TextareaAutosize,
  Grid,
  Container,
} from '@mui/material';
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

const theme = createTheme({
  palette: {
    primary: {
      main: '#77d5cb',
    },
  },
});
const CustomContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '65px',
  backgroundColor: '#fff',
  
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

function SignUp() {
  const [inputs, setInputs] = useState({
    uid: '',
    name: '',
    age: '',
    spec: '',
    edu: '',
    exp: '',
    lang: '',
    locat: '',
    conslt: '',
    type: '',
    cert: '',
    pic: '',
    about: '',
    phn: '',
    email: '',
    cpass: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null); 
  const [previewCert, setPreviewCert] = useState(null); 
  const navigate = useNavigate();

  const InputHandler = (event) => {
    const {name,value} = event.target
    setInputs((inputs) => ({...inputs,[name]:value}))
    console.log(inputs)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

// Add FormData to handle file uploads
const SaveData = () => {
  const formData = new FormData();
  
  // Append all fields to formData
  Object.entries(inputs).forEach(([key, value]) => {
    formData.append(key, value);
  });

  axios.post("http://localhost:5007/api/dnew", formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Important for file uploads
    }
  })
    .then((response) => {
      alert("Record Saved successfully");
      navigate('/login');
    })
    .catch(err => console.log(err));
};
const handleProfilePhotoChange = (event) => {
  const file = event.target.files[0];
  setInputs((inputs) => ({ ...inputs, pic: file }));

  // Display the selected profile photo
  const reader = new FileReader();
  reader.onload = (e) => {
    setPreviewPhoto(e.target.result);
  };
  reader.readAsDataURL(file);
};

const handleCertificateChange = (event) => {
  const file = event.target.files[0];
  setInputs((inputs) => ({ ...inputs, cert: file }));

  // Display the selected certificate
  const reader = new FileReader();
  reader.onload = (e) => {
    setPreviewCert(e.target.result);
  };
  reader.readAsDataURL(file);
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <center>
      <CustomContainer component="main" maxWidth="xs">
        
        <Paper elevation={3} style={{ padding: '20px', width: '800px' }}>
          <Typography variant="h5" align="center">
            Let's Get Started
          </Typography>
          <Typography variant="subtitle1" align="center">
            It's Okay, Now Create doctor's Account.
          </Typography>
          <br></br>
          <form>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="NMC UID"
                  name="uid"
                  type="number"
                  placeholder="ex:1757"
                  onChange={InputHandler}
                  value={inputs.uid}
                  margin="normal"
                  InputProps={{
                    pattern: '[0]{1}[0-9]{9}',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  placeholder="DR."
                  onChange={InputHandler}
                  value={inputs.name}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  placeholder=""
                  onChange={InputHandler}
                  value={inputs.age}
                  margin="normal"
                />
              </Grid>
                            <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  name="edu"
                  placeholder="MBBS, MD, ..."
                  onChange={InputHandler}
                  value={inputs.edu}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="exp"
                  placeholder="in years"
                  onChange={InputHandler}
                  value={inputs.exp}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Language"
                  name="lang"
                  placeholder=""
                  onChange={InputHandler}
                  value={inputs.lang}
                  margin="normal"
                />
              </Grid>
              {/* <Grid item xs={6}>
  <Autocomplete
    multiple
    id="qualification"
    options={['MBBS', 'MD', 'MS', 'Diploma', 'PhD', 'Other']}
    defaultValue={[]}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        label="Qualification"
        name="edu"
        placeholder="Select Qualifications"
        onChange={(event, value) => {
          const selectedQualifications = value.join(',');
          setInputs((inputs) => ({ ...inputs, edu: selectedQualifications }));
        }}
      />
    )}
  />
</Grid>

<Grid item xs={6}>
  <Autocomplete
    multiple
    id="language"
    options={['English', 'French', 'Hindi', 'Spanish', 'German']}
    defaultValue={[]}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        label="Language"
        name="lang"
        placeholder="Select Languages"
        onChange={(event, value) => {
          const selectedLanguages = value.join(',');
          setInputs((inputs) => ({ ...inputs, lang: selectedLanguages }));
        }}
      />
    )}
  />
</Grid> */}

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="locat"
                  placeholder="exact Google Map Link"
                  onChange={InputHandler}
                  value={inputs.locat}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="pincode"
                  name="conslt"
                  placeholder=""
                  onChange={InputHandler}
                  value={inputs.conslt}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>specialization</InputLabel>
                  <Select
                    name="spec"
                    label="specialization"
                    value={inputs.spec}
                    onChange={InputHandler}
                  >
                    <MenuItem value="General medicine">General medicine</MenuItem>
                    <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                    <MenuItem value="diabetology & endocrinology">diabetology & endocrinology</MenuItem>
                    <MenuItem value="Pulmonology">Pulmonology</MenuItem>
                    <MenuItem value="Family Medicine">Family Medicine</MenuItem>
                    <MenuItem value="General Physician">General Physician</MenuItem>
                    <MenuItem value="Nutrition & Dietetics">Nutrition & Dietetics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="type"
                    label="Gender"
                    value={inputs.type}
                    onChange={InputHandler}
                  >
                    <MenuItem value="online">Male</MenuItem>
                    <MenuItem value="inclinic">Female</MenuItem>
                    <MenuItem value="Both">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
  <TextField
    fullWidth
    label="Profile Photo"
    name="pic"
    type="file"
    onChange={handleProfilePhotoChange}
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {previewPhoto ? (
            <Avatar alt="Profile Photo" src={previewPhoto} />
          ) : (
            <Avatar>☺</Avatar>
          )}
        </InputAdornment>
      ),
    }}
  />
</Grid>
<Grid item xs={6}>
    <TextField
      fullWidth
      label="Certificate"
      name="cert"
      type="file"
      onChange={handleCertificateChange}
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {previewCert ? (
              <Avatar alt="Certificate" src={previewCert} />
            ) : (
              <FolderIcon />
            )}
          </InputAdornment>
        ),
      }}
    />
  </Grid>



              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="phn"
                  type="number"
                  placeholder="ex: 9712345678"
                  value={inputs.phn}
                  onChange={InputHandler}
                  margin="normal"
                  InputProps={{
                    pattern: '[0]{1}[0-9]{9}',
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={inputs.email}
                  onChange={InputHandler}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Create New Password"
                  name="npass"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="cpass"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={inputs.cpass}
                  onChange={InputHandler}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  name="about"
                  className="input-text"
                  placeholder="Details about the you"
                  onChange={InputHandler}
                  value={inputs.about}
                  style={{ width: '100%', minHeight: '50px', margin: '10px 0' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={SaveData}
              style={{ marginTop: '20px' }}
            >
              Sign Up
            </Button>
            
            <Typography variant="subtitle1" align="center">
            Already have an account?<a href="login">
                    Login
                  </a>
          </Typography>
          </form>

        </Paper>
        </CustomContainer>
      </center>
    </ThemeProvider>
  );
}

export default SignUp;
