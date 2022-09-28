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

export const GradesListResults = ({ grades, ...rest }) => {
  const [selectedGradesIds, setSelectedGradesIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedGradesIds;

    if (event.target.checked) {
      newSelectedGradesIds = grades.map((customer) => customer.id);
    } else {
      newSelectedGradesIds = [];
    }

    setSelectedGradesIds(newSelectedGradesIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedGradesIds.indexOf(id);
    let newSelectedGradesIds = [];

    if (selectedIndex === -1) {
      newSelectedGradesIds = newSelectedGradesIds.concat(selectedGradesIds, id);
    } else if (selectedIndex === 0) {
      newSelectedGradesIds = newSelectedGradesIds.concat(selectedGradesIds.slice(1));
    } else if (selectedIndex === selectedGradesIds.length - 1) {
      newSelectedGradesIds = newSelectedGradesIds.concat(selectedGradesIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedGradesIds = newSelectedGradesIds.concat(
        selectedGradesIds.slice(0, selectedIndex),
        selectedGradesIds.slice(selectedIndex + 1)
      );
    }

    setSelectedGradesIds(newSelectedGradesIds);
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
                    checked={selectedGradesIds.length === grades.length}
                    color="primary"
                    indeterminate={
                      selectedGradesIds.length > 0
                      && selectedGradesIds.length < grades.length
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
              {grades.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedGradesIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedGradesIds.indexOf(customer.id) !== -1}
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
        count={grades.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GradesListResults.propTypes = {
  grades: PropTypes.array.isRequired
};
