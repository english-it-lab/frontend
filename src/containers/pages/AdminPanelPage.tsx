import { DataGrid } from "@mui/x-data-grid";

import type { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "firstname",
    headerName: "Имя",
    width: 150,
  },
  {
    field: "lastname",
    headerName: "Фамилия",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Номер телефона",
    type: "number",
    sortable: false,
    width: 160,
  },
  {
    field: "email",
    headerName: "Адрес электронной почты",
    sortable: false,
    width: 200,
  },
  {
    field: "regDate",
    headerName: "Дата регистрации",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    lastname: "Snow",
    firstname: "Jon",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 2,
    lastname: "Lannister",
    firstname: "Cersei",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 3,
    lastname: "Lannister",
    firstname: "Jaime",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 4,
    lastname: "Stark",
    firstname: "Arya",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 5,
    lastname: "Targaryen",
    firstname: "Daenerys",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 6,
    lastname: "Melisandre",
    firstname: "Daenerys",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 7,
    lastname: "Clifford",
    firstname: "Ferrara",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 8,
    lastname: "Frances",
    firstname: "Rossini",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 9,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 10,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 11,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 12,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 13,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 14,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 15,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 16,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 17,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 18,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 19,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 20,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
  {
    id: 21,
    lastname: "Roxie",
    firstname: "Harvey",
    phone: 1234567890,
    email: "89372650223@mail.ru",
    regDate: "01.01.1999",
  },
];

const AdminPanelPage = () => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default AdminPanelPage;
