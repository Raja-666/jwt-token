
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { useDeleteRegisterMutation, useGetRegisterQuery } from '../../store/Endpoint'
import api from '../../store/api';
import { useEffect } from 'react';


const Dashboard = () => {
    const navigate = useNavigate()
    const {data: registerData, isSuccess, isLoading, isError, error }=useGetRegisterQuery()
    const [deleteUser]=useDeleteRegisterMutation()
    const handleDelete = async (id) => {
        await deleteUser({ id })
    }

    useEffect(() => {
      const verifyToken = async () => {
        try {
          await api.get('/verifyToken');
        } catch (err) {
          // navigate('/login');
        }
      };
  
      verifyToken();
    }, []);
  
   



    const columns = [
        {
            id: 0,
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            reorder: true
        },
        {
            id: 1,
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "Actions",
            cell: (row) => <button className='button4 fs-5 rounded-1 me-5' type="button" onClick={(e) => navigate(`/editUser/${row._id}`)}>update</button>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 4,
            name: "Actions",
            cell: (row) => <button className='button2 fs-5 rounded-1 me-5' type="button"
             onClick={() => handleDelete(row._id)}
             
             >delete</button>,
            sortable: true,
            right: true,
            reorder: true
        }

    ];

    let content;
    if (isLoading) {
        content = <p>Data Is Loading</p>
    } else if (isSuccess) {
        content =
            <>
                <DataTable
                    className='dataTable'
                    title="Product Lists"
                    columns={columns}
                    data={registerData}
                    defaultSortFieldId={1}
                    pagination
                    customStyles={{
                      head: {
                        style: {
                          backgroundColor: '#007bff',
                          color: 'red',
                          border: '1px solid black',
                          fontSize: "16px",
                        },
                      },
                      rows: {
                        style: {
                          backgroundColor: '000080',
                          border: '1px solid black',
                        },
                      },
                      cells: {
                        style: {
                          color: 'red',
                          border: '1px solid black',
                          fontSize: "14px",
                        },
                      },
                    }}
                />
            </>
    } else {
        content = <p>Error Message</p>
    }


    return (
        <div>
            {content}
        </div>
    )
}

export default Dashboard