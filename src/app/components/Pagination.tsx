import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export const PaginationComponent = ({
  handleChange,
  page,
  pageCount,
}: {
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
  pageCount: number;
}) => {
  return (
    <div>
      <Stack spacing={2}>
        {/* <Pagination count={10} shape='rounded' /> */}
        <Pagination
          page={page}
          count={pageCount}
          variant='outlined'
          shape='rounded'
          showFirstButton
          showLastButton
          onChange={handleChange}
          sx={{
            '& .MuiPaginationItem-root': {
              backgroundColor: 'white',
              border: '1px solid #F1F1F1',
              color: '#1f1f1f',
              '&:hover': {
                backgroundColor: '#C1C1C1',
                borderColor: 'none',
              },
              '&.Mui-selected': {
                backgroundColor: '#FF4D00',
                color: 'white',
                borderColor: 'none',
                '&:hover': {
                  backgroundColor: '#FF4D00',
                },
              },
            },
          }}
        />
      </Stack>
    </div>
  );
};
