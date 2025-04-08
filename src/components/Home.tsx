import { Box, Typography } from "@mui/material"
import logo from "../assets/logo_new.png"

const Home = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center" 
                >
                    <img src={logo} alt="Logo" />
                    <Typography variant="h4">Bem vindo a dashboard!</Typography>
                </Box>
        </Box>
    )
}

export default Home;