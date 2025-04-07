import { Box, Typography } from "@mui/material"

const Home = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Typography variant="h4">Bem vindo a dashboard!</Typography>
        </Box>
    )
}

export default Home;