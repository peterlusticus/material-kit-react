import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { GradesListResults } from '../components/grades/grades-list-results';
import { GradesListToolbar } from '../components/grades/grades-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { grades } from '../__mocks__/grades';

const Page = () => (
  <>
    <Head>
      <title>
        Notenverwaltung - Bewertungen
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <GradesListToolbar />
        <Box sx={{ mt: 3 }}>
          <GradesListResults grades={grades} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
