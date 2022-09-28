import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CoursesListResults } from '../components/courses/courses-list-results';
import { CoursesListToolbar } from '../components/courses/courses-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { courses } from '../__mocks__/courses';

const Page = () => (
  <>
    <Head>
      <title>
        Notenverwaltung - Kurse
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
        <CoursesListToolbar />
        <Box sx={{ mt: 3 }}>
          <CoursesListResults courses={courses} />
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
