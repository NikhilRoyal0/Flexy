import React, { useState } from "react";
import { experimentalStyled, useMediaQuery, Container, Box, CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { TopbarHeight } from "../../assets/global/Theme-variable";

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const excludedPaths = ["/logout", "/login", "/register-now"];
  const shouldRenderHeaderFooterSidebar = !excludedPaths.includes(location.pathname);

  return (
    <MainWrapper>
      <CssBaseline />
      {shouldRenderHeaderFooterSidebar && (
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      )}

      {shouldRenderHeaderFooterSidebar && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      )}

      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingLeft: shouldRenderHeaderFooterSidebar && lgUp ? "260px!important" : "",
            overflow: "hidden",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
          {shouldRenderHeaderFooterSidebar && <Footer />}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
