import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const CoursesListResults = ({ courses, ...rest }) => {
  const [selectedCoursesIds, setSelectedCoursesIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCoursesIds;

    if (event.target.checked) {
      newSelectedCoursesIds = courses.map((customer) => customer.id);
    } else {
      newSelectedCoursesIds = [];
    }

    setSelectedCoursesIds(newSelectedCoursesIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCoursesIds.indexOf(id);
    let newSelectedCoursesIds = [];

    if (selectedIndex === -1) {
      newSelectedCoursesIds = newSelectedCoursesIds.concat(selectedCoursesIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCoursesIds = newSelectedCoursesIds.concat(selectedCoursesIds.slice(1));
    } else if (selectedIndex === selectedCoursesIds.length - 1) {
      newSelectedCoursesIds = newSelectedCoursesIds.concat(selectedCoursesIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCoursesIds = newSelectedCoursesIds.concat(
        selectedCoursesIds.slice(0, selectedIndex),
        selectedCoursesIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCoursesIds(newSelectedCoursesIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCoursesIds.length === courses.length}
                    color="primary"
                    indeterminate={
                      selectedCoursesIds.length > 0
                      && selectedCoursesIds.length < courses.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCoursesIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCoursesIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {format(customer.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CoursesListResults.propTypes = {
  courses: PropTypes.array.isRequired
};
